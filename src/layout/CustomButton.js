const CustomButton = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`w-full bg-title-main text-white py-3 px-6 rounded-full hover:shadow-[0_0_15px_rgba(217,119,6,0.3)] dark:hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] transform transition-all duration-300 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 font-bold tracking-wide mt-6 mb-4 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
