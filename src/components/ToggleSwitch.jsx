// ToggleSwitch component - the orange/gray on-off switch in settings
function ToggleSwitch({ isOn, onChange, disabled = false }) {
  const trackStyle = {
    width: "46px",
    height: "24px",
    borderRadius: "12px",
    backgroundColor: isOn ? "var(--orange)" : "#374151",
    cursor: disabled ? "not-allowed" : "pointer",
    position: "relative",
    transition: "background-color 0.2s",
    flexShrink: 0,
    opacity: disabled ? 0.6 : 1,
  };

  const thumbStyle = {
    position: "absolute",
    top: "3px",
    left: isOn ? "25px" : "3px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "white",
    transition: "left 0.2s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
  };

  return (
    <div
      style={trackStyle}
      onClick={() => !disabled && onChange(!isOn)}
    >
      <div style={thumbStyle}></div>
    </div>
  );
}

export default ToggleSwitch;
