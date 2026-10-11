// FeatureCard component - used on the landing page right side
// Shows an icon, title, and description
function FeatureCard({ icon, title, description, iconBg = "#f97316" }) {
  const cardStyle = {
    backgroundColor: "var(--bg-card)",
    borderRadius: "12px",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    border: "1px solid var(--border-color)",
  };

  const iconBoxStyle = {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    backgroundColor: iconBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  };

  return (
    <div style={cardStyle}>
      <div style={iconBoxStyle}>{icon}</div>
      <div>
        <div style={{ fontWeight: "600", fontSize: "15px", color: "var(--text-white)" }}>
          {title}
        </div>
        <div style={{ fontSize: "13px", color: "var(--text-gray)", marginTop: "2px" }}>
          {description}
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;
