export const CustomTitle = ({
  title,
  variant = "h5",
  fontWeight = "bold",
  fontSize,
  color = "text-title-main",
  textAlign = "center",
  textTransform = "uppercase",
  marginTop = "1%",
  marginBottom = "1%",
  justifyContent = "center",
  className = "",
}) => {
  const sizeClass = fontSize
    ? `text-[${fontSize}]`
    : variant === "h5"
      ? "text-xl"
      : "text-base";
  const colorClass = color.includes(".")
    ? `text-${color.replace(".", "-")}`
    : color;

  const weightClass = fontWeight === "regular" ? "font-normal" : "font-bold";

  return (
    <div
      className={`flex w-full ${className}`}
      style={{
        justifyContent,
        marginTop,
        marginBottom,
      }}
    >
      <span
        className={`${sizeClass} ${weightClass} ${colorClass}`}
        style={{
          textAlign,
          textTransform,
          letterSpacing: "0.1rem",
          lineHeight: 1.5,
        }}
      >
        {title}
      </span>
    </div>
  );
};
