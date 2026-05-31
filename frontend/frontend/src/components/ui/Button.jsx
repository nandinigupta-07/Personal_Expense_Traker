function Button({
  type = "button",
  variant = "primary",
  className = "",
  onClick,
  children,
  disabled = false
}) {
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "border border-white text-white hover:bg-white hover:text-blue-600",
    light: "bg-white text-blue-600 hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-semibold transition disabled:bg-gray-400 disabled:cursor-not-allowed ${variantClasses[variant] || variantClasses.primary} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
