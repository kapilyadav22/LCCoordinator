import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext.js";
import { RouteConfig } from "../config/RouteConfig";

export const RouteAllPages = () => {
  const { mode } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`p-4 mt-[2%] min-h-[calc(100vh-120px)] ${
          mode === "light"
            ? "bg-gradient-to-br from-purple-50 to-white"
            : "bg-gradient-to-br from-gray-900 to-black"
        }`}
      >
        <Routes>
          {RouteConfig.map((item) => {
            return (
              <Route path={item.path} element={item.element} key={item.path} />
            );
          })}
        </Routes>
      </div>
    </>
  );
};
