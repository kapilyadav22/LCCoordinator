import iconsMap from "./iconmap";

const CustomIcon = ({
  name,
  onClick,
  className = "",
  color = "currentColor",
  ...props
}) => {
  const Icon = iconsMap.has(name)
    ? iconsMap.get(name)
    : iconsMap.get("default");

  return (
    <Icon
      onClick={onClick}
      className={`w-5 h-5 cursor-pointer ${className}`}
      color={color}
      strokeWidth={1.5}
      {...props}
    />
  );
};
export default CustomIcon;
