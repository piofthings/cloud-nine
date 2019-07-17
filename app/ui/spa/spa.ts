import { StApp } from "./boot/st-app";

requirejs.config(
{
    baseUrl: __dirname + '/',
    paths:
    {
        "jquery": "libs/jquery/dist/jquery.min",
        "crossroads": "libs/crossroads/dist/crossroads",
        "signals": "libs/js-signals/dist/signals",
        "knockout": "libs/knockout/dist/knockout",
        "text": "libs/text/text",
        "historyjs": "libs/history.js/scripts/bundled/html4+html5/native.history",
        "RSVP": "libs/rsvp.js/rsvp.min",
        "toastr":"libs/toastr/toastr.min",
        "bootstrap":"libs/bootstrap/dist/js/bootstrap.min",
    },
    shim:
    {
        "jquery": { exports : "$" },
        "knockout": { exports: "ko" },
        "bootstrap": {
            deps: ["jquery"]
        },
        // "amplify": {
        //     exports: "amplify",
        //     deps : ["jQuery"]
        // },
        "toastr": {
            exports: "toastr",
            deps: ["jquery"]
        }
    }
});

requirejs(["jquery", "knockout", "text", "historyjs", "RSVP",  "spa/boot/st-app", "bootstrap"], ($: JQueryStatic, ko : KnockoutStatic, text: any, history: History, RSVP: any, app: any) => {
    document.app = new app.StApp();
    document.app.registerComponent("home", "spa/components/home/home");
    document.app.registerComponent("loader", "spa/components/loader/loader");
    document.app.registerComponent("settings", "spa/components/settings/settings");
    document.app.registerComponent("refresh", "spa/components/refresh/refresh");
    document.app.registerComponent("reboot-screen", "spa/components/reboot-screen/reboot-screen");
    document.app.registerComponent("slide-show", "spa/components/slide-show/slide-show");
    //document.app.registerComponent("invitation-editor", "./ui/components/invitation-editor/invitation-editor");

    document.app.startUp();

});
