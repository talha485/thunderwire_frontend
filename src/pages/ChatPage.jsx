import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Avatar from "../components/Avatar";
import { generalMessages } from "../data/mockData";

// ChatPage - Screen 4
// This is the main page users see after logging in
function ChatPage({ navigate, openCreateChannel }) {
  const [activeChannel, setActiveChannel] = useState(1);
  const [messages, setMessages] = useState(generalMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(true); // Sara is typing

  // When user presses Enter or clicks Send
  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: "You",
      initials: "TJ",
      color: "#f97316",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: inputText,
      isMe: true,
      ticks: true,
    };

    setMessages([...messages, newMsg]);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "var(--bg-main)" }}>
      {/* LEFT - Sidebar */}
      <Sidebar
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
        navigate={navigate}
        openCreateChannel={openCreateChannel}
      />

      {/* RIGHT - Chat area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Chat top bar */}
        <ChatHeader />

        {/* Date separator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "16px 28px 8px",
          }}
        >
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border-color)" }} />
          <span style={{ fontSize: "12px", color: "var(--text-gray)" }}>Today</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border-color)" }} />
        </div>

        {/* Messages list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 16px" }}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}

          {/* Typing indicator - Sara Khan is typing */}
          {isTyping && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 6px" }}>
              <Avatar initials="SK" color="#22c55e" size={34} />
              <div
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderRadius: "18px",
                  padding: "10px 16px",
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                {/* Animated three dots */}
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: "var(--text-gray)",
                      animation: `bounce 1s infinite ${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message input bar at the bottom */}
        <MessageInput
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          onSend={sendMessage}
        />
      </div>

      {/* CSS for typing dots animation */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

// ChatHeader - the top bar of the chat area
function ChatHeader() {
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 20px",
    borderBottom: "1px solid var(--border-color)",
    backgroundColor: "var(--bg-main)",
    flexShrink: 0,
  };

  return (
    <div style={headerStyle}>
      {/* Channel name and info */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "34px",
            height: "34px",
            backgroundColor: "var(--orange)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          #
        </div>
        <div>
          <div style={{ fontWeight: "700", fontSize: "16px" }}># general</div>
          <div style={{ fontSize: "12px", color: "var(--text-gray)" }}>
            12 members · workspace channel
          </div>
        </div>
      </div>

      {/* Icons on the right */}
      <div style={{ display: "flex", gap: "6px" }}>
        {["👥", "🔍", "📌", "⚙"].map((icon, i) => (
          <div
            key={i}
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "var(--bg-card)",
              borderRadius: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "14px",
              border: "1px solid var(--border-color)",
            }}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}

// MessageBubble - renders a single chat message
// isMe = true means the message is from the logged-in user (shown on right, orange)
function MessageBubble({ msg }) {
  const wrapperStyle = {
    display: "flex",
    flexDirection: msg.isMe ? "row-reverse" : "row",
    alignItems: "flex-end",
    gap: "10px",
    padding: "6px 6px",
  };

  const bubbleStyle = {
    maxWidth: "55%",
    padding: "12px 16px",
    borderRadius: msg.isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
    backgroundColor: msg.isMe ? "var(--orange)" : "var(--bg-card)",
    color: "var(--text-white)",
    fontSize: "14px",
    lineHeight: "1.5",
    border: msg.isMe ? "none" : "1px solid var(--border-color)",
  };

  const metaStyle = {
    fontSize: "11px",
    color: "var(--text-gray)",
    marginTop: "4px",
    textAlign: msg.isMe ? "right" : "left",
    paddingLeft: msg.isMe ? "0" : "44px",
    paddingRight: msg.isMe ? "44px" : "0",
  };

  return (
    <div>
      <div style={wrapperStyle}>
        {/* Avatar only shows for other people's messages */}
        {!msg.isMe && <Avatar initials={msg.initials} color={msg.color} size={34} />}

        {/* The message bubble */}
        <div style={bubbleStyle}>{msg.text}</div>

        {/* Placeholder space so my messages align properly */}
        {msg.isMe && <div style={{ width: 34 }} />}
      </div>

      {/* Time + sender name shown below message */}
      <div style={metaStyle}>
        {msg.time} · {msg.sender}
        {msg.ticks && <span style={{ marginLeft: "4px", color: "#a3e635" }}>✓✓</span>}
      </div>
    </div>
  );
}

// MessageInput - the text box at the bottom of the chat
function MessageInput({ value, onChange, onKeyDown, onSend }) {
  const containerStyle = {
    padding: "12px 20px 20px",
    borderTop: "1px solid var(--border-color)",
  };

  const inputBarStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "var(--bg-card)",
    border: "1px solid var(--border-color)",
    borderRadius: "12px",
    padding: "10px 14px",
  };

  return (
    <div style={containerStyle}>
      <div style={inputBarStyle}>
        {/* Attachment icon */}
        <span style={{ color: "var(--text-gray)", cursor: "pointer", fontSize: "18px" }}>📎</span>

        {/* Text input */}
        <input
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Message #general..."
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: "var(--text-white)",
            fontSize: "14px",
          }}
        />

        {/* Emoji and send buttons */}
        <span style={{ color: "var(--text-gray)", cursor: "pointer", fontSize: "18px" }}>😊</span>
        <button
          onClick={onSend}
          style={{
            backgroundColor: "var(--orange)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            padding: "6px 14px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          Send
        </button>
      </div>
      <p style={{ fontSize: "11px", color: "var(--text-gray)", marginTop: "6px", paddingLeft: "4px" }}>
        Press Enter to send · TLS 1.3 encrypted
      </p>
    </div>
  );
}

export default ChatPage;
