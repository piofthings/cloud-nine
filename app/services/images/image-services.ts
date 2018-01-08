import { Configuration } from "../settings/config-model";
import * as fs from "fs";
import * as path from "path";
import * as bunyan from "bunyan";

export class ImageServices
{
    private configuration : Configuration;
    private logger: bunyan;
    constructor(config: Configuration, logger: bunyan){
        this.configuration = config;
        this.logger = logger;
    }

    public getCacheFiles = (callback: (results: Array<string>) => void) => {
        fs.readdir(path.join(this.configuration.rootPath, this.configuration.cacheFolderName), (error: Error, files: Array<string>)=>{
            if(error){
                this.logger.error(error, "getCacheFiles");
            }
            else{
                if(callback){
                    for (let i = 0; i < files.length; i++) {
                        files[i] = path.join(this.configuration.rootPath, this.configuration.cacheFolderName, files[i]);
                    }
                    console.log(files);
                    
                    callback(files);

                }
            }
        });
    }
}
