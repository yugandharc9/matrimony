import React, { useState, useRef } from 'react';
import { Button } from '../button/button';
import { Logo } from '../logo/logo'
import { Input, PasswordInput } from '../input/input'
import showNotification from '../notify/notify';
import { useAuth } from '../auth/authctx';
import { login } from '../../services/apiService'
import { useNavigate } from 'react-router-dom';
import ForgotPasswordDialog from '../forgot-password-dialog/ForgotPasswordDialog';

const LoginPage = () => {
    console.log('Rendering LoginPage');
    const navigate = useNavigate();

    const phone = useRef();
    const password = useRef();
    const btnRef = useRef();
    const formRef = useRef();
    const { saveToken } = useAuth();
    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        btnRef.current?.setLoadingOn();            
        try {
            console.log(phone.current.getVal(), password.current.getVal());
            const response = await login({ email: phone.current?.getVal(), password: password.current?.getVal() })
            console.log('response http', response);
            if (response.status == 200) {
                if (response.data.jwt) {
                    saveToken(response.data.jwt);
                    navigate("/profiles");
                }
                showNotification("success", "", "Login successful", 2000);
            }
            else {
                showNotification("danger", "Internal Error", response.data.error, 2000);
            }
        } catch (e) {
            console.log('response err http', e);
            if (e.response.status == 417) {
                if (e.response.data.jwt) {
                    saveToken(e.response.data.jwt);
                    navigate("/profiles");
                }
            } else {
                showNotification("danger", "", e.response.data.error, 2000);
            }
        } finally {
            btnRef.current?.setLoadingOff();            
        }
    };

    const handleRegister = () => {
        navigate("/signup")
    }

    const handleButtonClick = () => {
        formRef.current.requestSubmit();
    };

    return (
        <form onSubmit={handleLogin} ref={formRef}>
            <div className="h-screen bg-custom-c1">
                <div className='flex flex-col items-center gap-y-5 overflow-auto'>
                    <Logo />
                    <Input
                        placeholder="Email/Phone"
                        isRequired={true}
                        type="text"
                        labelName="Email/Phone"
                        ref={phone}
                    />
                    <PasswordInput ref={password} />
                    <p onClick={handleOpenDialog} className='text-custom-c2'>Forgot password?</p>
                    <ForgotPasswordDialog open={open} onClose={handleCloseDialog} />
                    <Button type="submit" name="Login" ref={btnRef} onClick={handleButtonClick} />
                    <hr className="w-4/5 h-2 border-custom-c2" />
                    <Button type="button" name="Register" onClick={handleRegister} />
                </div>
            </div>
        </form>

    );
};

export default LoginPage;
