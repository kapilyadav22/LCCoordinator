import React, { useContext } from "react";
import SocialMediaBar from "../layout/SocialMediaBar";
import { ThemeContext } from "../Context/ThemeContext.js";

const Footer = () => {
  const { mode } = useContext(ThemeContext);

  return (
    <footer className="w-full py-4 bg-transparent mt-auto backdrop-blur-sm">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <SocialMediaBar />
        <p className="text-sm text-title-main text-center font-medium">
          © {new Date().getFullYear()} LC Coordinator. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
