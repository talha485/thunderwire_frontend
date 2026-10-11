// Avatar component - the colored circle with initials
// Used in sidebar, chat messages, and profile settings
function Avatar({ initials, color = "#f97316", size = 36, showOnline = false }) {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: size * 0.35,
    flexShrink: 0,
    position: "relative",
  };

  const onlineDotStyle = {
    position: "absolute",
    bottom: "1px",
    right: "1px",
    width: size * 0.28,
    height: size * 0.28,
    borderRadius: "50%",
    backgroundColor: "var(--green)",
    border: "2px solid var(--bg-sidebar)",
  };

  return (
    <div style={avatarStyle}>
      {initials}
      {/* Green online dot shown when showOnline is true */}
      {showOnline && <div style={onlineDotStyle}></div>}
    </div>
  );
}

export default Avatar;
