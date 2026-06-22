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
    <div className="flex flex-col min-h-screen bg-background-default text-text-primary transition-colors duration-500 relative overflow-hidden">
      {/* Global Animated Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-500/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-teal-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none animate-pulse delay-700"></div>
      <div className="fixed top-[40%] left-[60%] w-[30vw] h-[30vw] bg-cyan-300/10 rounded-full blur-[90px] -z-10 mix-blend-screen pointer-events-none animate-pulse delay-1000"></div>

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
