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

  const removeLocalStorageItem = (key) => {
    try {
      localStorage.removeItem(key);
    } catch(e) {
      console.log("logging error catching the removal of token", e)
      return null;
    }
  };

  const [token, setToken] = useState(() => getLocalStorageItem('token'));
  const [userId, setUserId] = useState(() => getLocalStorageItem('userId'));
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setIsAuthenticated(true);
  };

  const saveUserId = (uid) => {
    setUserId(uid);
    localStorage.setItem('userId', uid);
  };

  const removeToken = () => {
    console.log('before token in memory',token);
    setToken(null);
    removeLocalStorageItem('token');
    removeLocalStorageItem('userId');
    setIsAuthenticated(false);
    console.log('after token in memory',token);
    console.log('after userId in storage',getLocalStorageItem('userId'));
    console.log('after token in storage',getLocalStorageItem('token'));
  };

  return (
    <AuthContext.Provider value={{ token, userId, saveToken, removeToken, saveUserId,setIsAuthenticated, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};
