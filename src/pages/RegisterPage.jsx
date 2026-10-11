import { useState } from "react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Avatar from "../components/Avatar";
import ErrorBanner from "../components/ErrorBanner";
import { register, login } from "../api";

// RegisterPage - Screen 3 - Create new account
// Only username + password go to the backend. Full name and avatar color are
// cosmetic for now (no backend fields for them yet).
function RegisterPage({ navigate }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Client-side checks first (instant feedback), then the server call.
  const handleSubmit = async () => {
    const name = username.trim();
    if (!name) return setError("Username is required");
    if (!/^[\w.@+-]+$/.test(name)) return setError("Username may only contain letters, digits and @ . + - _");
    if (password.length < 8) return setError("Password must be at least 8 characters");
    if (password !== confirmPassword) return setError("Passwords do not match");

    setError("");
    setLoading(true);
    try {
      await register(name, password);  // POST /api/register/
      await login(name, password);     // POST /api/login/ -> token stored
      navigate("chat");
    } catch (err) {
      setError(err.message); // e.g. "username already taken"
    } finally {
      setLoading(false);
    }
  };

  // Initials for the avatar preview: from full name if typed, else username
  const initials = (fullName.trim() || username.trim() || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Avatar color options - the 5 colored circles
  const avatarColors = ["#f97316", "#ef4444", "#22c55e", "#3b82f6", "#8b5cf6"];
  const [selectedColor, setSelectedColor] = useState(0);

  const pageStyle = {
    display: "flex",
    height: "100vh",
    backgroundColor: "var(--bg-main)",
    overflow: "hidden",
  };

  const leftStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px 60px",
  };

  const rightStyle = {
    flex: 1,
    backgroundColor: "var(--bg-sidebar)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px 60px",
    borderLeft: "1px solid var(--border-color)",
    gap: "20px",
  };

  // Progress bar showing Step 1 of 3
  const progressBarStyle = {
    height: "4px",
    backgroundColor: "var(--border-color)",
    borderRadius: "2px",
    marginBottom: "4px",
    overflow: "hidden",
  };

  return (
    <div style={pageStyle}>
      {/* LEFT SIDE - Registration Form */}
      <div style={leftStyle}>
        {/* Logo + title row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <Logo size="small" showText={false} />
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Create account</h2>
            <p style={{ fontSize: "13px", color: "var(--text-gray)" }}>
              Join your team on ThunderWire
            </p>
          </div>
        </div>

        {/* Step progress indicator */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-gray)" }}>Step 1 of 3</span>
            <span style={{ fontSize: "12px", color: "var(--orange)", fontWeight: "600" }}>
              33% complete
            </span>
          </div>
          {/* Progress bar - orange fills 33% */}
          <div style={progressBarStyle}>
            <div
              style={{
                width: "33%",
                height: "100%",
                backgroundColor: "var(--orange)",
                borderRadius: "2px",
              }}
            ></div>
          </div>
        </div>

        <div style={{ marginBottom: "14px" }}>
          <ErrorBanner message={error} />
        </div>

        {/* Form fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <InputField
            label="USERNAME"
            type="text"
            placeholder="pick a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <InputField
            label="FULL NAME (OPTIONAL)"
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          {/* Password fields side by side */}
          <div style={{ display: "flex", gap: "12px" }}>
            <InputField
              label="PASSWORD"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              label="CONFIRM"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          {/* Avatar color chooser */}
          <div>
            <label
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "var(--text-gray)",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "10px",
              }}
            >
              CHOOSE AVATAR COLOR
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              {avatarColors.map((color, index) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(index)}
                  style={{
                    cursor: "pointer",
                    outline: selectedColor === index ? `3px solid white` : "none",
                    outlineOffset: "2px",
                    borderRadius: "50%",
                  }}
                >
                  <Avatar
                    initials={initials}
                    color={color}
                    size={40}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create Account button */}
        <div style={{ marginTop: "20px" }}>
          <Button variant="primary" fullWidth onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </div>

        {/* Sign in link */}
        <p style={{ fontSize: "13px", color: "var(--text-gray)", marginTop: "14px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            style={{ color: "var(--orange)", cursor: "pointer", fontWeight: "600" }}
            onClick={() => navigate("login")}
          >
            Sign in
          </span>
        </p>
      </div>

      {/* RIGHT SIDE - Getting started steps */}
      <div style={rightStyle}>
        <h2 style={{ fontSize: "22px", fontWeight: "700" }}>Getting started is simple</h2>
        <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "-10px" }}>
          Three steps to secure team communication
        </p>

        {/* Steps list */}
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid var(--border-color)",
          }}
        >
          {[
            {
              num: 1,
              title: "Create your account",
              desc: "Quick signup with work email",
              active: true,
              color: "#22c55e",
            },
            {
              num: 2,
              title: "Set up your profile",
              desc: "Add name, role and avatar",
              active: false,
              color: "#f97316",
            },
            {
              num: 3,
              title: "Join your workspace",
              desc: "Start messaging your team instantly",
              active: false,
              color: "#4b5563",
            },
          ].map((step, i) => (
            <div
              key={step.num}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "16px 20px",
                borderBottom: i < 2 ? "1px solid var(--border-color)" : "none",
              }}
            >
              {/* Step number circle */}
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: step.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "13px",
                  flexShrink: 0,
                }}
              >
                {step.num === 1 ? "✓" : step.num}
              </div>
              <div>
                <div style={{ fontWeight: "600", fontSize: "14px" }}>{step.title}</div>
                <div style={{ fontSize: "12px", color: "var(--text-gray)", marginTop: "2px" }}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy notice card */}
        <div
          style={{
            backgroundColor: "rgba(249,115,22,0.1)",
            border: "1px solid rgba(249,115,22,0.3)",
            borderRadius: "12px",
            padding: "16px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            🔒 Your privacy, guaranteed
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-gray)", lineHeight: "1.6" }}>
            All messages are encrypted with TLS 1.3 before leaving your device. No plaintext is
            ever transmitted over the network.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
