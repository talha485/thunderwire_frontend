// utils.js - small display helpers shared by the chat screens.
// The backend only stores a username, so initials and avatar colour are
// derived from it here instead of being stored.

const PALETTE = ["#f97316", "#22c55e", "#8b5cf6", "#3b82f6", "#eab308", "#ef4444", "#14b8a6"];

// "ali_hassan" -> "AL", "sara" -> "SA"
export function initialsOf(username = "") {
  return username.slice(0, 2).toUpperCase() || "?";
}

// Same username always gets the same colour (simple string hash into PALETTE)
export function colorFor(username = "") {
  let hash = 0;
  for (const ch of username) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

// ISO timestamp from Django -> "9:01 AM" (today) or "Oct 11, 9:01 AM" (older)
export function formatTime(iso) {
  const d = new Date(iso);
  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const isToday = d.toDateString() === new Date().toDateString();
  return isToday ? time : `${d.toLocaleDateString([], { month: "short", day: "numeric" })}, ${time}`;
}
