import "../../../interop"
import * as ko from "knockout";
import * as Route from "./st-route";
import { Router } from "./st-router";
import { MenuItems } from "../../menus/menus";

export class StApp implements App {
    public router: Router;

    constructor()
    {
        this.router = new Router();
        let currentMenuTemplate = remote.Menu.buildFromTemplate(new MenuItems().menuTemplate);
        remote.Menu.setApplicationMenu(currentMenuTemplate);
    }

    public startUp = () => {
        //this.registerComponents();
        this.registerRoutes();
    }

    public registerComponent = (name: string, location: string) => {
        ko.components.register(name, { require: location });
    }

    public registerRoute = (newRoute: Route) => {
        this.router.registerRoute(newRoute);
    }

    public registerMenu = (text: string, url: string, menuCssClass: string, menuHrefClass: string, authenticated: boolean, roles: Array<string>) => {

    }

    private registerComponents = () => {
        // this.registerComponent("st-nav-menu", "./st-ui/components/st-nav-menu/st-nav-menu");
        // this.registerComponent("st-nav-tab", "./st-ui/components/st-nav-tab/st-nav-tab");
        // this.registerComponent("st-side-nav", "./st-ui/components/st-side-nav/st-side-nav");
        // this.registerComponent("st-image-uploader", "./st-ui/components/st-image-uploader/st-image-uploader");
        // this.registerComponent("st-feed-list", "./st-ui/components/st-feed-list/st-feed-list");
        // this.registerComponent("st-modal", "./st-ui/components/st-modal/st-modal");
    }

    private registerRoutes = () => {

        this.registerRoute(Router.newRouteFactory("/:routeParams*:", "home",  "Home | The lazy blogger!"));

        this.router.parseCurrentRoute();
        ko.applyBindings(this.router.currentRoute);
    }

}
