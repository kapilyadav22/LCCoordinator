import { useContext, useState } from "react";
import { VisualiserCommonUrl } from "../constants/urlConstants";
import { ThemeContext } from "../Context/ThemeContext.js";

const VisualizerDialogBox = ({ title, url }) => {
  const [open, setOpen] = useState(false);
  const { mode } = useContext(ThemeContext);

  const openUrl = () => {
    if (url) {
      window.open(VisualiserCommonUrl + url, "_blank");
    }
  };

  return (
    <div className="m-1 p-1">
      <button
        className={`
          min-h-[60px] w-full px-4 py-2 rounded font-medium text-title-themecolor transition-colors hover:opacity-90
          ${mode === "light" ? "bg-gray-800 text-white" : "bg-white text-black"}
        `}
        onClick={openUrl}
      >
        Visualise {title}
      </button>
    </div>
  );
};

export default VisualizerDialogBox;
