import * as ko from "knockout";
import { SettingsViewModel } from "./settings-view-model";
import "text!./settings.html";
export var template = require("text!./settings.html");

export class viewModel
{
    private currentComponent: KnockoutObservable<string>;
    private configurationString: KnockoutObservable<string> = ko.observable<string>("");
    private currentSettings: KnockoutObservable<SettingsViewModel> = ko.observable<SettingsViewModel>();

    constructor(params: any)
    {
        if(params.header != null){
            params.header("Settings");
        }
        ipcRenderer.send("ui.settings.getall");
        ipcRenderer.on("on.settings.getall", (event, config: any) =>{
            console.log(JSON.stringify(config, null, " "));
            this.currentSettings(SettingsViewModel.fromJS(config));
            this.configurationString(JSON.stringify(config, null, " "));

        });


    }

    private save = () => {
        console.log(ko.toJSON(this.currentSettings()));
        ipcRenderer.send("ui.settings.save", JSON.parse(ko.toJSON(this.currentSettings())));
        //ipcRenderer.send()
    }
}
