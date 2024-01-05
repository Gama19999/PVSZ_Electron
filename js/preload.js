// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pvsz', {
	writeLevel: (scene, lvl) => ipcRenderer.send('writeLevel', scene, lvl)
});