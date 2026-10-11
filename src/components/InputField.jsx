import { useState } from "react";

// InputField component - the dark styled input used on login/register pages
// type: "text", "email", "password"
// label: the text shown above the input
function InputField({ label, type = "text", placeholder, value, onChange }) {
  // For password fields, we need to track if password is visible
  const [showPassword, setShowPassword] = useState(false);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "100%",
  };

  const labelStyle = {
    fontSize: "11px",
    fontWeight: "600",
    color: "var(--text-gray)",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
  };

  const inputWrapperStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "var(--bg-input)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    padding: "0 12px",
    gap: "8px",
  };

  const inputStyle = {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "var(--text-white)",
    fontSize: "14px",
    padding: "12px 0",
  };

  // Decide the actual input type (for password show/hide toggle)
  const actualType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div style={containerStyle}>
      {/* Label above the input */}
      {label && <label style={labelStyle}>{label}</label>}

      {/* Input box */}
      <div style={inputWrapperStyle}>
        {/* Small icon on the left */}
        <span style={{ color: "var(--text-gray)", fontSize: "13px" }}>
          {type === "password" ? "🔒" : type === "email" ? "✉" : "👤"}
        </span>

        <input
          type={actualType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={inputStyle}
        />

        {/* Show/hide button only for password fields */}
        {type === "password" && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-gray)",
              fontSize: "13px",
              padding: "0",
            }}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
