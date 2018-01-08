import * as ko from "knockout";
import "text!./slide-show.html";
export var template = require("text!./slide-show.html");

export class viewModel {
    private currentComponent: KnockoutObservable<string>;
    private fileName: KnockoutObservable<string> = ko.observable(__dirname + "/../cache/WP_20161202_20_54_30_Pro.jpg");
    private fileNames: KnockoutObservableArray<string> = ko.observableArray<string>([]);
    private currentTimer: NodeJS.Timer | null;
    constructor(params: any) {
        if (params.currentComponent != null) {
            this.currentComponent = params.currentComponent;
        }
        ipcRenderer.send("ui.slideshow.getall");
        ipcRenderer.on("on.slideshow.getall", this.updateFileNames);
        ipcRenderer.on('on.imageservice.newimage', (event, fileName: string) => {
            console.log(JSON.stringify(fileName, null, 1))

            this.fileNames.push(fileName)
        });

        this.hideNavbar();
    }

    private hideNavbar = () =>{
        $(".navbar-default").slideUp("slow", () => {
            $('.carousel').carousel();
        });
    }

    private showNavbar = () =>{
        if(this.currentTimer != null){
            clearTimeout(this.currentTimer);
        }
        $(".navbar-default").slideDown("slow", () => {
            /* Replace First Div */
            //$(this).replaceWith("<div>New Div!</div>");

            this.currentTimer = setTimeout(()=>{
                this.currentTimer = null;
                this.hideNavbar();
            }, 10000);
        });
    }

    private tapped = (event) =>{
        this.showNavbar();
    }

    private updateFileNames = (event, fileNames: Array<string>) => {
        console.log(JSON.stringify(fileNames, null, 1))
        let shouldCarousel = false;
        if (this.fileNames().length == 0) {
            shouldCarousel = true;
        }
        ko.utils.arrayPushAll(this.fileNames, fileNames);
        if (shouldCarousel) {
            $('.carousel').carousel();
        }
    }
}
