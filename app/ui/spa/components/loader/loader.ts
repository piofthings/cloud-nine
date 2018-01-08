import * as ko from "knockout";
import "text!./loader.html";

export var template = require("text!./loader.html");
export class viewModel{
    private baseUrl = ko.observable<string>(__dirname);
    constructor(){

    }
}
