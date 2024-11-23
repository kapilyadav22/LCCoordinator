import { BrowserRouter } from 'react-router-dom';
import React, { memo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { createTheme } from '@mui/material';
import Theme from './theme/theme';
import { RouteAllPages } from './routes/routeAllPages';
import { ContextProvider } from './Context/ContextProvider';

function App() {
  const theme = createTheme(Theme);
  const RoutesMemo = memo(RouteAllPages);

  return (
    <>
      <ThemeProvider theme={theme}>
      <ContextProvider>
      <BrowserRouter>
        <Header />
        <RoutesMemo/>
        <Footer />
      </BrowserRouter>
      </ContextProvider>
    </ThemeProvider >
    </>
     
  );
}

export default App;
