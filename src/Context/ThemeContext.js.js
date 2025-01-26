import { ThemeProvider } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';
import darkTheme from '../themes/darkTheme';
import lightTheme from '../themes/lightTheme';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("mode"));

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  };
  

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

