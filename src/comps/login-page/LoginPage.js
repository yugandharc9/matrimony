import React, { useState, useRef,useEffect } from 'react';
import { FormButton } from '../button/button';
import { Logo } from '../logo/logo'
import { Input, PasswordInput } from '../input/input'
import showNotification from '../notify/notify';
import { useAuth } from '../auth/authctx';
import { login, profileCompletionStatus } from '../../services/apiService'
import { useNavigate } from 'react-router-dom';
import ForgotPasswordDialog from '../forgot-password-dialog/ForgotPasswordDialog';
import {Redirector} from '../routing/redirector';

const LoginPage = () => {
    const navigate = useNavigate();
    const phone = useRef();
    const password = useRef();
    const btnRef = useRef();
    const formRef = useRef();
    const {token,saveToken,saveUserId} = useAuth();
    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };
    
    const checkCompletion = async () => {
        try {
          const r = await profileCompletionStatus(token);
          let completionStat = r.data;
          Redirector(completionStat, navigate);
        } catch (e) {
          if (e.response.status == 401){
            navigate("/logout");
          }
          let completionStat = e.response.data;
          Redirector(completionStat, navigate);
        }
      }
      
    useEffect(()=> {
        if(token != null){
            console.log('navigation from useEffect LoginPage to profiles');
            checkCompletion();
            //navigate("/profiles");
        }
    },[]);
    
    useEffect(()=> {
        if(token != null){
            console.log('navigation from useEffect LoginPage to profiles');
            checkCompletion();
            //navigate("/profiles");
        }
    },[token]);

    const handleLogin = async (event) => {
        event.preventDefault();
        btnRef.current?.setLoadingOn();            
        try {
            const response = await login({ email: phone.current?.getVal(), password: password.current?.getVal() })
            if (response.status == 200) {
                if (response.data.jwt) {
                    saveToken(response.data.jwt);
                    saveUserId(response.data.user_id);
                    navigate("/login");
                }
            }  
        } catch (e) {
            if (e.response.status == 417) {
                if (e.response.data.jwt) {
                    saveToken(e.response.data.jwt);
                    saveUserId(e.response.data.user_id);
                    navigate("/login");
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
                <div className='flex flex-col items-center gap-y-5 overflow-auto bg-custom-c1'>
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
                    <FormButton type="submit" name="Login" ref={btnRef} onClick={handleButtonClick} />
                    <hr className="w-4/5 h-2 border-custom-c2" />
                    <FormButton type="button" name="Register" onClick={handleRegister} />
                    <></>
                </div>
            </div>
        </form>

    );
};

export default LoginPage;
