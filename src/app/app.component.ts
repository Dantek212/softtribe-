import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { getString } from "tns-core-modules/application-settings";
import { BackgroundGeolocation } from "nativescript-background-geolocation-lt";
import { isEnabled, enableLocationRequest } from "nativescript-geolocation";
import { config } from "rxjs/internal/config";
import { UserMarkinService } from "./services/user-markin.service";
// import * as fs from "tns-core-modules/file-system";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    user: string = "";
    profile: any;
    show: any;
    markit: any;
    // checkgeo: number;

    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;


    constructor(private router: Router, private routerExtensions: RouterExtensions,
                private userMarkinService: UserMarkinService) {
        // Use the component constructor to inject services.
    }

    // UserInCheck() {
    //     return this.userMarkin();
    // }

    ngOnInit(): void {
        this.profile = getString('userProfilepic');
        this.usercheck();
        // this.markincheck();
        // this.fileget();
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    usercheck() {

        this.user = getString("userId");

        if (this.user == null) {
            this.routerExtensions.navigate(["../login"]);
        } else {
            this.routerExtensions.navigate(["../home"]);
            this.geoloc();
            this.profile = this.user;

        }
        console.log(this.user);

    }
    geoloc() {
        enableLocationRequest(true);
        isEnabled().then(function (isLocationEnabled) {
            let message = "Location services are not available";
            if (isLocationEnabled) {
                message = "Location services are available";
            }
            alert(message);
        }, function (e) {
            console.log("Location error received: " + (e.message || e));
        });

        BackgroundGeolocation.ready({
            desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
            distanceFilter: 50,
            foregroundService: true
        },
            function (state) {
                console.log("- BackgroundGeolocation configured and ready");
                if (!state.enabled) {  // <-- current state provided to callback
                    BackgroundGeolocation.start();

                }
                function onLocation(location) {   // <-- successFn
                    console.log("- location: ", location.coords);
                }
                function onLocationError(error) {
                    console.log("- location error: ", error);
                }
                BackgroundGeolocation.on("location", onLocation, onLocationError);

                BackgroundGeolocation.configure(config, function (state) {
                    // Add some geofences.

                    BackgroundGeolocation.addGeofence({
                        identifier: "theSOFTtribe_01",
                        radius: 25,
                        latitude: 5.6039384,
                        longitude: -0.1830133,
                        notifyOnEntry: true,
                        notifyOnExit: true
                        // notifyOnDwell: false,

                    }

                    );

                    if (!state.enabled) {
                        BackgroundGeolocation.startGeofences(function (state) {
                            console.log("- Geofence-only monitoring started", state.trackingMode);

                        });
                    }

                    BackgroundGeolocation.on('geofence', function(params) {
                        if (params.identifier === "theSOFTtribe_01" || params.action == "ENTER") {
                            // const z = 1;
                            // this.checkgeo = z;

                            BackgroundGeolocation.configure({
                                foregroundService: true,
                                notificationPriority: BackgroundGeolocation.NOTIFICATION_PRIORITY_MIN,
                                notificationTitle: "theSOFttribe",
                                notificationText: " You have" + " " + params.action + " " + "office.",
                                notificationSmallIcon: "drawable/logo"

                            });

                            alert(" You are in office");
                            alert("You are " + params.action);
                            // this.userMarkin();
                        }

                        if (params.identifier == "theSOFTtribe_01" && params.action == "EXIT") {
                            // const z = 0;
                            // this.checkgeo = z;
                            BackgroundGeolocation.configure({
                                foregroundService: true,
                                notificationPriority: BackgroundGeolocation.NOTIFICATION_PRIORITY_MIN,
                                notificationTitle: "theSOFttribe",
                                notificationText: " You have left office.",
                                notificationSmallIcon: "drawable/logo"
                            });
                            alert ("You have left office");
                        }

                    });


                });
            });

    }
    // markincheck() {
    //     if (this.checkgeo === 1) {
    //         alert("MARKIN READY");
    //         console.log(this.checkgeo);
    //     } else if (this.checkgeo === 0) {
    //         alert("MARKOUT READY");
    //     }
    // }
    userMarkin() {
        this.markit = this.userMarkinService.markinUser(this.user).subscribe((res) => {
            this.show = res;
            console.log(res);
        });
    }
    // fileget(){
    //     var imageprofile = fs.Folder.fromPath(this.profile);
    // }
}
