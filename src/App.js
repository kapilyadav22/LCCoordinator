import { BrowserRouter } from 'react-router-dom';
import React, { memo } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { createTheme } from '@mui/material';
import Theme from './theme/theme';
import { RouteAllPages } from './routes/routeAllPages';

function App() {
  const theme = createTheme(Theme);
  const RoutesMemo = memo(RouteAllPages);

  return (
    <>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <RoutesMemo/>
        <Footer />
      </BrowserRouter>
    </ThemeProvider >
    </>
     
  );
}

export default App;
