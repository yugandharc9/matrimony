import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import showNotification from "../notify/notify";
import { useAuth } from "../auth/authctx";

export const LogoutPage = () => {
    const navigate = useNavigate();
    const {removeToken} = useAuth();
    
    useEffect(() => {
        removeToken();
        showNotification("success","Logged out successfully","",2000);
        navigate("/login");
    },[]);

    return (<>
    
    </>)
}