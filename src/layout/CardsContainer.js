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
    <div
      className={`w-full p-4 sm:p-5 rounded-2xl border border-title-main/40 ${
        mode === "light"
          ? "bg-gradient-to-br from-purple-800 to-black"
          : "bg-gradient-to-br from-gray-900 to-black"
      } h-auto`}
    >
      <div className="flex flex-wrap justify-center gap-5 p-2">
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.title)}
            className="bg-background-paper rounded-2xl w-full sm:w-auto sm:min-w-[250px] max-w-sm flex flex-col cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
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
