// Button component - used everywhere in the app
// variant: "primary" (orange) or "secondary" (dark)
function Button({ children, onClick, variant = "primary", fullWidth = false, style = {} }) {
  const baseStyle = {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: fullWidth ? "100%" : "auto",
    transition: "opacity 0.2s",
    ...style,
  };

  // Orange button style (primary)
  const primaryStyle = {
    ...baseStyle,
    backgroundColor: "var(--orange)",
    color: "white",
  };

  // Dark button style (secondary)
  const secondaryStyle = {
    ...baseStyle,
    backgroundColor: "var(--bg-card)",
    color: "var(--text-white)",
    border: "1px solid var(--border-color)",
  };

  return (
    <button
      style={variant === "primary" ? primaryStyle : secondaryStyle}
      onClick={onClick}
      onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {children}
    </button>
  );
}

export default Button;
