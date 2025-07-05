const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = false; // ✅ บังคับให้ Electron โหลดจาก build

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    const filePath = path.join(__dirname, 'client', 'dist', 'index.html');
    console.log('Loading file from:', filePath);
    win.loadFile(filePath);
    win.webContents.openDevTools(); // ดู error ถ้ายังหน้าขาว
  }
}

app.whenReady().then(createWindow);
