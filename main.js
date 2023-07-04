// Add squirrel script
if (require('electron-squirrel-startup')) app.quit();

const { app, BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');
const path = require('path');

function createWindow() {
  // Load the previous window state
  const mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600,
  });

  // Create the browser window using the window state
  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load your Electron application's index.html or desired file
  mainWindow.loadFile('index.html');

  // Save the current window state when it changes
  mainWindow.on('resize', () => {
    mainWindowState.saveState(mainWindow);
  });

  // Open the DevTools if needed
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
