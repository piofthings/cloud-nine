import { Configuration } from "../settings/config-model";
import { ImageServices } from "../images/image-services";
import { AzureDownloader } from "../azure-storage/downloader";
import * as bunyan from "bunyan";

export class EventHandler {
   private ipcMain: Electron.IpcMain;


   private currentAppSettings: Configuration;
   private imageServices: ImageServices;
   private downloaderServices: AzureDownloader;

   constructor(config: Configuration, logger: bunyan, ipcMain: Electron.IpcMain) {
      this.ipcMain = ipcMain;
      this.currentAppSettings = config;
      this.imageServices = new ImageServices(config, logger);
      this.downloaderServices = new AzureDownloader(config, logger);
   }

   public attach = (mainWindow: Electron.BrowserWindow) => {
      this.attachMenuServices();
      this.attachImageServices();
      this.attachConfigurationServices();
      this.attachDownloaderServices();
   }

   private attachMenuServices = () => {
      this.ipcMain.on("menu.View.OnSettings", (event) => {
         event.sender.send("menu.View.Settings");
      });
   }

   private attachDownloaderServices = () => {
      this.ipcMain.on("ui.download.all", (event: Electron.IpcMessageEvent) => {
         this.downloaderServices.getImages(false, () => {

         });
      });
   }

   private attachConfigurationServices = () => {

      this.ipcMain.on("ui.settings.getall", (event: Electron.IpcMessageEvent) => {
         event.sender.send("on.settings.getall", this.currentAppSettings);
      });
   }
   private attachImageServices = () => {

      this.ipcMain.on("ui.slideshow.getall", (event: Electron.IpcMessageEvent) => {
         this.imageServices.getCacheFiles((result: Array<string>) => {
            event.sender.send("on.slideshow.getall", result);
         })
      });
   }

   public detach() {
      //this.currentFileServices = null;
      //this.currentAppSettings = null;

   }
}
