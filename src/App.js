import { BrowserRouter } from 'react-router-dom';
import React, { memo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { createTheme, CssBaseline } from '@mui/material';
import { RouteAllPages } from './routes/routeAllPages';
import { ContextProvider } from './Context/ContextProvider';
import { ThemeContextProvider } from './Context/ThemeContext.js';

function App() {
   const RoutesMemo = memo(RouteAllPages);

  return (
    <>
      <ThemeContextProvider>
      {/* to apply a consistent global reset and baseline styling across our application.
       ensuring our theme's background and typography settings are applied globally. */}
      <CssBaseline />
      <ContextProvider>
      <BrowserRouter>
        <Header />
        <RoutesMemo/>
        <Footer />
      </BrowserRouter>
      </ContextProvider>
    </ThemeContextProvider >
    </>
     
  );
}

export default App;
