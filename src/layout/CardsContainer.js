import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteConfig } from "../config/RouteConfig";
import { ThemeContext } from "../Context/ThemeContext.js";
import { cardData } from "../dataFields/carddata";

const CardsContainer = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setValue(Number(savedTab));
    }
  }, []);

  const handleCardClick = (title) => {
    const currentPage = RouteConfig.find((item) => title === item.pageName);
    const url = currentPage?.path;
    navigate(url);
  };

  return (
    <div className="w-full p-4 sm:p-6 rounded-[2.5rem] glass-panel h-auto backdrop-blur-2xl bg-white/5 dark:bg-black/20">
      <div className="flex flex-wrap justify-center gap-6 p-2">
        {cardData.map((card, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(card.title)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(card.title);
              }
            }}
            className="glass-panel glass-panel-hover rounded-[1.5rem] w-full sm:w-auto sm:min-w-[260px] max-w-sm flex flex-col cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-title-main"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-4 text-center">
              <h6 className="text-xl sm:text-base font-medium text-text-primary mb-1">
                {card.title}
              </h6>
              <p className="text-base sm:text-sm text-text-secondary">
                {card.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;
