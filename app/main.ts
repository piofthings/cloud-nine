import { app, BrowserWindow } from 'electron';
//import * as azure from 'azure-storage';
import * as fs from "fs";
import * as path from 'path';
import * as url from 'url';
import * as bunyan from 'bunyan';
import { ConfigManager } from './services/settings/config-manager';
import { Configuration } from "./services/settings/config-model";
import { AzureDownloader } from "./services/azure-storage/downloader";
import { EventHandler } from './services/event-handler/event-handler';

//const ipcRenderer : IpcRenderer = require('electron').ipcRenderer;

export class main {
    private eventHandler : EventHandler;
    private ipcMain: Electron.IpcMain = require('electron').ipcMain;

    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
    private mainWindow: BrowserWindow | null;
    private logger: bunyan;
    private configManager: ConfigManager;
    private configuration: Configuration;
    constructor() {
        try {
            this.ipcMain.on('menu.App.Quit', () => {
                this.quitApp();
            });
            this.ipcMain.on('ui.settings.save', (event: any, settings: Configuration) =>{
                this.configManager.saveSettings(settings);
            })
            this.logger = bunyan.createLogger({
                name: 'cloud-nine',
                serializers: {
                    req: bunyan.stdSerializers.req,     // standard bunyan req serializer
                    err: bunyan.stdSerializers.err      // standard bunyan error serializer
                },
                streams: [
                    {
                        level: 'info',                  // loging level
                        path: __dirname + '/logs/foo.log'
                    }
                ]
            });
            this.configManager = new ConfigManager(this.logger);
            this.configManager.load((configuration) => {

                configuration.rootPath = __dirname;
                console.log("Configuration Loaded");
                this.configuration = configuration;

                app.on('ready', this.createWindow);
                this.eventHandler = new EventHandler(configuration, this.logger, this.ipcMain);

                // Quit when all windows are closed.
                app.on('window-all-closed', () => {
                    // On macOS it is common for applications and their menu bar
                    // to stay active until the user quits explicitly with Cmd + Q
                    if (process.platform !== 'darwin') {
                        app.quit();
                    }
                });

                app.on('activate', () => {
                    // On macOS it's common to re-create a window in the app when the
                    // dock icon is clicked and there are no other windows open.
                    if (this.mainWindow === null) {
                        this.createWindow();
                    }
                });
                let downloader = new AzureDownloader(this.configuration, this.logger);
            });
        } catch (error) {
            console.log(error);
        }
    }

    private watchCache = () => {
        let cacheFolder = path.join(this.configuration.rootPath, this.configuration.cacheFolderName);
        fs.watch(cacheFolder,  this.raiseChange);
    }

    private raiseChange = (eventType:string, fileName: string)=>{
        let cacheFolder = path.join(this.configuration.rootPath, this.configuration.cacheFolderName);
        let cacheFileName = path.join(cacheFolder, fileName);
        //let ipcRenderer : Electron.IpcRenderer = require('electron').ipcRenderer;

        console.log(eventType + ":" + cacheFileName);
        if(eventType == "rename" ||
            eventType == "new"){
            //ipcRenderer.send("on.imageservice.newimage", cacheFileName);
            this.mainWindow!.webContents.send('on.imageservice.newimage', cacheFileName);
        }
    }

    private createWindow = () => {
        // Create the browser window.
        this.mainWindow = new BrowserWindow({ width: 800, height: 600 });
        this.mainWindow.webContents.on('did-finish-load', () => {
            this.mainWindow!.webContents.send('ping', 'whoooooooh!')
        });
        this.eventHandler.attach(this.mainWindow);

        // and load the index.html of the app.
        this.mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'ui/main.html'),
            protocol: 'file:',
            slashes: true
        }));
        this.mainWindow.maximize();
        this.mainWindow.setFullScreen(true);

        //this.mainWindow.webContents.send('ping', 'whoooooooh!');
        // Open the DevTools.
        //this.mainWindow.webContents.openDevTools();

        // Emitted when the window is closed.
        this.mainWindow.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.quitApp();
        });

        this.watchCache();
    }

    private quitApp = () =>{
        this.mainWindow = null;
        app.quit();
    }
}


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
new main();
