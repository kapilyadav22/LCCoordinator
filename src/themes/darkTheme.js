import { createTheme } from '@mui/material/styles';

const DarkTheme = createTheme({
  palette: {
    primary: {
      main: '#4a148c', 
      light: '#7c43bd', 
      dark: '#12005e', 
      contrastText: '#FFFFFF', 
    },
    secondary: {
      main: '#dc004e', 
      light: '#ff5c8d',
      dark: '#9a0036',
      contrastText: '#FFFFFF', 
    },
    background: {
      default: '#121212', 
      paper: '#1e1e1e', 
    },
    problem: {
      statement: '#e1bee7', 
    //   secondary: '#FFFFFF', 
    },
    text: {
      primary: '#FFFFFF', 
      secondary: '#b0b0b0', 
    },
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
    appbar: {
      main: '#333333', 
    },
    carditem: {
      background:'#9fa8da',
    },
    itemhover:{
      main: "#4a148c"
    }
  },

  typography: {
    h1: { fontSize: '4.5rem', fontWeight: 500, color: 'text.primary' },
    h2: { fontSize: '3.5rem', fontWeight: 500, color: 'text.secondary' },
    h3: { fontSize: '3rem', fontWeight: 500, color: 'text.secondary' },
    body1: { fontSize: '1rem', color: 'text.primary' },
    body2: { fontSize: '0.875rem', color: 'text.secondary' },
  },
});

export default DarkTheme;
