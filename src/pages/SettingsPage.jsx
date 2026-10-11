import { useState } from "react";
import Logo from "../components/Logo";
import Avatar from "../components/Avatar";
import ToggleSwitch from "../components/ToggleSwitch";
import Button from "../components/Button";

// SettingsPage - Screen 6 - Profile settings
function SettingsPage({ navigate }) {
  // Active menu item in the left sidebar
  const [activeItem, setActiveItem] = useState("Profile");

  // Toggle states for the notification switches
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [tlsEncryption] = useState(true); // Always on - cannot be changed

  const pageStyle = {
    display: "flex",
    height: "100vh",
    backgroundColor: "var(--bg-main)",
  };

  // Left navigation sidebar
  const sidebarStyle = {
    width: "210px",
    backgroundColor: "var(--bg-sidebar)",
    borderRight: "1px solid var(--border-color)",
    display: "flex",
    flexDirection: "column",
    padding: "20px 0",
    flexShrink: 0,
  };

  // Right main content area
  const mainStyle = {
    flex: 1,
    overflowY: "auto",
    padding: "30px 40px",
  };

  // Section header label (ACCOUNT, APPLICATION, SUPPORT)
  const sectionLabelStyle = {
    fontSize: "11px",
    fontWeight: "700",
    color: "var(--text-gray)",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    padding: "16px 18px 6px",
  };

  // Navigation items grouped by section
  const navSections = [
    {
      label: "ACCOUNT",
      items: ["Profile", "Privacy & security", "Notifications"],
    },
    {
      label: "APPLICATION",
      items: ["Appearance", "Chat preferences", "Protocol config"],
    },
    {
      label: "SUPPORT",
      items: ["Help & support"],
    },
  ];

  return (
    <div style={pageStyle}>
      {/* LEFT SIDEBAR NAV */}
      <div style={sidebarStyle}>
        {/* Logo at top */}
        <div style={{ padding: "4px 18px 18px", borderBottom: "1px solid var(--border-color)" }}>
          <Logo size="small" />
        </div>

        {/* Nav sections */}
        {navSections.map((section) => (
          <div key={section.label}>
            <div style={sectionLabelStyle}>{section.label}</div>
            {section.items.map((item) => (
              <NavItem
                key={item}
                label={item}
                isActive={activeItem === item}
                onClick={() => setActiveItem(item)}
              />
            ))}
          </div>
        ))}

        {/* Sign out button at the bottom */}
        <div style={{ marginTop: "auto", padding: "16px 18px", borderTop: "1px solid var(--border-color)" }}>
          <div
            onClick={() => navigate("landing")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "var(--red)",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              padding: "6px 0",
            }}
          >
            <span>⬛</span>
            Sign out
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div style={mainStyle}>
        <h1 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "24px" }}>
          Profile settings
        </h1>

        {/* Profile card */}
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            borderRadius: "12px",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "18px",
            border: "1px solid var(--border-color)",
            marginBottom: "20px",
          }}
        >
          {/* Avatar with online dot */}
          <div style={{ position: "relative" }}>
            <Avatar initials="TJ" color="#f97316" size={62} />
            {/* Small icon at bottom right of avatar */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "18px",
                height: "18px",
                backgroundColor: "var(--bg-card)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                border: "2px solid var(--bg-sidebar)",
              }}
            >
              ✎
            </div>
          </div>

          {/* Name, role, status */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "700", fontSize: "18px" }}>Talha Javed</div>
            <div style={{ color: "var(--text-gray)", fontSize: "14px", marginTop: "2px" }}>
              Developer
            </div>
            {/* Online badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                backgroundColor: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: "20px",
                padding: "3px 10px",
                fontSize: "12px",
                color: "#22c55e",
                marginTop: "6px",
              }}
            >
              ● Online
            </div>
          </div>

          {/* Edit profile button */}
          <Button variant="secondary" style={{ padding: "9px 20px", fontSize: "13px" }}>
            Edit profile
          </Button>
        </div>

        {/* NOTIFICATIONS section */}
        <SettingsSectionCard title="NOTIFICATIONS">
          <SettingsToggleRow
            title="Message notifications"
            description="Get notified for new messages"
            isOn={messageNotifications}
            onChange={setMessageNotifications}
          />
          <SettingsToggleRow
            title="Sound alerts"
            description="Play sound on new message"
            isOn={soundAlerts}
            onChange={setSoundAlerts}
          />
          <SettingsToggleRow
            title="Show message preview"
            description="Display content in notifications"
            isOn={showPreview}
            onChange={setShowPreview}
            isLast={true}
          />
        </SettingsSectionCard>

        {/* PROTOCOL section */}
        <SettingsSectionCard title="PROTOCOL (UCP)" style={{ marginTop: "20px" }}>
          <SettingsToggleRow
            title="TLS 1.3 encryption"
            description="Always on — cannot be disabled"
            isOn={tlsEncryption}
            onChange={() => {}} // disabled - can't turn off
            disabled={true}
          />
          <SettingsTextRow title="Retransmit timeout" value="500ms" />
          <SettingsTextRow title="Max retries" value="5 attempts" isLast={true} />
        </SettingsSectionCard>
      </div>
    </div>
  );
}

// NavItem - a single clickable item in the settings sidebar
function NavItem({ label, isActive, onClick }) {
  const style = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 18px",
    cursor: "pointer",
    backgroundColor: isActive ? "rgba(249,115,22,0.12)" : "transparent",
    borderLeft: isActive ? "3px solid var(--orange)" : "3px solid transparent",
    color: isActive ? "var(--text-white)" : "var(--text-light)",
    fontSize: "14px",
    fontWeight: isActive ? "600" : "400",
  };

  return (
    <div
      style={style}
      onClick={onClick}
      onMouseOver={(e) => {
        if (!isActive) e.currentTarget.style.backgroundColor = "var(--bg-hover)";
      }}
      onMouseOut={(e) => {
        if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <span style={{ fontSize: "13px" }}>⬛</span>
      {label}
    </div>
  );
}

// SettingsSectionCard - a card that groups multiple settings rows
function SettingsSectionCard({ title, children, style = {} }) {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-card)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        overflow: "hidden",
        marginTop: "20px",
        ...style,
      }}
    >
      {/* Section title */}
      <div
        style={{
          padding: "12px 22px",
          fontSize: "11px",
          fontWeight: "700",
          color: "var(--text-gray)",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

// SettingsToggleRow - a row with a label + toggle switch
function SettingsToggleRow({ title, description, isOn, onChange, disabled = false, isLast = false }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 22px",
        borderBottom: isLast ? "none" : "1px solid var(--border-color)",
      }}
    >
      <div>
        <div style={{ fontWeight: "500", fontSize: "15px" }}>{title}</div>
        <div style={{ fontSize: "13px", color: "var(--text-gray)", marginTop: "3px" }}>
          {description}
        </div>
      </div>
      <ToggleSwitch isOn={isOn} onChange={onChange} disabled={disabled} />
    </div>
  );
}

// SettingsTextRow - a row that just shows a label and a value (no toggle)
function SettingsTextRow({ title, value, isLast = false }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 22px",
        borderBottom: isLast ? "none" : "1px solid var(--border-color)",
      }}
    >
      <div style={{ fontWeight: "500", fontSize: "15px" }}>{title}</div>
      <div style={{ fontSize: "14px", color: "var(--orange)", fontWeight: "600" }}>{value}</div>
    </div>
  );
}

export default SettingsPage;
