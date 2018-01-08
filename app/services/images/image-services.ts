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

    public getCacheFiles = () => {
        fs.readdir(path.join(this.configuration.rootPath, this.configuration.cacheFolderName), (err: Error, files: Array<string>)=>{
            if(error){
                this.logger.error(error, "getCacheFiles");
            }
            else{
                
            }
        });
    }
}
