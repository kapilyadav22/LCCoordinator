import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  // Initialize state from local storage or default to 'light'
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mode") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove both potential classes to be safe
    root.classList.remove("light", "dark");
    // Add the current mode class
    root.classList.add(mode);
    // Save to local storage
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      {children}
    </ThemeContext.Provider>
  );
};
