/// <reference types="electron" />
// Scam the TS compiler :-)

//Electron
declare var electron: any;
declare var services: any;
declare var ipcMain: Electron.IpcMain;
declare var ipcRenderer: Electron.IpcRenderer;
declare var dialog: any;
declare var remote: Electron.Remote;
declare var app: any;
declare var menu: Electron.Menu;

//Node
declare var __dirname: string;
