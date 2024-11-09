import React, { useState } from 'react';
import Button from '../button/button';
import {Logo} from '../logo/logo'
import { Input, PasswordInput } from '../input/input'
import showNotification from '../notify/notify';
import { useAuth } from '../auth/authctx';
import { register } from '../../services/apiService'
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { saveToken} = useAuth();
    const [loading, setLoading] = useState('');

    const handleLogin = () => {
        navigate("/");
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await register({ user: { email: email, password: password, password_confirmation: password, phone: phone } })
            if (response.status === 201) {
                showNotification("success", "", "Registration successful", 3000)
                saveToken(response.data.jwt);
            } else {
            showNotification("danger", "Error", response.data.error, 3000)
            }
            if (response.data.jwt) {
                saveToken(response.data.jwt);
            }
        } catch (e) {
                showNotification("danger", "Error", e.response.data.error, 3000)
        }
        setLoading(false);
    };



    return (
        <form onSubmit={handleRegister}>
            <div className="h-screen bg-custom-c1">
                <div className='flex flex-col items-center gap-y-5 overflow-auto'>
                    <Logo />
                    <Input
                        placeholder="Email"
                        value={email}
                        isRequired={true}
                        type="email"
                        labelName="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Phone"
                        value={phone}
                        isRequired={true}
                        type="tel"
                        labelName="Phone"
                        pattern="(\+91|[1-9]{1}[0-9]{9})"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button name="Register" type="submit" loading={loading} />
                    <hr className="w-4/5 h-2 border-custom-c2" />
                    <Button type="button" name="Login" onClick={handleLogin} />
                </div>
            </div>
        </form>

    );
};

export default RegisterPage;
