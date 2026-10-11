function Logo({ size = "medium", showText = true }) {
  const logoHeight =
      size === "large" ? "50px" :
          size === "small" ? "30px" :
              "40px";

  const fontSize =
      size === "large" ? "28px" :
          size === "small" ? "16px" :
              "22px";

  const subtitleSize =
      size === "large" ? "13px" : "11px";

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
      <div style={containerStyle}>
        <img
            src="/logo.png"
            alt="ThunderWire Logo"
            style={{
              height: logoHeight,
              width: "auto",
              display: "block",
            }}
        />

        {showText && (
            <div>
              <div style={{ fontSize, fontWeight: "700" }}>
                <span style={{ color: "var(--orange)" }}>Thunder</span>
                <span style={{ color: "var(--text-white)" }}>Wire</span>
              </div>

              {size !== "small" && (
                  <div
                      style={{
                        fontSize: subtitleSize,
                        color: "var(--text-gray)",
                      }}
                  >
                    Workspace Communication
                  </div>
              )}
            </div>
        )}
      </div>
  );
}

export default Logo;