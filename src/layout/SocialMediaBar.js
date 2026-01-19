import { SocialMediaLinks } from "../constants/urlConstants";
import CustomIcon from "../icons/CustomIcon";

const SocialMediaBar = () => {
  const handleButtonClick = (link) => {
    window.open(link, "_blank", "noopener noreferrer");
  };

  return (
    <div className="flex justify-center gap-4 mt-1 p-1 flex-wrap">
      {Object.keys(SocialMediaLinks).map((key) => (
        <div key={key}>
          <CustomIcon
            name={key}
            className="w-8 h-8 text-text-primary hover:text-title-main transition-colors"
            onClick={() => handleButtonClick(SocialMediaLinks[key])}
          />
        </div>
      ))}
    </div>
  );
};

export default SocialMediaBar;
