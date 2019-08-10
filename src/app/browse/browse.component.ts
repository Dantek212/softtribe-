import { Component, OnInit } from "@angular/core";
// import { RadSideDrawer } from "nativescript-ui-sidedrawer";
// import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {

    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

//     onDrawerButtonTap(): void {
//         const sideDrawer = <RadSideDrawer>app.getRootView();
//         sideDrawer.showDrawer();
//     }
    navigateto() {
        this.routerExtensions.navigate(["../login"]);
     }
}
