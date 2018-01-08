import { Configuration } from "../settings/config-model";
import * as azure from "azure-storage";
import * as fs from 'fs';
import * as path from "path";
import * as bunyan from "bunyan";
// import * as lwip from 'lwip';

export class AzureDownloader {
    private configuration: Configuration;
    private logger: bunyan;
    private blobSvc: azure.BlobService;
    //private cacheFolder = "";
    //private cacheFile = "";
    //private ownerId = "";
    //private contentId = "";
    // private callback: lwip.BufferCallback | lwip.ImageCallback;

    constructor(configuration: Configuration, logger: bunyan) {
        this.configuration = configuration;
        this.logger = logger;

        try {
            this.blobSvc = azure.createBlobServiceWithSas(this.configuration.azureStorageHostName, configuration.sasTokenSignature);
            this.getImages(false, (data: any) => {
                console.log("Got data back: Length: " + data.entries.length);
            });
        } catch (error) {
            this.logger.error(error);
        }
    }

    public getImages = (force: boolean, callback: any) => {
        try {
            this.blobSvc.listBlobsSegmented("shared-photo-frame", null, (error: any, result: azure.BlobService.ListBlobsResult) => {
                if (!error) {
                    console.log(JSON.stringify(result, null, " "));
                    if (result.entries.length > 0) {
                        for (let i = 0; i < result.entries.length; i++) {
                            try {
                                let cacheFileName = path.resolve('.') + '/'+ this.configuration.cacheFolderName +'/' + result.entries[i].name;
                                fs.stat(cacheFileName, (error: NodeJS.ErrnoException, stats: fs.Stats) => {
                                    if(error){
                                        this.logger.debug(error, { message: "fs.stat ERROR in getImages"});
                                    }
                                    if(stats == null || force){
                                        console.log("Trying to download: " + cacheFileName);
                                        this.blobSvc.getBlobToStream(this.configuration.containerName, result.entries[i].name, fs.createWriteStream(cacheFileName),
                                            (error) => {
                                                if (!error) {
                                                    this.logger.error(error, "getBlobToStream errored out");
                                                }
                                                else {
                                                    this.logger.error(error, "getBlobToStream errored out");
                                                }
                                            });
                                    }
                                    else{
                                        this.logger.debug({ message: "Download skipped for: " + cacheFileName });
                                    }
                                });
                            }
                            catch (error) {
                                this.logger.error(error, "Error: getImages loop");
                            }
                        }
                    }
                    callback(result);
                    // result.entries contains the entries
                    // If not all blobs were returned, result.continuationToken has the continuation token.
                }
                else {
                    this.logger.error("error = " + error);
                }
            });
        } catch (error) {
            this.logger.error(error);
        }
    }
}
//
//     public getImageFromBlob = (name: string, ownerId: string, callback: any) => {
//         try {
//             this.ownerId = ownerId;
//             this.contentId = name;
//             this.cacheFolder = path.resolve('.') + '/cache/' + ownerId;
//             this.cacheFile = path.resolve('.') + '/cache/' + ownerId + '/' + name;
//             fs.stat(this.cacheFile, (err, stats) => {
//                 if (err != null) {
//                     this.logger.error(err, "getImageFromBlob->fs.stat error:");
//                 }
//                 if (stats == null) {
//                     fs.mkdir(this.cacheFolder, (error: NodeJS.ErrnoException) => {
//                         this.blobSvc.getBlobToStream(this.configuration.containerName, this.contentId, fs.createWriteStream(this.cacheFile),
//                             (error, result, response): azure.BlobService.BlobResult => {
//                                 if (!error) {
//                                 }
//                                 else {
//                                     this.logger.error(error, "getBlobToStream errored out");
//                                 });
//                     });
//                 });
//         }
//                 else {
//             this.logger.debug("File already exists: " + this.cacheFile);
//         }
//     }
//     catch(err) {
//         //console.log("Something blew up" + err);
//         this.logger.error(err, "Unhandled error in downloader");
//
//     }
// }
//     }
// }
