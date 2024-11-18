import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const getLocalStorageItem = (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const [token, setToken] = useState(() => getLocalStorageItem('token'));
  const [userId, setUserId] = useState(() => getLocalStorageItem('userId'));

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const saveUserId = (uid) => {
    setUserId(uid);
    localStorage.setItem('userId', uid);
  };

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, userId, saveToken, removeToken, saveUserId, }}>
      {children}
    </AuthContext.Provider>
  );
};
