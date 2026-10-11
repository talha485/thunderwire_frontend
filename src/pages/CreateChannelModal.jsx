import { useState } from "react";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Logo from "/logo.png";
import { teamMembers } from "../data/mockData";

// CreateChannelModal - Screen 5
// This appears as a popup (modal) on top of the chat page
function CreateChannelModal({ onClose }) {
  const [channelName, setChannelName] = useState("project-beta");
  const [description, setDescription] = useState("Backend API development team");
  const [selectedColor, setSelectedColor] = useState(0);
  const [searchText, setSearchText] = useState("");

  // Which team members are selected (added to channel)
  const [selectedMembers, setSelectedMembers] = useState([0, 1]); // Ali Hassan and Sara Khan by default

  const channelColors = ["#f97316", "#ef4444", "#22c55e", "#3b82f6", "#8b5cf6", "#eab308"];

  // Toggle a member on or off
  const toggleMember = (index) => {
    if (selectedMembers.includes(index)) {
      setSelectedMembers(selectedMembers.filter((i) => i !== index));
    } else {
      setSelectedMembers([...selectedMembers, index]);
    }
  };

  // Filter members based on search text
  const filteredMembers = teamMembers.filter((m) =>
    m.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Dark overlay behind the modal
  const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  // The white card / modal box
  const modalStyle = {
    backgroundColor: "var(--bg-sidebar)",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "520px",
    border: "1px solid var(--border-color)",
    overflow: "hidden",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 22px",
    borderBottom: "1px solid var(--border-color)",
  };

  const bodyStyle = {
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    maxHeight: "65vh",
    overflowY: "auto",
  };

  const fieldLabelStyle = {
    fontSize: "11px",
    fontWeight: "700",
    color: "var(--text-gray)",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    marginBottom: "8px",
  };

  const textInputStyle = {
    width: "100%",
    backgroundColor: "var(--bg-input)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    padding: "11px 14px 11px 36px",
    color: "var(--text-white)",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  const footerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    padding: "16px 22px",
    borderTop: "1px solid var(--border-color)",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      {/* Stop click from going through to overlay */}
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>

        {/* Header row */}
        <div style={headerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Logo size="small" showText={false} />
            <span style={{ fontWeight: "700", fontSize: "16px" }}>Create new channel</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-gray)",
              cursor: "pointer",
              fontSize: "18px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={bodyStyle}>

          {/* Channel Name field */}
          <div>
            <div style={fieldLabelStyle}>CHANNEL NAME</div>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-gray)",
                  fontSize: "13px",
                }}
              >
                ✦
              </span>
              <input
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                style={textInputStyle}
                placeholder="channel-name"
              />
            </div>
          </div>

          {/* Description field */}
          <div>
            <div style={fieldLabelStyle}>DESCRIPTION (OPTIONAL)</div>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-gray)",
                  fontSize: "13px",
                }}
              >
                ✦
              </span>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={textInputStyle}
                placeholder="What is this channel for?"
              />
            </div>
          </div>

          {/* Channel color selector */}
          <div>
            <div style={fieldLabelStyle}>CHANNEL COLOR</div>
            <div style={{ display: "flex", gap: "10px" }}>
              {channelColors.map((color, i) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(i)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    cursor: "pointer",
                    border: selectedColor === i ? "3px solid white" : "3px solid transparent",
                    boxSizing: "border-box",
                    transition: "border 0.15s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Add Members section */}
          <div>
            <div style={fieldLabelStyle}>ADD MEMBERS</div>

            {/* Search members input */}
            <div style={{ position: "relative", marginBottom: "12px" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-gray)",
                  fontSize: "13px",
                }}
              >
                🔍
              </span>
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={textInputStyle}
                placeholder="Search team members..."
              />
            </div>

            {/* Team member list */}
            <div
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid var(--border-color)",
              }}
            >
              {filteredMembers.map((member, i) => {
                const originalIndex = teamMembers.indexOf(member);
                const isSelected = selectedMembers.includes(originalIndex);
                return (
                  <MemberRow
                    key={member.id}
                    member={member}
                    isSelected={isSelected}
                    onToggle={() => toggleMember(originalIndex)}
                    isLast={i === filteredMembers.length - 1}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div style={footerStyle}>
          <Button variant="secondary" onClick={onClose} style={{ padding: "10px 24px" }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onClose} style={{ padding: "10px 24px" }}>
            ✦ Create Channel
          </Button>
        </div>
      </div>
    </div>
  );
}

// MemberRow - a single team member row in the modal
function MemberRow({ member, isSelected, onToggle, isLast }) {
  const rowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderBottom: isLast ? "none" : "1px solid var(--border-color)",
    cursor: "pointer",
    transition: "background-color 0.15s",
  };

  // The circle toggle on the right side
  const toggleStyle = {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: isSelected ? "none" : "2px solid var(--border-color)",
    backgroundColor: isSelected ? "var(--orange)" : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "12px",
    flexShrink: 0,
  };

  return (
    <div
      style={rowStyle}
      onClick={onToggle}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-hover)")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      <Avatar initials={member.initials} color={member.color} size={36} />
      <span style={{ flex: 1, fontWeight: "600", fontSize: "14px" }}>{member.name}</span>
      <span style={{ fontSize: "13px", color: "var(--text-gray)" }}>{member.role}</span>
      <div style={toggleStyle}>{isSelected && "✓"}</div>
    </div>
  );
}

export default CreateChannelModal;
