import * as ko from "knockout";
import "text!./settings.html";
export var template = require("text!./settings.html");

export class viewModel
{
    private currentComponent: KnockoutObservable<string>;
    private configurationString: KnockoutObservable<string> = ko.observable<string>("");
    constructor(params: any)
    {
        if(params.currentComponent != null){
            this.currentComponent = params.currentComponent;
        }
        ipcRenderer.send("ui.settings.getall");
        ipcRenderer.on("on.settings.getall", (event, config: any) =>{
            console.log(JSON.stringify(config, null, " "));
            this.configurationString(JSON.stringify(config, null, " ");
        });
    }


}
