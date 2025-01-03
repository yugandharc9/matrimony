import { useEffect, useRef, useState } from 'react';
import { Input, SelectInput, InputArea } from '../input/input';
import {
  educationList,
  rashis,
  devnagriInitials,
  genders,
  heights,
  maritialStats,
  yesNo,
  NoYes,
  yesNoDontKnow,
} from '../../constants/constants';
import { FormButton } from '../button/button';
import { BaseLayout, BaseForm } from '../layout/BaseLayout';
import { createProfile, updateProfile } from '../../services/apiService';
import showNotification from '../notify/notify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authctx';
import { TDatePicker, TTimePicker } from '../input/DtPicker';
import { useMyProfileData } from '../my-profile-data/myprofilectx';

const AddProfileInfoPage = ({ operation }) => {
  useEffect(() => {
    //navigate("/profiles");
  }, []);
  const navigate = useNavigate();
  const name = useRef();
  const lastName = useRef();
  const gender = useRef();
  const height = useRef();
  const maritial_status = useRef();
  const challenged = useRef();
  const current_city = useRef();
  const work = useRef();
  const education = useRef();
  const degree = useRef();
  const occupation = useRef();
  const annual_income = useRef(0);
  const birthdate = useRef();
  const birthtime = useRef();
  const birthname = useRef();
  const rashi = useRef();
  const btnRef = useRef();
  const formRef = useRef();
  const gotra = useRef();
  const managal_dosh = useRef();
  const contactname = useRef();
  const phone = useRef();
  const relation = useRef();
  const aboutme = useRef();
  const expectation = useRef();
  const { token, saveToken, userId } = useAuth();
  const { myProfileData, updateProfileData } = useMyProfileData();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (profileData) {
      name.current.setVal(profileData.name);
      lastName.current.setVal(profileData.lastName);
      gender.current.setVal(profileData.gender);
      height.current.setVal(profileData.height);
      maritial_status.current.setVal(profileData.maritial_status);
      challenged.current.setVal(profileData.challenged);
      current_city.current.setVal(profileData.current_city);
      work.current.setVal(profileData.work);
      education.current.setVal(profileData.education);
      degree.current.setVal(profileData.degree);
      occupation.current.setVal(profileData.occupation);
      annual_income.current.setVal(profileData.annual_income);
      birthdate.current.setVal(profileData.birthdate);
      let birthtimeValue = new Date(profileData.birthtime);
      if (isNaN(birthtimeValue.getTime())) {
        birthtimeValue = new Date(`1970-01-01T${profileData.birthtime}:00Z`);
      }
      birthtimeValue.setMinutes(
        birthtimeValue.getMinutes() - birthtimeValue.getTimezoneOffset()
      );
      if (!isNaN(birthtimeValue.getTime())) {
        birthtime.current.setVal(birthtimeValue);
      } else {
        console.error('Invalid birthtime value:', profileData.birthtime);
      }
      birthname.current.setVal(profileData.birthname);
      rashi.current.setVal(profileData.rashi);
      gotra.current.setVal(profileData.gotra);
      managal_dosh.current.setVal(profileData.mangal_dosh);
      aboutme.current.setVal(profileData.aboutme);
      expectation.current.setVal(profileData.expectation);
      contactname.current.setVal(profileData.contact?.name);
      phone.current.setVal(profileData.contact?.phone);
      relation.current.setVal(profileData.contact?.relation);
    }
  }, [profileData]);

  useEffect(() => {
    if (operation === 'update') {
      setProfileData(myProfileData);
    }
  }, [operation, myProfileData]);

  const handleUpdateProfile = async () => {
    try {
      const response = await updateProfile(token, userId, {
        //disabled data
        height: myProfileData?.height,
        name: myProfileData?.name,
        lastName: myProfileData?.lastName,
        gender: myProfileData?.gender,
        maritial_status: myProfileData?.maritial_status,
        challenged: myProfileData?.challenged,

        birthdate: myProfileData?.birthdate,
        birthtime: myProfileData?.birthtime,
        //realtime data
        current_city: current_city.current?.getVal(),
        work: work.current?.getVal(),
        education: education.current?.getVal(),
        degree: degree.current?.getVal(),
        occupation: occupation.current?.getVal(),
        annual_income: annual_income.current?.getVal(),
        birthname: birthname.current?.getVal(),
        rashi: rashi.current?.getVal(),
        gotra: gotra.current?.getVal(),
        mangal_dosh: managal_dosh.current?.getVal(),
        aboutme: aboutme.current?.getVal(),
        expectation: expectation.current?.getVal(),
        complexion: process.env.REACT_APP_COMMUNITY,
        contact: {
          name: contactname.current?.getVal(),
          phone: phone.current?.getVal(),
          relation: relation.current?.getVal(),
        },
      });

      if (response.status === 200) {
        showNotification('success', '', 'Profile updated', 2000);
        updateProfileData();
      } else {
        showNotification('danger', '', response.data.error, 2000);
      }
    } catch (e) {
      console.log('e is ', e);
      if (e.response.status == 422) {
        navigate('/login');
      } else {
        showNotification('danger', '', 'Something went wrong', 2000);
      }
    } finally {
      btnRef.current?.setLoadingOff();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    btnRef.current?.setLoadingOn();
    if (operation === 'update') {
      handleUpdateProfile();
      return;
    }
    try {
      const response = await createProfile(token, {
        profile: {
          height: height.current?.getVal(),
          name: name.current?.getVal(),
          lastName: lastName.current?.getVal(),
          gender: gender.current?.getVal(),
          maritial_status: maritial_status.current?.getVal(),
          challenged: challenged.current?.getVal(),
          current_city: current_city.current?.getVal(),
          work: work.current?.getVal(),
          education: education.current?.getVal(),
          degree: degree.current?.getVal(),
          occupation: occupation.current?.getVal(),
          annual_income: annual_income.current?.getVal(),
          birthdate: birthdate.current?.getVal(),
          birthtime: birthtime.current?.getVal(),
          birthname: birthname.current?.getVal(),
          rashi: rashi.current?.getVal(),
          gotra: gotra.current?.getVal(),
          mangal_dosh: managal_dosh.current?.getVal(),
          aboutme: aboutme.current?.getVal(),
          expectation: expectation.current?.getVal(),
          complexion: process.env.REACT_APP_COMMUNITY,
        },
        contact: {
          name: contactname.current?.getVal(),
          phone: phone.current?.getVal(),
          relation: relation.current?.getVal(),
        },
      });
      if (response.status == 201) {
        if (response.data.jwt) {
          saveToken(response.data.jwt);
        }
        navigate('/login');
        showNotification('success', '', 'Profile saved', 2000);
      } else {
        showNotification('danger', '', response.data.error, 2000);
      }
    } catch (e) {
      console.log('e is ', e);
      if (e.response.status == 422) {
        navigate('/login');
      } else {
        showNotification('danger', '', 'Something went wrong', 2000);
      }
    } finally {
      btnRef.current?.setLoadingOff();
    }
  };

  const handleButtonClick = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <>
      <BaseLayout bottomBar={false}>
        <div></div>
        <BaseForm ref={formRef} handleSubmit={handleSubmit}>
          <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
            Personal Info
          </h1>
          <hr className='w-4/5 h-2 border-custom-c2' />
          <Input
            placeholder='First Name'
            ref={name}
            isRequired={true}
            type='text'
            labelName='First Name'
            disabled={operation === 'update'}
          />
          <Input
            placeholder='Last Name'
            ref={lastName}
            isRequired={true}
            type='text'
            labelName='Last Name'
            disabled={operation === 'update'}
          />
          <div className='grid grid-cols-2 gap-5 w-2/3 '>
            <SelectInput
              defaultValue=''
              ref={gender}
              selectVals={genders}
              placeholder='Gender'
              isRequired={true}
              labelName='Gender'
              disabled={operation === 'update'}
            />
            <SelectInput
              defaultValue=''
              ref={height}
              selectVals={heights}
              placeholder='Height'
              isRequired={true}
              labelName='Height'
              disabled={operation === 'update'}
            />
          </div>
          <div className='grid grid-cols-2 gap-5 w-2/3 '>
            <SelectInput
              defaultValue=''
              selectVals={maritialStats}
              placeholder='Status'
              ref={maritial_status}
              isRequired={true}
              labelName='Status'
              disabled={operation === 'update'}
            />
            <SelectInput
              defaultValue=''
              selectVals={NoYes}
              placeholder='Physically Challenged'
              ref={challenged}
              isRequired={true}
              labelName='Physically challenged'
              disabled={operation === 'update'}
            />
          </div>
          <Input
            placeholder='Current city'
            ref={current_city}
            isRequired={true}
            type='text'
            labelName='Current city'
          />
          <div className='grid grid-cols-2 gap-5 w-2/3 '>
            <InputArea
              placeholder='Tell others about you'
              ref={aboutme}
              isRequired={false}
              rows={4}
              labelName='About me (optional)'
            />
            <InputArea
              placeholder='Your expectations'
              ref={expectation}
              isRequired={false}
              rows={4}
              labelName='Expectations (optional)'
            />
          </div>
          <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
            Professional Info
          </h1>
          <hr className='w-4/5 h-2 border-custom-c2' />
          <div className='grid grid-cols-2 gap-5 w-2/3 '>
            <Input
              placeholder='Works at'
              ref={work}
              isRequired={true}
              type='text'
              labelName='Works at'
            />
            <SelectInput
              placeholder='Education'
              ref={education}
              selectVals={educationList}
              isRequired={true}
              type='text'
              labelName='Education'
            />
          </div>
          <div className='grid grid-cols-2 gap-5 w-2/3 '>
            <Input
              placeholder='Degree'
              ref={degree}
              isRequired={true}
              type='text'
              labelName='Degree'
            />
            <Input
              placeholder='Profession'
              ref={occupation}
              isRequired={true}
              type='text'
              labelName='Profession'
            />
          </div>
          <Input
            placeholder='Annual Income'
            ref={annual_income}
            defaultValue=''
            isRequired={true}
            type='number'
            labelName='Annual Income'
          />
          <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
            Astrological Info
          </h1>
          <hr className='w-4/5 h-2 border-custom-c2' />
          <div className='grid grid-cols-2 gap-5 w-2/3 '>
            <TDatePicker ref={birthdate} disabled={operation === 'update'} />
            <TTimePicker ref={birthtime} disabled={operation === 'update'} />
          </div>
          <div className='grid grid-cols-2 gap-5 w-2/3 '>
            <SelectInput
              selectVals={devnagriInitials}
              ref={birthname}
              placeholder='Birth Name'
              isRequired={true}
              labelName='Birth Name'
            />
            <SelectInput
              selectVals={rashis}
              ref={rashi}
              placeholder='Rashi'
              isRequired={true}
              labelName='Rashi'
            />
          </div>
          <div className='grid grid-cols-2 gap-5 w-2/3 '>
            <Input
              placeholder='Gotra'
              ref={gotra}
              isRequired={true}
              type='text'
              labelName='Gotra'
            />
            <SelectInput
              ref={managal_dosh}
              selectVals={yesNoDontKnow}
              placeholder='Mangalik'
              isRequired={true}
              labelName='Mangalik'
            />
          </div>
          <h1 className='mr-auto ml-auto text-left text-xl text-custom-c2'>
            Contact Info
          </h1>
          <hr className='w-4/5 h-2 border-custom-c2' />
          <Input
            placeholder='Name of contact person'
            ref={contactname}
            isRequired={true}
            labelName='Contact Name'
          />
          <Input
            placeholder='Contact phone'
            ref={phone}
            isRequired={true}
            labelName='Contact phone'
          />
          <Input
            placeholder='e.g. Father,Self'
            ref={relation}
            isRequired={true}
            labelName='Relation with contact'
          />
          <FormButton
            ref={btnRef}
            type='submit'
            onClick={handleButtonClick}
            name={operation === 'update' ? 'Update' : 'Save'}
          />
        </BaseForm>
      </BaseLayout>
    </>
  );
};

export default AddProfileInfoPage;


