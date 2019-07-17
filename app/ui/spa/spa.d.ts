interface Document {
    app: App
}

export interface Route {
    path: KnockoutObservable<string>;
    title: KnockoutObservable<string>;
    pageComponent: KnockoutObservable<string>;
    roles: KnockoutObservableArray<string>;
    userName: KnockoutObservable<string>;
    userId: KnockoutObservable<string>;
    crRoute: KnockoutObservable<any>;
    // leftMenuItems: KnockoutObservableArray<MenuItem>;
    // rightMenuItems: KnockoutObservableArray<MenuItem>;
}

export interface Router { 

}

export interface MenuItem {
    text: KnockoutObservable<string>;
    href: KnockoutObservable<string>;
    css: KnockoutObservable<string>;
    styles: KnockoutObservable<string>;
    isVisible: KnockoutObservable<boolean>;
    hrefCss: KnockoutObservable<string>;
    needsAuthentication: KnockoutObservable<boolean>;
    authorizedForRoles: KnockoutObservableArray<string>;
}

export interface App {
    startUp: () => void;
    router: Router;
    registerRoute: (newRoute: Route) => void;
    registerComponent: (name: string, location: string) => void;
    registerMenu: (text: string, url: string, menuCssClass: string, menuHrefClass: string, authenticated: boolean, roles: Array<string>) => void;
}
