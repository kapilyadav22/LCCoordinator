import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoginPage } from '../Authentication copy/loginPage';
import { LogOutPage } from '../Authentication copy/logOutPage';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState(() => {
    return localStorage.getItem('userName') || "Login";
  });

  const updateLogin = () => {
    setIsLoggedIn(prevIsLoggedIn => !prevIsLoggedIn);
  };

  const updateUserName = (name) => {
    setUsername(name);
    localStorage.setItem('userName', name);
  };

  const openLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  const closeLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  return (
    <PopupContext.Provider value={{ isLoginPopupOpen, openLoginPopup, closeLoginPopup, userName, updateUserName, isLoggedIn, updateLogin }}>
      {children}
      {userName === "Login" && isLoginPopupOpen && <LoginPage onClose={closeLoginPopup}> </LoginPage>}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  return useContext(PopupContext);
};
