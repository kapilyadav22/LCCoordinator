import React, { useEffect, useState } from "react";
import CardsContainer from "../layout/CardsContainer";

function LandingPage() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="container mx-auto px-1 mt-6">
      <div className="flex flex-col items-center justify-center mt-6 mb-2">
        <div className="w-full text-center">
          <h1 className="text-title-main font-bold text-4xl sm:text-5xl md:text-6xl mb-4">
            LC Coordinator
          </h1>

          <div
            className={`transition-opacity duration-1000 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-text-primary text-2xl sm:text-3xl md:text-4xl">
              ReDefine The way We Learn
            </h1>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <CardsContainer />
      </div>
    </div>
  );
}

export default LandingPage;
