const CustomButton = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`w-full bg-title-main text-white py-2 px-4 rounded hover:bg-title-themecolor transition-colors duration-300 font-medium mt-6 mb-4 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
