import { Configuration } from "./config-model";
import nconf = require('nconf');
import fs = require('fs');
import * as os from 'os';

export class ConfigManager {

    public currentSettings = new Configuration();
    private logger: any;

    constructor(logger: any) {
        this.logger = logger;
    }

    public load = (callback: (currentSettings: Configuration) => void) => {
        try {
            console.log("Load");

            nconf.file('./appconfig.json');
            nconf.load((error) => {
                console.log("Loading");

                if (error == null) {
                    this.currentSettings.azureStorageHostName = nconf.get('azureStorageHostName');
                    this.currentSettings.containerName = nconf.get('containerName');
                    this.currentSettings.sasTokenSignature = nconf.get('sasTokenSignature');
                    this.currentSettings.sasTokenStartDate = new Date(nconf.get('sasTokenStartDate'));
                    this.currentSettings.sasTokenEndDate = new Date(nconf.get('sasTokenEndDate'));
                    this.currentSettings.cacheFolderName = nconf.get('cacheFolderName');
                    this.currentSettings.ipAddresses = this.getIpAddress();
                    if (callback != null) {
                        callback(this.currentSettings);
                    }
                }
                else {
                    console.log("ERROR WASNT NULL");
                    console.error(error);
                    this.logger.error(error);
                }
            });
        }
        catch (error) {
            console.log(error);
            this.logger.error(error, "Error loading config");

        }
    }

    private getIpAddress = (): string => {
        let ifaces = os.networkInterfaces();
        let ipAddrString = "";
        Object.keys(ifaces).forEach( (ifname) => {
          var alias = 0;

          ifaces[ifname].forEach((iface) => {
            if ('IPv4' !== iface.family || iface.internal !== false) {
              // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
              return;
            }

            if (alias >= 1) {
              // this single interface has multiple ipv4 addresses
              ipAddrString = ipAddrString + ifname + ':' + alias, iface.address;
            } else {
              // this interface has only one ipv4 adress
              ipAddrString = ipAddrString + ifname + ':' + iface.address;
            }
            ++alias;
          });
        });
        console.log("ipAddrString:" + ipAddrString );
        return ipAddrString;
    }

    public set = (name: string, value: any) => {
        nconf.set(name, value);
        (<any>this.currentSettings)[name] = <any>value;
    }

    public get = () => {
        return this.currentSettings;
    }

    public saveSettings = (settings: Configuration) => {
        let keys = Object.keys(settings);
        keys.forEach((key) => {
            nconf.set(key, (<any>settings)[key]);
        });
        this.save();
    }

    public save = () => {
        nconf.save(() => {
            fs.readFile('./appconfig.json', (err, data) => {
                if (err != null) {
                    this.logger.log(err, "Save Error");
                    return;
                } else {
                    console.dir(JSON.parse(data.toString()));
                }
            });
        });
    }
}
