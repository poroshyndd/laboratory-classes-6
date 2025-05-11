const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');

let mainWindow;
const SERVER_URL = 'http://localhost:3000';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  mainWindow.loadURL(SERVER_URL);
}

app.whenReady().then(() => {
  const checkServer = setInterval(() => {
    http.get(SERVER_URL, (res) => {
      if (res.statusCode === 200) {
        clearInterval(checkServer);
        createWindow();
      }
    }).on('error', () => {
    });
  }, 100);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
