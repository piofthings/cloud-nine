/// <reference path="../../interop.d.ts"/>

import * as ko from "knockout";

import "text!./home.html";

export var template = require("text!./home.html");


export class viewModel {
    private dateTime : KnockoutObservable<string> = ko.observable<string>(new Date().toUTCString());
    private loading: KnockoutObservable<boolean> = ko.observable<boolean>(true);
    private currentComponent: KnockoutObservable<string> = ko.observable<string>("");

    constructor()
    {
        this.loading(false);
        ipcRenderer.on('ping', (event, message) => {
            console.log(message)
        });
    }

    private showSettings = () =>{
        this.currentComponent("settings");
    }

    private showMenu = () =>{
        $(".navbar-default").slideDown("slow", () => {
        });
    }

    private showRefresh = () => {
        // this.currentComponent("refresh");
        ipcRenderer.send("ui.download.all");
        this.showSlideshow();

    }

    private showRebootScreen = () => {
        ipcRenderer.send("menu.App.Quit");
        //this.currentComponent("reboot-screen");
    }

    private showSlideshow = () => {
        this.currentComponent("slide-show");
    }

    private goBack = () => {
        if(this.currentComponent() != ""){
            this.showMenu();
            this.currentComponent("home");
        }
    }
}
