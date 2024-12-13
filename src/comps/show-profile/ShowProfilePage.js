import { useEffect, useState } from "react"
import { getProfile } from "../../services/apiService";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/authctx";


export const ShowProfilePage = () => {
    const { pid } = useParams(); // Destructure `id` from the URL params
    console.log("bProfileId",pid);
    const [e,setR] = useState([]);
    const profileId = atob(pid);
    const {token}= useAuth();
    
    const getProfileData = async () => {
        try {
            const response = getProfile(token,profileId)
            setR(response.data.data);
            console.log("success resp", response.data.data);
        } catch (e) {
            console.log("error resp", e);            
        }

    }

    useEffect(() => {
        getProfileData();
    }, []);

    return (<>
        <p>{() => {JSON.stringify(e)}}</p>
    </>)
}