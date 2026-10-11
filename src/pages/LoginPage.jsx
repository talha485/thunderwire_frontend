import { useState } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Avatar from "../components/Avatar";

// LoginPage - Screen 2 - Sign in page
function LoginPage({ navigate }) {
  // State for the form inputs
  const [email, setEmail] = useState("talha@company.com");
  const [password, setPassword] = useState("••••••••••");

  const pageStyle = {
    display: "flex",
    height: "100vh",
    backgroundColor: "var(--bg-main)",
  };

  // Left side - login form
  const leftStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  };

  // The white card in the center of the form
  const formCardStyle = {
    width: "100%",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
  };

  // Right side - chat preview
  const rightStyle = {
    flex: 1,
    backgroundColor: "var(--bg-sidebar)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    borderLeft: "1px solid var(--border-color)",
    gap: "16px",
  };

  const dividerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    color: "var(--text-gray)",
    fontSize: "13px",
  };

  const dividerLineStyle = {
    flex: 1,
    height: "1px",
    backgroundColor: "var(--border-color)",
  };

  return (
    <div style={pageStyle}>
      {/* LEFT SIDE - Login Form */}
      <div style={leftStyle}>
        <div style={formCardStyle}>
          {/* Logo centered at top */}
          <Logo size="medium" showText={false} />

          {/* Welcome title */}
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "26px", fontWeight: "700", color: "var(--text-white)" }}>
              Welcome back
            </h1>
            <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "6px" }}>
              Sign in to your ThunderWire workspace
            </p>
          </div>

          {/* Email and password fields */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
            <InputField
              label="EMAIL ADDRESS"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <InputField
                label="PASSWORD"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Forgot password link - right aligned */}
              <div style={{ textAlign: "right", marginTop: "8px" }}>
                <span
                  style={{ fontSize: "13px", color: "var(--orange)", cursor: "pointer" }}
                >
                  Forgot password?
                </span>
              </div>
            </div>
          </div>

          {/* Sign In button */}
          <Button variant="primary" fullWidth onClick={() => navigate("chat")}>
            Sign In
          </Button>

          {/* OR divider */}
          <div style={dividerStyle}>
            <div style={dividerLineStyle}></div>
            <span>OR</span>
            <div style={dividerLineStyle}></div>
          </div>

          {/* Create account link */}
          <Button variant="secondary" fullWidth onClick={() => navigate("register")}>
            Don't have an account?{" "}
            <span style={{ color: "var(--orange)" }}>Create one</span>
          </Button>
        </div>
      </div>

      {/* RIGHT SIDE - Chat preview panel */}
      <div style={rightStyle}>
        {/* Encrypted badge */}
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: "rgba(249,115,22,0.15)",
            border: "1px solid var(--orange)",
            borderRadius: "20px",
            fontSize: "13px",
            color: "var(--text-white)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          🔒 End-to-end encrypted
        </div>

        {/* Chat message preview card - Ali Hassan */}
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            borderRadius: "12px",
            padding: "16px",
            width: "100%",
            maxWidth: "380px",
            border: "1px solid var(--border-color)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Avatar initials="AH" color="#f97316" size={36} />
              <span style={{ fontWeight: "600" }}>Ali Hassan</span>
            </div>
            <span style={{ fontSize: "12px", color: "var(--text-gray)" }}>just now</span>
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-light)", lineHeight: "1.5" }}>
            Can everyone review the Q3 report before the 3pm meeting today?
          </p>
        </div>

        {/* Chat message preview card - You */}
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            borderRadius: "12px",
            padding: "16px",
            width: "100%",
            maxWidth: "380px",
            border: "1px solid var(--border-color)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Avatar initials="TJ" color="#f97316" size={36} />
              <span style={{ fontWeight: "600" }}>You</span>
            </div>
            <span style={{ fontSize: "12px", color: "var(--green)" }}>✦</span>
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-light)", lineHeight: "1.5" }}>
            On it! Will share my notes in #project-alpha before 2pm.
          </p>
        </div>

        {/* Stats badges at bottom */}
        <div style={{ display: "flex", gap: "12px" }}>
          {[
            { value: "100%", label: "DELIVERY", color: "#f97316" },
            { value: "TLS 1.3", label: "ENCRYPTED", color: "#22c55e" },
            { value: "UCP", label: "PROTOCOL", color: "#8b5cf6" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "8px",
                padding: "10px 16px",
                textAlign: "center",
                border: "1px solid var(--border-color)",
              }}
            >
              <div style={{ color: stat.color, fontWeight: "700", fontSize: "15px" }}>
                {stat.value}
              </div>
              <div style={{ color: "var(--text-gray)", fontSize: "11px", letterSpacing: "0.5px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
