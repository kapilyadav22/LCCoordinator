// theme.js
import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      // main: '#ffb115',  //lccolor (Yellow)
      main: '#4a148c',
      light: '#ff8f00',
      dark: '#000000', //black
      contrastText: '#FFFFFF', //white
    },
    secondary: {
      main: '#dc004e', 
      light: '#ff5c8d',
      dark: '#9a0036',
      contrastText: '#ffffff',
    },
    background: {
      // default: "red", 
      paper: '#ffffff', 
    },
    problem: {
      statement: '#4a148c', 
    //   secondary: '#FFFFFF', 
    },
    // text: {
    //   primary: '#000000', 
    //   secondary: '#FFFFFF', 
    // },

    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    appbar:{
        main: "#212121",
    },
    itemhover:{
      main: "#ffcc06"
    },
  },
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          // background: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)',
          background: 'linear-gradient(152deg, #ffffff 0%, #ffcc06 100%)'
        },
      },
    },
  },

  typography: {
  //  fontFamily: "'Parkinson', serif",
    h1: { fontSize: '4.5rem', fontWeight: 500, color: 'text.primary' },
    h2: { fontSize: '3.5rem', fontWeight: 500, color: 'text.secondary' },
    h2: { fontSize: '3rem', fontWeight: 500, color: 'text.secondary' },
    body1: { fontSize: '1rem', color: 'text.primary' },
    body2: { fontSize: '0.875rem', color: 'text.secondary' },

  },
});

export default Theme;