import React, { useState } from 'react';
import Button from '../button/button';
import { Logo } from '../logo/logo'
import { Input, PasswordInput } from '../input/input'
import showNotification from '../notify/notify';
import { useAuth } from '../auth/authctx';
import { login } from '../../services/apiService'
import { useNavigate } from 'react-router-dom';
import ForgotPasswordDialog from '../forgot-password-dialog/ForgotPasswordDialog';



const LoginPage = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const { saveToken } = useAuth();
    const [loading, setLoading] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await login({ email: phone, password: password })
            if (response.status == 200) {
                if (response.data.jwt) {
                    saveToken(response.data.jwt);
                }
                showNotification("success", "", "Login successful", 2000);
            }
            else {
                showNotification("danger", "", response.data.error, 2000);
            }
        } catch (e) {
            if (e.response.status == 417) {
                if (e.response.data.jwt) {
                    saveToken(e.response.data.jwt);
                    navigate("add-profile-info");
                }
            } else {
                showNotification("danger", "", e.response.data.error, 2000);
            }
        }
        setLoading(false);
    };

    const handleRegister = () => {
        navigate("/signup")
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="h-screen bg-custom-c1">
                <div className='flex flex-col items-center gap-y-5 overflow-auto'>
                    <Logo />
                    <Input
                        placeholder="Email/Phone"
                        value={phone}
                        isRequired={true}
                        type="text"
                        labelName="Email/Phone"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <p onClick={handleOpen} className='text-custom-c2'>Forgot password?</p>
                    <ForgotPasswordDialog open={open} onClose={handleClose} />
                    <Button name="Login" type="submit"
                        loading={loading} />
                    <hr className="w-4/5 h-2 border-custom-c2" />
                    <Button type="button" name="Register" onClick={handleRegister} />
                </div>
            </div>
        </form>

    );
};

export default LoginPage;
