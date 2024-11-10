// theme.js
import { createTheme } from '@mui/material/styles';

const Theme = {
  palette: {
    primary: {
      main: '#ffb115',  //lccolor (Yellow)
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
      default: '#f5f5f5', 
      paper: '#ffffff', 
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
        main: "#000000",
    }
  },

  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 500, color: 'text.primary' },
    h2: { fontSize: '2rem', fontWeight: 500, color: 'text.secondary' },
    // h8: {  color: 'black' },
    body1: { fontSize: '1rem', color: 'text.primary' },
    body2: { fontSize: '0.875rem', color: 'text.secondary' },

  },

};

export default Theme;