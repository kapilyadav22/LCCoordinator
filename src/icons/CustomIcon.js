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
    <span
      className={`inline-flex items-center justify-center ${className} ${onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md' : ''}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `${name} icon button` : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e);
        }
      }}
    >
      <Icon color={color} strokeWidth={1.5} className="w-5 h-5" {...props} />
    </span>
  );
};
export default CustomIcon;
