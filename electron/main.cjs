// main.cjs - Electron "main process". This is plain Node: it creates the
// desktop window and tells it which URL to show. The React app itself runs
// inside that window exactly like it does in a browser tab.
//
// .cjs because package.json has "type": "module" and this file uses require().

const { app, BrowserWindow } = require("electron");
const path = require("path");

const DEV_URL = "http://127.0.0.1:5173"; // must match vite.config.js server.host/port

// --instance=A  ->  "A".  Defaults to "A" when not given.
const instance =
  (process.argv.find((a) => a.startsWith("--instance=")) || "--instance=A").split("=")[1];

// userData is where Chromium keeps localStorage, cookies, cache. Each
// instance gets its own folder, so A's token never collides with B's.
// Must be set BEFORE app is ready.
app.setPath("userData", path.join(app.getPath("appData"), `thunderwire-${instance}`));

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 760,
    minWidth: 900,
    minHeight: 600,
    title: `ThunderWire - instance ${instance}`,
    backgroundColor: "#0f1117", // matches --bg-main so there is no white flash
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true, // renderer cannot touch Node (safe default)
      nodeIntegration: false,
    },
  });

  // Keep our own title; otherwise the page's <title> overwrites it.
  win.on("page-title-updated", (e) => e.preventDefault());

  // If Vite is not up yet, retry until it is instead of showing a blank page.
  const load = () =>
    win.loadURL(DEV_URL).catch(() => {
      console.log(`[${instance}] ${DEV_URL} not reachable, retrying... (is "npm run dev" running?)`);
      setTimeout(load, 1500);
    });
  load();
}

app.whenReady().then(createWindow);

// On Windows/Linux the app exits when the last window closes.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
