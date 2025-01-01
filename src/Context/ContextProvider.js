import React, { useContext, useState, useEffect, useMemo } from 'react';
import UserContext from './UserContext';
import { alertInitialData } from '../dataFields/alertData';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';



export const ContextProvider = ({ children }) => {

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedAdminStatus = localStorage.getItem("adminStatus");
  
    if (storedIsLoggedIn) {
      updateUserName(storedUsername);
      updateLogin(true);
      updateAdminStatus(storedAdminStatus);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState(() => {
    return "Login";
  });
  const [adminStatus, setAdminStatus] = useState("User");

  const [alert, setAlert] = useState(alertInitialData);

  const updateLogin = (login) => {
    setIsLoggedIn(login);
  };

  const updateUserName = (name) => {
    setUsername(name);
    localStorage.setItem("username",name);
    localStorage.setItem("isLoggedIn", true);
  };

  const updateAdminStatus = (role) => {
    setAdminStatus(role)
    localStorage.setItem("adminStatus", role);
  };

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const closeAlert = () => {
    setAlert(alertInitialData);
  };

  return (
    <UserContext.Provider value={{ userName, updateUserName, isLoggedIn, updateLogin, alert, showAlert, closeAlert, updateAdminStatus, adminStatus }}>
       {children}
    </UserContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(UserContext);
};
