const { app, BrowserWindow } = require('electron')

let mainWindow = null;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900, 
    height: 900,
    icon: `file://${__dirname}/dist/assets/logo.png`
  })


  mainWindow.loadURL(`file://${__dirname}/dist/libreriaNg/index.html`)

  // Event when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (mainWindow === null) {
    createWindow()
  }
})