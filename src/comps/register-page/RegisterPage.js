import React, { useRef } from 'react';
import { Button } from '../button/button';
import { Logo } from '../logo/logo'
import { Input, PasswordInput } from '../input/input'
import showNotification from '../notify/notify';
import { useAuth } from '../auth/authctx';
import { register } from '../../services/apiService'
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    console.log('Rendering RegisterPage');
    const navigate = useNavigate();
    const phone = useRef();
    const email = useRef();
    const password = useRef();
    const { saveToken } = useAuth();
    const formRef = useRef();
    const btnRef = useRef();

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        btnRef.current?.setLoadingOn();
        try {
            const response = await register({ 
                user: { 
                email: email.current?.getVal(), 
                password: password.current?.getVal(), 
                password_confirmation: password.current?.getVal(), 
                phone: phone.current?.getVal()
            }})

            if (response.status === 201) {
                showNotification("success", "", "Registration successful", 3000)
                saveToken(response.data.jwt);
                navigate("/profiles");
            } else {
                showNotification("danger", "Error", response.data.error, 3000)
            }
            if (response.data.jwt) {
                saveToken(response.data.jwt);
            }
        } catch (e) {
            showNotification("danger", "Error", e.response.data.error, 3000)
        } finally {
            btnRef.current?.setLoadingOff();
        }
        console.log("prevEf", event.defaultPrevented);

    };

    const handleButtonClick = () => {
        formRef.current?.requestSubmit();
    }


    return (
        <form onSubmit={handleRegister} ref={formRef}>
            <div className="h-screen bg-custom-c1">
                <div className='flex flex-col items-center gap-y-5 overflow-auto'>
                    <Logo />
                    <Input
                        placeholder="Email"
                        isRequired={true}
                        type="email"
                        labelName="Email"
                        ref={email}
                    />
                    <Input
                        placeholder="Phone"
                        isRequired={true}
                        type="tel"
                        labelName="Phone"
                        pattern="(\+91|[1-9]{1}[0-9]{9})"
                        ref={phone}
                    />
                    <PasswordInput ref={password} />
                    <Button name="Register" type="submit" ref={btnRef} onClick={handleButtonClick} />
                    <hr className="w-4/5 h-2 border-custom-c2" />
                    <Button type="button" name="Login" onClick={handleLogin} />
                </div>
            </div>
        </form>

    );
};

export default RegisterPage;
