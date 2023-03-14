const { contextBridge, ipcRenderer } = require('electron')

// https://medium.com/developer-rants/opening-system-dialogs-in-electron-from-the-renderer-6daf49782fd8
contextBridge.exposeInMainWorld('electron', {
  openDialog: (method, config) => ipcRenderer.invoke('dialog', method, config),
})
