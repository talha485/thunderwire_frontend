// api.js - the ONLY place the frontend talks to the Django backend.
// Every screen imports functions from here instead of calling fetch directly.

const BASE_URL = "http://127.0.0.1:8000/api";

// ---- token storage -------------------------------------------------------
// localStorage survives page reloads, so the user stays logged in after F5.
// In Electron each window's userData dir gets its own localStorage.

export function getToken() {
  return localStorage.getItem("tw_token");
}

export function getCurrentUser() {
  const raw = localStorage.getItem("tw_user");
  return raw ? JSON.parse(raw) : null;
}

function saveSession(token, user) {
  localStorage.setItem("tw_token", token);
  localStorage.setItem("tw_user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("tw_token");
  localStorage.removeItem("tw_user");
}

// ---- core request helper -------------------------------------------------
// Adds the Bearer header, sends JSON, and turns any non-2xx response into a
// thrown Error whose .message is something you can show in the UI.

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth && getToken()) headers["Authorization"] = `Bearer ${getToken()}`;

  let response;
  try {
    response = await fetch(BASE_URL + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the server. Is Django running on port 8000?");
  }

  // 204 No Content (logout) has no body to parse
  if (response.status === 204) return null;

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // A stale/expired token: forget it so the app falls back to the login screen
    if (response.status === 401 && auth) clearSession();
    throw new Error(extractError(data, response.status));
  }
  return data;
}

// Backend error shapes we have to handle:
//   {"error": "username already taken"}          <- our own APIViews
//   {"detail": "token expired"}                  <- DRF auth/permission errors
//   {"content": ["message cannot be empty"]}     <- DRF serializer validation
function extractError(data, status) {
  if (data.error) return data.error;
  if (data.detail) return data.detail;
  const firstField = Object.keys(data)[0];
  if (firstField) {
    const msg = data[firstField];
    return Array.isArray(msg) ? `${firstField}: ${msg[0]}` : String(msg);
  }
  return `Request failed (${status})`;
}

// ---- endpoints -----------------------------------------------------------

export async function register(username, password) {
  return request("/register/", { method: "POST", body: { username, password }, auth: false });
}

export async function login(username, password) {
  const data = await request("/login/", { method: "POST", body: { username, password }, auth: false });
  saveSession(data.token, data.user);
  return data.user;
}

export async function logout() {
  try {
    await request("/logout/", { method: "POST" });
  } finally {
    clearSession(); // even if the server call fails, drop the local token
  }
}

export async function listUsers() {
  return request("/users/list/");
}

export async function getHistory(withUserId) {
  return request(`/messages/history/?with=${withUserId}`);
}

export async function sendMessage(recipientId, content) {
  return request("/messages/send/", { method: "POST", body: { recipient_id: recipientId, content } });
}
