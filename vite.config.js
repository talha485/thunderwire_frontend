import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config - this tells Vite how to build/run our React app.
// host/port are pinned so Electron always finds the dev server at the same
// address. "localhost" can resolve to IPv6 (::1) in Node but IPv4 in Chromium,
// which makes Electron get ERR_CONNECTION_REFUSED. 127.0.0.1 avoids that.
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true, // fail loudly instead of silently moving to 5174
  },
});
