import { useState } from "react";
import Logo from "../components/Logo";
import Avatar from "../components/Avatar";
import { initialsOf, colorFor } from "../utils";

// Sidebar component - the left panel in the chat screen
// Shows logo, search, the list of other users (as direct messages), and
// the logged-in user's profile row at the bottom.
function Sidebar({ users, activeUserId, onSelectUser, currentUser, navigate }) {
  const [search, setSearch] = useState("");

  const visibleUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const sidebarStyle = {
    width: "260px",
    backgroundColor: "var(--bg-sidebar)",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid var(--border-color)",
    flexShrink: 0,
  };

  const topBarStyle = {
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid var(--border-color)",
  };

  const searchStyle = {
    margin: "10px 12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "var(--bg-input)",
    borderRadius: "8px",
    padding: "8px 12px",
    border: "1px solid var(--border-color)",
  };

  const sectionLabelStyle = {
    fontSize: "11px",
    fontWeight: "700",
    color: "var(--text-gray)",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    padding: "14px 16px 6px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <div style={sidebarStyle}>
      {/* Top - Logo */}
      <div style={topBarStyle}>
        <Logo size="small" />
      </div>

      {/* Search bar - filters the user list */}
      <div style={searchStyle}>
        <span style={{ color: "var(--text-gray)", fontSize: "13px" }}>🔍</span>
        <input
          placeholder="Search people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "none",
            border: "none",
            outline: "none",
            color: "var(--text-white)",
            fontSize: "13px",
            flex: 1,
          }}
        />
      </div>

      {/* Scrollable list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={sectionLabelStyle}>
          <span>Direct Messages</span>
          <span style={{ color: "var(--text-gray)", fontWeight: "400" }}>{users.length}</span>
        </div>

        {visibleUsers.length === 0 && (
          <p style={{ padding: "8px 16px", fontSize: "13px", color: "var(--text-gray)" }}>
            {users.length === 0 ? "No other users yet. Register a second account." : "No match."}
          </p>
        )}

        {visibleUsers.map((user) => (
          <DMItem
            key={user.id}
            user={user}
            isActive={user.id === activeUserId}
            onClick={() => onSelectUser(user)}
          />
        ))}
      </div>

      {/* Bottom - logged-in user profile, opens settings */}
      <div
        style={{
          padding: "12px 14px",
          borderTop: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
        }}
        onClick={() => navigate("settings")}
      >
        <Avatar
          initials={initialsOf(currentUser.username)}
          color={colorFor(currentUser.username)}
          size={34}
          showOnline={true}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "13px", fontWeight: "600" }}>{currentUser.username}</div>
          <div style={{ fontSize: "11px", color: "#22c55e" }}>● Online</div>
        </div>
        <span style={{ color: "var(--text-gray)", fontSize: "14px" }}>⚙</span>
      </div>
    </div>
  );
}

// DMItem - a single user row. Clicking it opens that conversation.
function DMItem({ user, isActive, onClick }) {
  const style = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 16px",
    cursor: "pointer",
    backgroundColor: isActive ? "rgba(249,115,22,0.15)" : "transparent",
    borderLeft: isActive ? "3px solid var(--orange)" : "3px solid transparent",
    transition: "background-color 0.15s",
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
      <Avatar initials={initialsOf(user.username)} color={colorFor(user.username)} size={34} />
      <span
        style={{
          flex: 1,
          fontSize: "14px",
          color: isActive ? "var(--text-white)" : "var(--text-light)",
          fontWeight: isActive ? "600" : "400",
        }}
      >
        {user.username}
      </span>
    </div>
  );
}

export default Sidebar;
