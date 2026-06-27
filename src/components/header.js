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
    <div className="w-full flex justify-center fixed top-4 z-50 px-4">
      <header className="w-full max-w-7xl h-16 rounded-full glass-panel transition-all duration-500">
        <div className="px-6 h-full flex justify-between items-center gap-4">
          <a
            href="/"
            className="text-xl sm:text-2xl font-bold text-title-main hover:scale-105 transition-transform duration-500 decoration-0 whitespace-nowrap"
          >
            LC Coordinator
          </a>

          {/* Middle Navigation - Hidden on Mobile, visible on MD and up */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
            <NavButton label="Home" to="/" />
            <NavButton label="Typing Master" to="/typing-master" />
            <NavButton label="Developer Tools" to="/utilitytools" />
            <NavButton label="Resources" to="/resources" />
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="text-text-primary p-2 active:bg-gray-200 dark:active:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/5"
              aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            >
              <CustomIcon name={mode === "light" ? "dark" : "light"} className="text-title-main" />
            </button>

            {/* User Quick Actions (Desktop/Tablet only) */}
            <div className="hidden sm:flex items-center gap-4">
              {!isLoggedIn ? (
                <NavButton
                  label="Login"
                  to="/login"
                  style={{ className: "text-sm font-semibold hover:text-cyan-400" }}
                />
              ) : (
                <div className="flex items-center gap-3">
                  <NavButton
                    label={userName}
                    to="/profile"
                    style={{ className: "text-sm font-bold text-cyan-400 hover:text-title-main" }}
                  />
                  <button
                    onClick={handleSignOut}
                    className="text-xs text-red-400 hover:text-red-300 font-mono bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-full border border-red-500/20 transition-all active:scale-95"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Menu Button */}
            <button
              className="text-text-primary p-2 active:bg-gray-200 dark:active:bg-gray-700 rounded-full transition-transform hover:scale-110"
              aria-label="Open Navigation Menu"
              aria-expanded={drawerOpen}
              onClick={() => toggleDrawer(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* Global Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Navigation Menu">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => toggleDrawer(false)}
            aria-hidden="true"
          ></div>

          {/* Sidebar */}
          <div className="absolute right-0 top-0 w-64 h-full bg-background-paper p-4 shadow-xl transition-transform duration-300 animate-slide-in-right border-l border-title-main/20 flex flex-col">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-title-main/20 pl-2">
                <a href="/" className="text-xl font-bold text-title-main">
                  LC Coordinator
                </a>
                <button
                  onClick={() => toggleDrawer(false)}
                  className="text-text-secondary"
                  aria-label="Close Mobile Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav aria-label="Mobile Navigation" className="flex flex-col gap-4 pl-2">
                <NavButton
                  label="Home"
                  to="/"
                  onClick={() => toggleDrawer(false)}
                />
                <NavButton
                  label="Prepare"
                  to="/prepare"
                  onClick={() => toggleDrawer(false)}
                />
                <NavButton
                  label="Typing Master"
                  to="/typing-master"
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
                  label="Developer Tools"
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
                <button
                  className="mt-4 flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 text-left"
                  onClick={() => {
                    toggleDrawer(false);
                    toggleTheme();
                  }}
                >
                  <CustomIcon name={mode} className="text-text-primary" />
                  <span className="text-text-primary capitalize">
                    {mode} Mode
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      <CustomAlert1 alert={alert} closeAlert={() => showAlert("", "", false)} />
    </div>
  );
};

export default Header;
