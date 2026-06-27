import React, { useEffect, useState } from "react";
import CardsContainer from "../layout/CardsContainer";

function LandingPage() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <div
          className={`text-center transition-all duration-1000 transform ${
            fadeIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h1 className="text-title-main font-bold text-3xl sm:text-4xl mb-2">
            Preparation Tracks
          </h1>
          <p className="text-text-secondary text-lg">
            Choose a topic below to start mastering the concepts.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <CardsContainer />
      </div>
    </div>
  );
}

export default LandingPage;
