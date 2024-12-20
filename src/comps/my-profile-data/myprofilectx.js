import React, { createContext, useState, useContext, useEffect } from 'react';
import { getMyProfile } from '../../services/apiService';
import { useAuth } from '../auth/authctx';

const MyProfileData = createContext();

export const useMyProfileData = () => useContext(MyProfileData);

export const MyProfileDataProvider = ({ children }) => {
  const [myProfileData, setMyProfileData] = useState(null);
  const { token } = useAuth();

  const getProfileData = async () => {
    try {
      const response = await getMyProfile(token);
      setMyProfileData(response.data.data);
    } catch (e) {
      console.log('error resp', e);
    }
  };

  useEffect(() => {
    if (token) {
      getProfileData();
    }
  }, [token]);

  const updateProfileData = () => {
    getProfileData();
  };

  return (
    <MyProfileData.Provider
      value={{
        myProfileData,
        updateProfileData,
      }}
    >
      {children}
    </MyProfileData.Provider>
  );
};


