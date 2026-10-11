import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Avatar from "../components/Avatar";
import ErrorBanner from "../components/ErrorBanner";
import { listUsers, getHistory, sendMessage, getCurrentUser, getToken } from "../api";
import { initialsOf, colorFor, formatTime } from "../utils";

const POLL_MS = 2000;       // how often the open conversation is re-fetched
const USERS_POLL_MS = 10000; // how often the sidebar user list is refreshed

// ChatPage - Screen 4
// This is the main page users see after logging in
function ChatPage({ navigate }) {
  const me = getCurrentUser();
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  // Any API error. A 401 means our token died (expired / logged out elsewhere):
  // api.js already cleared it, so we just go back to the landing page.
  const handleError = (err) => {
    if (!getToken()) {
      navigate("landing");
      return;
    }
    setError(err.message);
  };

  // --- load + poll the user list -------------------------------------------
  useEffect(() => {
    let cancelled = false;
    const refresh = () =>
      listUsers()
        .then((data) => !cancelled && setUsers(data))
        .catch(handleError);

    refresh();
    const timer = setInterval(refresh, USERS_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  // --- load + poll the open conversation -----------------------------------
  // Runs again every time activeUser changes. The cleanup function stops the
  // previous interval so we never poll two conversations at once.
  useEffect(() => {
    if (!activeUser) return;
    let cancelled = false;
    setMessages([]);

    const refresh = () =>
      getHistory(activeUser.id)
        .then((data) => {
          if (cancelled) return;
          setMessages(data);
          setError("");
        })
        .catch(handleError);

    refresh();
    const timer = setInterval(refresh, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [activeUser]);

  // When user presses Enter or clicks Send
  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || !activeUser || sending) return;
    setSending(true);
    try {
      const saved = await sendMessage(activeUser.id, text); // POST /api/messages/send/
      setMessages((prev) => [...prev, saved]); // show it now, next poll confirms it
      setInputText("");
    } catch (err) {
      handleError(err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "var(--bg-main)" }}>
      {/* LEFT - Sidebar */}
      <Sidebar
        users={users}
        activeUserId={activeUser?.id}
        onSelectUser={setActiveUser}
        currentUser={me}
        navigate={navigate}
      />

      {/* RIGHT - Chat area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ChatHeader user={activeUser} />

        <div style={{ padding: "10px 20px 0" }}>
          <ErrorBanner message={error} />
        </div>

        {!activeUser ? (
          <EmptyState hasUsers={users.length > 0} />
        ) : (
          <MessageList messages={messages} myId={me.id} />
        )}

        {/* Message input bar at the bottom */}
        <MessageInput
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          onSend={handleSend}
          disabled={!activeUser || sending}
          placeholder={activeUser ? `Message ${activeUser.username}...` : "Select a person first"}
        />
      </div>
    </div>
  );
}

// ChatHeader - the top bar of the chat area, shows who you're talking to
function ChatHeader({ user }) {
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 20px",
    borderBottom: "1px solid var(--border-color)",
    backgroundColor: "var(--bg-main)",
    flexShrink: 0,
    minHeight: "63px",
  };

  return (
    <div style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user ? (
          <>
            <Avatar initials={initialsOf(user.username)} color={colorFor(user.username)} size={34} />
            <div>
              <div style={{ fontWeight: "700", fontSize: "16px" }}>{user.username}</div>
              <div style={{ fontSize: "12px", color: "var(--text-gray)" }}>direct message</div>
            </div>
          </>
        ) : (
          <div style={{ fontWeight: "700", fontSize: "16px", color: "var(--text-gray)" }}>
            ThunderWire
          </div>
        )}
      </div>
    </div>
  );
}

// EmptyState - shown before a conversation is picked
function EmptyState({ hasUsers }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-gray)",
        gap: "8px",
      }}
    >
      <div style={{ fontSize: "40px" }}>💬</div>
      <div style={{ fontSize: "15px" }}>
        {hasUsers ? "Pick someone on the left to start chatting" : "Waiting for other users to join"}
      </div>
    </div>
  );
}

// MessageList - scrollable list, auto-scrolls to the newest message
function MessageList({ messages, myId }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px 16px" }}>
      {messages.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-gray)", fontSize: "13px", marginTop: "20px" }}>
          No messages yet. Say hi.
        </p>
      )}
      {messages.map((msg) => (
        <MessageBubble key={msg.msg_id} msg={msg} isMe={msg.sender.id === myId} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

// MessageBubble - renders a single message from the API:
// { msg_id, sender:{id,username}, recipient:{...}, content, delivery_status, timestamp }
// isMe = true means the logged-in user sent it (shown on right, orange)
function MessageBubble({ msg, isMe }) {
  const wrapperStyle = {
    display: "flex",
    flexDirection: isMe ? "row-reverse" : "row",
    alignItems: "flex-end",
    gap: "10px",
    padding: "6px 6px",
  };

  const bubbleStyle = {
    maxWidth: "55%",
    padding: "12px 16px",
    borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
    backgroundColor: isMe ? "var(--orange)" : "var(--bg-card)",
    color: "var(--text-white)",
    fontSize: "14px",
    lineHeight: "1.5",
    border: isMe ? "none" : "1px solid var(--border-color)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  };

  const metaStyle = {
    fontSize: "11px",
    color: "var(--text-gray)",
    marginTop: "4px",
    textAlign: isMe ? "right" : "left",
    paddingLeft: isMe ? "0" : "44px",
    paddingRight: isMe ? "44px" : "0",
  };

  return (
    <div>
      <div style={wrapperStyle}>
        {!isMe && (
          <Avatar initials={initialsOf(msg.sender.username)} color={colorFor(msg.sender.username)} size={34} />
        )}
        <div style={bubbleStyle}>{msg.content}</div>
        {isMe && <div style={{ width: 34 }} />}
      </div>

      <div style={metaStyle}>
        {formatTime(msg.timestamp)} · {isMe ? "You" : msg.sender.username}
        {/* delivery_status 1 = acked (stubbed for now, real ACK comes with UCP) */}
        {isMe && msg.delivery_status === 1 && (
          <span style={{ marginLeft: "4px", color: "#a3e635" }}>✓✓</span>
        )}
      </div>
    </div>
  );
}

// MessageInput - the text box at the bottom of the chat
function MessageInput({ value, onChange, onKeyDown, onSend, disabled, placeholder }) {
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
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <div style={containerStyle}>
      <div style={inputBarStyle}>
        <input
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: "var(--text-white)",
            fontSize: "14px",
          }}
        />
        <button
          onClick={onSend}
          disabled={disabled}
          style={{
            backgroundColor: "var(--orange)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            padding: "6px 14px",
            cursor: disabled ? "not-allowed" : "pointer",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          Send
        </button>
      </div>
      <p style={{ fontSize: "11px", color: "var(--text-gray)", marginTop: "6px", paddingLeft: "4px" }}>
        Press Enter to send
      </p>
    </div>
  );
}

export default ChatPage;
