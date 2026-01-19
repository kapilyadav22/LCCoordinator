import { memo, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ContextProvider } from "./Context/ContextProvider";
import { ThemeContextProvider } from "./Context/ThemeContext.js";
import { RouteAllPages } from "./routes/routeAllPages";

function App() {
  const RoutesMemo = memo(RouteAllPages);

  const PageViewTracker = () => {
    const location = useLocation();

    useEffect(() => {
      if (window.gtag) {
        window.gtag("event", "page_view", {
          page_path: location.pathname,
        });
      }
    }, [location]);

    return null;
  };
  return (
    <div className="flex flex-col min-h-screen bg-background-default text-text-primary transition-colors duration-300">
      <ThemeContextProvider>
        <ContextProvider>
          <BrowserRouter>
            <PageViewTracker />
            <Header />
            <main className="flex-grow">
              <RoutesMemo />
            </main>
            <Footer />
          </BrowserRouter>
        </ContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
