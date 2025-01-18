import { BrowserRouter, useLocation } from 'react-router-dom';
import React, { memo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Box, createTheme, CssBaseline } from '@mui/material';
import { RouteAllPages } from './routes/routeAllPages';
import { ContextProvider } from './Context/ContextProvider';
import { ThemeContextProvider } from './Context/ThemeContext.js';

function App() {
   const RoutesMemo = memo(RouteAllPages);

   const PageViewTracker = () => {
    const location = useLocation();
  
    useEffect(() => {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
      });
    }, [location]);
  
    return null;
  };

  return (
    <>
     <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ThemeContextProvider>
      {/* to apply a consistent global reset and baseline styling across our application.
       ensuring our theme's background and typography settings are applied globally. */}
      <CssBaseline />
      <ContextProvider>
      <BrowserRouter>
      <PageViewTracker />
        <Header />
        <RoutesMemo/>
        <Footer />
      </BrowserRouter>
      </ContextProvider>
    </ThemeContextProvider >
       </Box>
    </>
     
  );
}

export default App;
