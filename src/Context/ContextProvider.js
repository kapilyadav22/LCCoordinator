import React, { useContext, useState, useEffect } from 'react';
import UserContext from './UserContext';
import { alertInitialData } from '../dataFields/alertData';


export const ContextProvider = ({ children }) => {
  
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
    if (storedIsLoggedIn) {
      updateUserName(storedUsername);
      updateLogin(true);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState(() => {
    return "Login";
  });

  const [alert, setAlert] = useState(alertInitialData);

  const updateLogin = (login) => {
    setIsLoggedIn(login);
  };

  const updateUserName = (name) => {
    setUsername(name);
    localStorage.setItem("username",name);
    localStorage.setItem("isLoggedIn", true);
  };

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const closeAlert = () => {
    setAlert(alertInitialData);
  };

  return (
    <UserContext.Provider value={{userName, updateUserName, isLoggedIn, updateLogin, alert, showAlert, closeAlert }}>
      {children}
    </UserContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(UserContext);
};
