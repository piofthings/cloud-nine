import * as ko from "knockout";
import "text!./reboot-screen.html";
export var template = require("text!./reboot-screen.html");

export class viewModel
{
    private currentComponent: KnockoutObservable<string>;

    constructor(params: any)
    {
        if(params.currentComponent != null){
            this.currentComponent = params.currentComponent;
        }
    }

}
