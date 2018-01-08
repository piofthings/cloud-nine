import * as ko from "knockout";
import "text!./settings.html";
export var template = require("text!./settings.html");

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
