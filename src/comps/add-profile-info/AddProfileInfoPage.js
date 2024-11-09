import { useState } from "react";
import { Input, SelectInput } from "../input/input";
import { educationList, rashis,devnagriInitials,genders, heights, maritialStats, yesNo, yesNoDontKnow } from "../../constants/constants";
import ApplicationBar from "../application-bar/ApplicationBar";
import Button from '../button/button';
import { createProfile } from "../../services/apiService";
import showNotification from '../notify/notify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authctx';


const AddProfileInfoPage = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [maritial_status, setmaritial_status] = useState('');
    const [challenged, setChallenged] = useState('');
    const [current_city, setCity] = useState('');
    const [work, setWork] = useState('');
    const [education, setEducation] = useState('');
    const [degree, setDegree] = useState('');
    const [occupation, setOccupation] = useState('');
    const [annual_income, setAnnualIncome] = useState(0);
    const [birthdate, setBirthdate] = useState('');
    const [birthtime, setBirthtime] = useState('');
    const [birthname, setBirthname] = useState('');
    const [rashi, setRashi] = useState('');
    const [gotra, setGotra] = useState('');
    const [managal_dosh, setMangalDosh] = useState('');
    const [loading, setLoading] = useState('');
    const { saveToken } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await createProfile(profileData);
            if (response.status === 201) {
                if (response.data.jwt) {
                    saveToken(response.data.jwt);
                }
                showNotification("success", "", "Profile saved", 2000);
            } else {
                showNotification("danger", "", response.data.error, 2000);
            }
        } catch (e) {
            showNotification("danger", "", e.response.data.error, 2000);
        }
        setLoading(false);
    }

    const profileData = {
        profile: {
            name: name,
            lastName: lastName,
            gender: gender,
            height: height,
            maritial_status: maritial_status,
            challenged: challenged,
            current_city: current_city,
            work: work,
            education: education,
            degree: degree,
            occupation: occupation,
            annual_income: annual_income,
            birthdate: birthdate,
            birthtime: birthtime,
            birthname: birthname,
            rashi: rashi,
            gotra: gotra,
            mangal_dosh: managal_dosh,
            complexion: process.env.REACT_APP_COMMUNITY
        }
    }


    return (
        <>
            <ApplicationBar />
            <form onSubmit={handleSubmit}>
                <div className="h-screen bg-custom-c1">
                    <div className='flex flex-col bg-custom-c1 items-center justify-between gap-y-5 overflow-auto'>
                        <div></div>
                        <h1 className="mr-auto ml-auto text-left text-xl text-custom-c2">Personal Info</h1>
                        <hr className="w-4/5 h-2 border-custom-c2" />
                        < Input placeholder="First Name" value={name} isRequired={true} type="text" labelName="First Name" onChange={(e) => setName(e.target.value)} />
                        < Input placeholder="Last Name" value={lastName} isRequired={true} type="text" labelName="Last Name" onChange={(e) => setLastName(e.target.value)} />
                        <div className="grid grid-cols-2 gap-5 w-2/3 ">
                            <SelectInput defaultValue="" selectVals={genders} placeholder="Gender" value={gender} isRequired={true} labelName="Gender" onChange={(e) => setGender(e.target.value)} />
                            <SelectInput defaultValue="" selectVals={heights} placeholder="Height" value={height} isRequired={true} labelName="Height" onChange={(e) => setHeight(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-5 w-2/3 ">
                            <SelectInput defaultValue="" selectVals={maritialStats} placeholder="Status" value={maritial_status} isRequired={true} labelName="Status" onChange={(e) => setmaritial_status(e.target.value)} />
                            <SelectInput defaultValue="" selectVals={yesNo} placeholder="Physically Challenged" value={challenged} isRequired={true} labelName="Physically challenged" onChange={(e) => setChallenged(e.target.value)} />
                        </div>
                        < Input placeholder="Current city" value={current_city} isRequired={true} type="text" labelName="Current city" onChange={(e) => setCity(e.target.value)} />
                        <h1 className="mr-auto ml-auto text-left text-xl text-custom-c2">Professional Info</h1>
                        <hr className="w-4/5 h-2 border-custom-c2" />
                        <div className="grid grid-cols-2 gap-5 w-2/3 ">
                            < Input placeholder="Works at" value={work} isRequired={true} type="text" labelName="Works at" onChange={(e) => setWork(e.target.value)} />
                            < SelectInput placeholder="Education" selectVals={educationList} value={education} isRequired={true} type="text" labelName="Education" onChange={(e) => setEducation(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-5 w-2/3 ">
                            < Input placeholder="Degree" value={degree} isRequired={true} type="text" labelName="Degree" onChange={(e) => setDegree(e.target.value)} />
                            < Input placeholder="Profession" value={occupation} isRequired={true} type="text" labelName="Profession" onChange={(e) => setOccupation(e.target.value)} />
                        </div>
                        < Input placeholder="Annual Income" value={annual_income} defaultValue="" isRequired={true} type="number" labelName="Annual Income" onChange={(e) => setAnnualIncome(e.target.value)} />
                        <h1 className="mr-auto ml-auto text-left text-xl text-custom-c2">Astrological Info</h1>
                        <hr className="w-4/5 h-2 border-custom-c2" />
                        <div className="grid grid-cols-2 gap-5 w-2/3 ">
                            < Input placeholder="Birth Date" value={birthdate} className="label-right" defaultValue="" isRequired={true} type="date" labelName="Birth Date" onChange={(e) => setBirthdate(e.target.value)} />
                            < Input placeholder="Birth Time" value={birthtime} isRequired={true} type="time" labelName="Birth Time" onChange={(e) => setBirthtime(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-5 w-2/3 ">
                            <SelectInput selectVals={devnagriInitials} placeholder="Birth Name" value={birthname} isRequired={true} labelName="Birth Name" onChange={(e) => setBirthname(e.target.value)} />
                            <SelectInput selectVals={rashis} placeholder="Rashi" value={rashi} isRequired={true} labelName="Rashi" onChange={(e) => setRashi(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-5 w-2/3 ">
                            < Input placeholder="Gotra" value={gotra} isRequired={true} type="text" labelName="Gotra" onChange={(e) => setGotra(e.target.value)} />
                            <SelectInput selectVals={yesNoDontKnow} placeholder="Mangalik" value={managal_dosh} isRequired={true} labelName="Mangalik" onChange={(e) => setMangalDosh(e.target.value)} />
                        </div>
                        <Button loading={loading} type="submit" name="Save" />
                    </div>
                </div>
            </form>
        </>
    )


}

export default AddProfileInfoPage;