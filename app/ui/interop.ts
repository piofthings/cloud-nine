// Special file outside the SPA. This MUST be loaded from the main.html file directly
// This will initialise the Electron objects that we need to interop with the desktop
// side of things and stick it in the global context

const electron  = require('electron');
const ipcMain : Electron.IpcMain = require('electron').ipcMain;
const ipcRenderer : Electron.IpcRenderer = require('electron').ipcRenderer;
const dialog : Electron.Dialog = require('electron').dialog;
const remote : Electron.Remote = require('electron').remote;
