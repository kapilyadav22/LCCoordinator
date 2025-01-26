import { Box, CssBaseline } from '@mui/material';
import { memo, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { ContextProvider } from './Context/ContextProvider';
import { ThemeContextProvider } from './Context/ThemeContext.js';
import { RouteAllPages } from './routes/routeAllPages';

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
     <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ThemeContextProvider>
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
  );
}

export default App;
