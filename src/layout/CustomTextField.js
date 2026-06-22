const CustomTextField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  multiline = false,
  minRows,
  className = "",
}) => {
  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div className={`w-full mb-4 ${className}`}>
      <label
        htmlFor={name}
        className="block text-title-main text-sm font-medium mb-1 pl-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <InputComponent
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        rows={multiline ? minRows || 4 : undefined}
        className="w-full px-4 py-3 bg-white/5 dark:bg-black/20 border border-title-main/30 rounded-2xl text-text-primary focus:outline-none focus:ring-2 focus:ring-title-main focus:border-transparent transition-all placeholder-gray-500 shadow-inner backdrop-blur-sm"
      />
    </div>
  );
};

export default CustomTextField;
