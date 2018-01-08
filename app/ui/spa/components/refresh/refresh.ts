import * as ko from "knockout";
import "text!./refresh.html";
export var template = require("text!./refresh.html");

export class viewModel {
    private currentComponent: KnockoutObservable<string>;
    constructor(params: any) {
        if(params.currentComponent != null){
            this.currentComponent = params.currentComponent;
        }
    }

}
