import CustomIcon from "../icons/CustomIcon";

const CustomIconButtonBox = (props) => {
  const { iconName, onClick, className = "", arialabel } = props;
  return (
    <div className="h-9 w-9 flex items-center justify-center p-0.5 rounded-md m-2.5 border border-gray-400 bg-background-paper hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <CustomIcon
        name={iconName}
        onClick={onClick}
        className={`text-title-main ${className}`}
        aria-label={arialabel}
      />
    </div>
  );
};
export default CustomIconButtonBox;
