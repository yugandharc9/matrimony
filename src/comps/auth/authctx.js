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
    setToken(null);
    removeLocalStorageItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, userId, saveToken, removeToken, saveUserId,setIsAuthenticated, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};
