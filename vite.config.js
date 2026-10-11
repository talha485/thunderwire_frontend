import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config - this tells Vite how to build/run our React app
export default defineConfig({
  plugins: [react()],
});
