import { useState } from "react";
import Logo from "../components/Logo";
import Avatar from "../components/Avatar";
import { channels, directMessages } from "../data/mockData";

// Sidebar component - the left panel in the chat screen
// Shows logo, search, channels list, and direct messages list
function Sidebar({ activeChannel, setActiveChannel, navigate, openCreateChannel }) {
  const sidebarStyle = {
    width: "260px",
    backgroundColor: "var(--bg-sidebar)",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid var(--border-color)",
    flexShrink: 0,
  };

  // Top area with logo and icon
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
        <div
          style={{
            width: "28px",
            height: "28px",
            backgroundColor: "var(--bg-card)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          ✎
        </div>
      </div>

      {/* Search bar */}
      <div style={searchStyle}>
        <span style={{ color: "var(--text-gray)", fontSize: "13px" }}>🔍</span>
        <input
          placeholder="Search channels, people..."
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
        {/* CHANNELS section */}
        <div style={sectionLabelStyle}>
          <span>Channels</span>
          {/* Plus button to add new channel */}
          <span
            onClick={openCreateChannel}
            style={{
              cursor: "pointer",
              color: "var(--text-gray)",
              fontSize: "16px",
              lineHeight: 1,
            }}
            title="Create new channel"
          >
            +
          </span>
        </div>

        {channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channel={channel}
            isActive={activeChannel === channel.id}
            onClick={() => setActiveChannel(channel.id)}
          />
        ))}

        {/* DIRECT MESSAGES section */}
        <div style={sectionLabelStyle}>
          <span>Direct Messages</span>
          <span style={{ cursor: "pointer", color: "var(--text-gray)", fontSize: "16px" }}>+</span>
        </div>

        {directMessages.map((dm) => (
          <DMItem key={dm.id} dm={dm} />
        ))}
      </div>

      {/* Bottom - user profile */}
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
        <Avatar initials="TJ" color="#f97316" size={34} showOnline={true} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "13px", fontWeight: "600" }}>Talha Javed</div>
          <div style={{ fontSize: "11px", color: "#22c55e" }}>● Online</div>
        </div>
        <span style={{ color: "var(--text-gray)", fontSize: "14px" }}>⚙</span>
      </div>
    </div>
  );
}

// ChannelItem - a single channel row in the sidebar
function ChannelItem({ channel, isActive, onClick }) {
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
    <div style={style} onClick={onClick}>
      <span style={{ color: isActive ? "var(--orange)" : "var(--text-gray)", fontSize: "14px" }}>
        #
      </span>
      <span
        style={{
          flex: 1,
          fontSize: "14px",
          color: isActive ? "var(--text-white)" : "var(--text-light)",
          fontWeight: isActive ? "600" : "400",
        }}
      >
        {channel.name}
      </span>
      {/* Unread badge */}
      {channel.unread > 0 && (
        <div
          style={{
            backgroundColor: "var(--orange)",
            color: "white",
            borderRadius: "10px",
            fontSize: "11px",
            fontWeight: "700",
            padding: "1px 7px",
          }}
        >
          {channel.unread}
        </div>
      )}
    </div>
  );
}

// DMItem - a single direct message row
function DMItem({ dm }) {
  const style = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "background-color 0.15s",
  };

  return (
    <div
      style={style}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-hover)")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      <Avatar initials={dm.initials} color={dm.color} size={34} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "13px", fontWeight: "600" }}>{dm.name}</span>
          <span style={{ fontSize: "11px", color: "var(--text-gray)" }}>{dm.time}</span>
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-gray)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {dm.preview}
        </p>
      </div>
      {dm.unread > 0 && (
        <div
          style={{
            backgroundColor: "var(--orange)",
            color: "white",
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "700",
          }}
        >
          {dm.unread}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
