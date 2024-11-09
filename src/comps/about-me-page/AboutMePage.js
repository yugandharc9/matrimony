import React, { useState } from 'react';
import Button from '../button/button';
import {  InputArea, Input } from '../input/input'
import ApplicationBar from "../application-bar/ApplicationBar";
import showNotification from '../notify/notify';
import { useNavigate } from 'react-router-dom';
import { aboutMeAndContact } from '../../services/apiService';

const AboutMePage = () => {
    const [aboutme,setAboutMe] = useState('');
    const [expectation,setExpectation] = useState('');
    const [name,setContactName] = useState('');
    const [relation,setContactRelation] = useState('');
    const [phone,setContactNum] = useState('');
    const [loading, setLoading] = useState('');

    const aboutMeContact = {
        contact: {
            aboutme: aboutme,
            expectation: expectation,
            name: name,
            relation: relation,
            phone: phone
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await aboutMeAndContact(aboutMeContact);
            if (response.status === 201) {
                if (response.data.jwt) {
                    //saveToken(response.data.jwt);
                }
                showNotification("success", "", "Saved", 2000);
            } else {
                showNotification("danger", "", response.data.error, 2000);
            }
        } catch (e) {
            showNotification("danger", "", e.response.data.error, 2000);
        }
        setLoading(false);
    }



    return (
        <>
            <ApplicationBar />
            <form onSubmit={handleSubmit}>
                <div className="h-screen bg-custom-c1">
                    <div className='flex flex-col bg-custom-c1 items-center justify-between gap-y-5 overflow-auto'>
                        <div></div>
            <h1 className="mr-auto ml-auto text-left text-xl text-custom-c2">Tell more about yourself</h1>
            <hr className="w-4/5 h-2 border-custom-c2" />
                        <InputArea
                            placeholder="Write brief about you"
                            value={aboutme}
                            isRequired={false}
                            rows={4}
                            labelName="About me"
                            onChange={(e) => setAboutMe(e.target.value)}
                        />
                        <InputArea
                            placeholder="Expectations"
                            value={expectation}
                            isRequired={false}
                            rows={4}
                            labelName="Expectations"
                            onChange={(e) => setExpectation(e.target.value)}
                        />
            <h1 className="mr-auto ml-auto text-left text-xl text-custom-c2">Contact info</h1>
            <hr className="w-4/5 h-2 border-custom-c2" />
                        <Input
                            placeholder="Name of contact person"
                            value={name}
                            isRequired={false}
                            labelName="Contact Name"
                            onChange={(e) => setContactName(e.target.value)}
                        />
                        <Input
                            placeholder="Contact phone"
                            value={phone}
                            isRequired={false}
                            labelName="Contact phone"
                            onChange={(e) => setContactNum(e.target.value)}
                        />
                        <Input
                            placeholder="e.g. Father,Self"
                            value={relation}
                            isRequired={false}
                            labelName="Relation with contact"
                            onChange={(e) => setContactRelation(e.target.value)}
                        />
                        <Button loading={loading} type="submit" name="Save" />
                    </div>
                </div>
            </form>
        </>
    )
}

export default AboutMePage;