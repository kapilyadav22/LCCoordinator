import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../Authentication/UserContext';
import { alertInitialData } from '../data/alertData';


export const ContextProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState(() => {
    return localStorage.getItem('userName') || "Login";
  });
  const [alert, setAlert] = useState(alertInitialData);

  const updateLogin = (login) => {
    setIsLoggedIn(login);
  };

  const updateUserName = (name) => {
    setUsername(name);
    localStorage.setItem('userName', name);
  };

  const showAlert = (severity, message) => {
    console.log(severity, message);
    setAlert({ open: true, severity, message });
  };


  const closeAlert = () => {
    setAlert(alertInitialData);
  };


  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  return (
    <UserContext.Provider value={{userName, updateUserName, isLoggedIn, updateLogin, alert, showAlert, closeAlert }}>
      {children}
    </UserContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(UserContext);
};
