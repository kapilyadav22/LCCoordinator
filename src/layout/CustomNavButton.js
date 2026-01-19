import { Link } from "react-router-dom";

const NavButton = ({ label, to, style = {}, onClick }) => {
  const handleButtonClick = () => {
    localStorage.removeItem("activeTab");
    if (onClick) onClick();
  };

  return (
    <Link
      to={to}
      onClick={handleButtonClick}
      className={`text-title-main text-base no-underline transition-all duration-500 hover:scale-125 hover:text-title-main ${
        style.className || ""
      }`}
      style={{
        ...style,
      }}
    >
      {label}
    </Link>
  );
};

export default NavButton;
