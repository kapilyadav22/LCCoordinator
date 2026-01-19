import React, { useContext, useEffect, useState } from "react";
import NavButton from "../layout/CustomNavButton";
import { useMyContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import {
  darkmodecolor,
  HOMEROUTE,
  lightmodecolor,
  navigationTimer,
} from "../constants/urlConstants";
import useCustomAlert from "../customHooks/customAlertHook";
import CustomAlert1 from "../layout/CustomAlert1";
import CustomIcon from "../icons/CustomIcon";
import { ThemeContext } from "../Context/ThemeContext.js";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const { userName, isLoggedIn, updateLogin } = useMyContext();
  const { alert, showAlert } = useCustomAlert();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  // Note: modecolor logic is largely handled by CSS variables/classes now,
  // but we keep it if specific JS usages exist.
  // For Header bg, we can use Tailwind classes directly.

  const handleSignOut = () => {
    showAlert("success", "User SignOut Successfully");
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("activeTab");

    setTimeout(() => {
      updateLogin(false);
      navigate(HOMEROUTE);
    }, navigationTimer);
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <>
      <header className="fixed top-0 w-full h-16 z-40 bg-[color:var(--bg-appbar)] shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 flex justify-center">
        <div className="container px-4 h-full flex justify-between items-center">
          <a
            href="/"
            className="text-xl sm:text-2xl font-bold text-title-main hover:scale-110 transition-transform duration-700 decoration-0"
          >
            LC Coordinator
          </a>

          <div className="hidden sm:flex gap-4 lg:gap-8 items-center justify-center flex-wrap">
            <NavButton label="Prepare" to="/" />
            <NavButton label="Articles" to="/articles" />
            <NavButton label="Resources" to="/resources" />
            <NavButton label="About Me" to="/aboutme" />
            <NavButton label="Utility Tools" to="/utilitytools" />

            {!isLoggedIn ? (
              <NavButton label="Login" to="/login" />
            ) : (
              <>
                <NavButton
                  label={userName}
                  to="/"
                  style={{ fontWeight: "bold" }}
                />
                <NavButton label="Sign Out" onClick={handleSignOut} />
              </>
            )}
            <div className="mt-1">
              <CustomIcon
                name={mode}
                className="text-text-primary hover:text-title-main transition-colors"
                onClick={toggleTheme}
              />
            </div>
          </div>

          <button
            className="sm:hidden text-text-primary p-2 active:bg-gray-200 dark:active:bg-gray-700 rounded-full"
            onClick={() => toggleDrawer(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => toggleDrawer(false)}
          ></div>

          {/* Sidebar */}
          <div className="absolute left-0 top-0 w-64 h-full bg-background-paper p-4 shadow-xl transition-transform duration-300 animate-slide-in-left border-r border-title-main/20">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-title-main/20 pl-2">
                <a href="/" className="text-xl font-bold text-title-main">
                  LC Coordinator
                </a>
                <button
                  onClick={() => toggleDrawer(false)}
                  className="text-text-secondary"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4 pl-2">
                <NavButton
                  label="Prepare"
                  to="/"
                  onClick={() => toggleDrawer(false)}
                />
                <NavButton
                  label="Articles"
                  to="/articles"
                  onClick={() => toggleDrawer(false)}
                />
                <NavButton
                  label="Resources"
                  to="/resources"
                  onClick={() => toggleDrawer(false)}
                />
                <NavButton
                  label="Utility Tools"
                  to="/utilitytools"
                  onClick={() => toggleDrawer(false)}
                />
                <NavButton
                  label="About Me"
                  to="/aboutme"
                  onClick={() => toggleDrawer(false)}
                />

                {!isLoggedIn ? (
                  <NavButton
                    label="Login"
                    to="/login"
                    onClick={() => toggleDrawer(false)}
                  />
                ) : (
                  <>
                    <NavButton
                      label={userName}
                      to="/"
                      onClick={() => toggleDrawer(false)}
                      style={{ fontWeight: "bold" }}
                    />
                    <NavButton
                      label="Sign Out"
                      onClick={() => {
                        toggleDrawer(false);
                        handleSignOut();
                      }}
                    />
                  </>
                )}
                <div
                  className="mt-4 flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    toggleDrawer(false);
                    toggleTheme();
                  }}
                >
                  <CustomIcon name={mode} className="text-text-primary" />
                  <span className="text-text-primary capitalize">
                    {mode} Mode
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CustomAlert1 alert={alert} closeAlert={() => showAlert("", "", false)} />
    </>
  );
};

export default Header;
