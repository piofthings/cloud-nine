//import * as nconf from "nconf";
//import { ConfigManager } from "./services/settings/config-manager";
import { Configuration } from "./services/settings/config-model";
import { ImageServices } from "./services/images/image-services";
import * as bunyan from "bunyan";


// import { app } from 'electron';

export class EventHandler {
    private ipcMain: Electron.IpcMain = require('electron').ipcMain;


    private currentWindow: Electron.BrowserWindow;
    private currentAppSettings: Configuration;
    private imageServices: ImageServices;

    constructor(config: Configuration, logger: bunyan) {
        this.currentAppSettings = config;
        this.imageServices = new ImageServices(config, logger);
    }

    public attach = (mainWindow: Electron.BrowserWindow) => {
        this.currentWindow = mainWindow;

        //this.currentFileServices = new files.service(mainWindow);

        // this.ipcMain.on("menu.File.OnNew", (event, arg) => {
        //     event.sender.send("menu.File.OnNew");
        // });
        //
        // this.ipcMain.on("app.File.New", (event, arg) => {
        //     this.currentFileServices.New(event, arg);
        // });
        //
        // this.ipcMain.on("menu.File.Open", (event, arg) => {
        //     this.currentFileServices.Open(event);
        // });
        //
        // this.ipcMain.on("app.File.Load", (event, arg) => {
        //     this.currentFileServices.Load(event, [arg]);
        // });
        //
        // this.ipcMain.on("attachment.image.Save", (event, arg) => {
        //     this.currentFileServices.Save(event, arg);
        // });
        //
        // this.ipcMain.on("menu.File.OnSave", (event, arg) => {
        //     event.sender.send("menu.File.Save");
        // });

        this.attachMenuServices();
        this.attachImageServices();
        this.attachConfigurationServices();
    }

    private attachMenuServices = () => {
        this.ipcMain.on("menu.View.OnSettings", (event) => {
            event.sender.send("menu.View.Settings");
        });
    }

    private attachConfigurationServices = () => {

        this.ipcMain.on("ui.settings.getall", (event: Electron.IpcMessageEvent) => {
            event.sender.send("on.settings.getall", this.currentAppSettings);
        });
    }
    private attachImageServices = () => {

        this.ipcMain.on("ui.slideshow.getall", (event: Electron.IpcMessageEvent) => {
            this.imageServices.getCacheFiles((result: Array<string>)=>{
                event.sender.send("on.slideshow.getall", result);
            })
        });
    }

    // this.ipcMain.on("app.File.Save", (event, arg) => {
    //     if (arg.fileName != '') {
    //         this.currentSettingsSvc.set('lastOpenFile', arg.fileName);
    //     }
    //     this.currentFileServices.Save(event, arg);
    // });
    //
    // this.ipcMain.on('settings.App.Save', (event, arg) => {
    //     this.currentSettingsSvc.saveSettings(arg);
    // })

    // this.ipcMain.on("menu.View.GetMySites", (event, arg) => {
    //     var connector = new wordpress.service(this.currentAppSettings.oAuth2Groups[0].accessToken);
    //     connector.getAccountDetails(event, this.currentAppSettings);
    // });
    //
    // this.ipcMain.on("app.View.GetCategories", (event: Electron.IpcMainEvent, arg: string)=>
    // {
    //     var connector = new wordpress.service(this.currentAppSettings.oAuth2Groups[0].accessToken);
    //     connector.getSiteCategories(event, arg);
    // });

    // this.ipcMain.on("app.side-panel.onhide", (event: Electron.IpcMainEvent, arg: any)=>{
    //     event.sender.send("app.side-panel.hide");
    // });
    //
    // this.ipcMain.on("app.view.post.treeview.nodecheckchanged", (event: Electron.IpcMainEvent, arg: any) => {
    //     console.log("nodecheckchanged:" + arg.checked + " DataSource: "+ arg.dataSource);
    //     if(arg.checked == true)
    //     {
    //         event.sender.send("app.view.post.categoryadded", arg.dataSource);
    //     }
    //     else{
    //         event.sender.send("app.view.post.categoryremoved", arg.dataSource);
    //     }
    // });
    //
    // this.ipcMain.on("app.View.PostBlog", (event, arg)=>
    // {
    //     let selectedSiteId = arg.selectedSiteId;
    //     console.log("Site ID: " + selectedSiteId);
    //
    //     if(arg.selectedPostId!=null && arg.selectedPostId != '')
    //     {
    //         let wpCreatePostSvc = new wordpress.api.posts.updatePost
    //             (this.currentAppSettings.oAuth2Groups[0].accessToken, selectedSiteId, arg.selectedPostId);
    //
    //         console.log("Updating post (ID): " + JSON.stringify(arg,null,3));//.selectedPostId);
    //
    //         let postQuery = new wordpress.model.query.postNew();
    //         postQuery.pretty = true;
    //         let postUpdate = new wordpress.model.request.postNew();
    //         postUpdate.title = arg.title;
    //         postUpdate.content = arg.content;
    //         postUpdate.media = arg.media;
    //
    //         wpCreatePostSvc.execute(postQuery, postUpdate, (data) => {
    //             console.log("Updated post successfully.");
    //             event.sender.send("app.View.UpdatedSuccessfully", data);
    //         });
    //     }
    //     else
    //     {
    //         let wpCreatePostSvc = new wordpress.api.posts.createNewPost
    //             (this.currentAppSettings.oAuth2Groups[0].accessToken, selectedSiteId);
    //
    //         let postQuery = new wordpress.model.query.postNew();
    //         postQuery.pretty = true;
    //         let postNew = new wordpress.model.request.postNew();
    //         postNew.title = arg.title;
    //         postNew.content = arg.content;
    //         postNew.media = arg.media;
    //
    //         wpCreatePostSvc.execute(postQuery, postNew, (data) => {
    //             console.log("Created post successfully." + JSON.stringify(data));
    //             event.sender.send("app.View.PostedSuccessfully", data);
    //         });
    //     }
    // });
    //
    // this.ipcMain.on("paste", (event, arg) =>
    // {
    //     // return true;
    //     let clipboard = require('electron').clipboard;
    //     let image = clipboard.readImage();
    //     if(image.isEmpty())
    //     {
    //         console.log("Clipboard Type Text.");
    //
    //         var value = clipboard.readText();
    //         event.sender.send("paste.html", value);
    //     }
    //     else
    //     {
    //         console.log("Clipboard Type Image.");
    //         event.sender.send("paste.image", image.toDataURL());
    //     }
    // });
    //
    // this.ipcMain.on("attachment.get.fileName", (event, arg)=>
    // {
    //     this.currentFileServices.NewFileName(event);
    // });
    //
    // this.ipcMain.on("menu.File.OnPrint", (event, arg)=>
    // {
    //     event.sender.send("menu.File.OnPrint", arg);
    // });
    //
    // this.ipcMain.on("app.File.PrintPreview", (event, arg) => {
    //     this.currentWindow.webContents.print();
    // });
    //}

    public detach() {
        //this.currentFileServices = null;
        //this.currentAppSettings = null;

    }
}
