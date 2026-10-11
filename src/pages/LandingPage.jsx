import Logo from "../components/Logo";
import Button from "../components/Button";
import FeatureCard from "../components/FeatureCard";

// LandingPage - This is the first screen users see (Screen 1)
// It shows the app name, description, and two buttons
function LandingPage({ navigate }) {
  const pageStyle = {
    display: "flex",
    height: "100vh",
    backgroundColor: "var(--bg-main)",
    overflow: "hidden",
  };

  // Left side - the main content area
  const leftStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px 80px",
    maxWidth: "580px",
  };

  // Right side - the dark area with feature cards
  const rightStyle = {
    flex: 1,
    backgroundColor: "var(--bg-sidebar)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px 60px",
    gap: "16px",
    borderLeft: "1px solid var(--border-color)",
  };

  const taglineStyle = {
    fontSize: "17px",
    color: "var(--text-light)",
    lineHeight: "1.7",
    margin: "28px 0 36px 0",
    maxWidth: "360px",
  };

  const footerLinksStyle = {
    display: "flex",
    gap: "20px",
    marginTop: "32px",
  };

  const footerLinkStyle = {
    fontSize: "13px",
    color: "var(--text-gray)",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      {/* LEFT SIDE */}
      <div style={leftStyle}>
        {/* Logo at top left */}
        <Logo size="large" />

        {/* Main tagline text */}
        <p style={taglineStyle}>
          The <strong>fastest, most secure</strong> way for your team to
          communicate. Built on a custom reliable protocol —{" "}
          <strong>zero message loss, always encrypted.</strong>
        </p>

        {/* Two main action buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "300px" }}>
          <Button variant="primary" fullWidth onClick={() => navigate("login")}>
            🔑 Sign In to Workspace
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate("register")}>
            ✦ Create New Account
          </Button>
        </div>

        {/* Footer links at the bottom */}
        <div style={footerLinksStyle}>
          <span style={footerLinkStyle}>End-to-end encrypted</span>
          <span style={{ color: "var(--border-color)" }}>·</span>
          <span style={footerLinkStyle}>Zero message loss</span>
          <span style={{ color: "var(--border-color)" }}>·</span>
          <span style={footerLinkStyle}>Built for teams</span>
        </div>
      </div>

      {/* RIGHT SIDE - Feature cards */}
      <div style={rightStyle}>
        <FeatureCard
          icon="🔒"
          title="End-to-end encrypted"
          description="TLS 1.3 on every message"
          iconBg="#c2410c"
        />
        <FeatureCard
          icon="✅"
          title="Zero message loss"
          description="Custom reliable UCP protocol"
          iconBg="#166534"
        />
        <FeatureCard
          icon="💬"
          title="Channels & direct messages"
          description="Organized for any workspace"
          iconBg="#1e3a5f"
        />
        <FeatureCard
          icon="👥"
          title="Teams & groups"
          description="Collaborate across departments"
          iconBg="#3b1f6e"
        />
      </div>
    </div>
  );
}

export default LandingPage;
