const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'injectElectron.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  })

  win.loadURL('http://localhost:3000')
  win.webContents.openDevTools()
}
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  ipcMain.handle('dialog', async (event, method, params) => {
    const results = await dialog[method](params)
    console.log(results)
  })
})
