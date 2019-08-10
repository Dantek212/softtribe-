import { getString, setString } from "tns-core-modules/application-settings";
import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { TextField } from "tns-core-modules/ui/text-field";
import * as imagepicker from "nativescript-imagepicker";
import { User } from "../model/user.model";
// import * as imageSourceModule from "image-source";
import * as fs from "tns-core-modules/file-system";

@Component({
    selector: "Settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.css"]
})
export class SettingsComponent implements OnInit {
    profile: string;
    // myimg="res://profileimg";
    imagepath: any;
    imageAssets: any;
    imageSrc: any = "res://profileimg";
    isSingleMode: boolean = true;
    thumbSize: number = 80;
    previewSize: number = 120;

    constructor() {
        // Use the component constructor to inject providers.
    }
userdata = {"email":"" , "password": ""};
    ngOnInit(): void {
        // Init your component properties here.
    this.profile = getString("userId");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    onUpdateButtonTap(value1, value2, value3){
       this.userdata.email = value1;
       var pass = value2;
       var confirmpass = value3;
       if (pass === confirmpass){
           this.userdata.password = pass;
           console.log(pass);
       }
       setString("userProfilepic", this.imagepath);


    }
    firstTfLoaded(args) {
        let firstTextfield = <TextField>args.object;
        setTimeout(() => {
            firstTextfield.focus(); // Shows the soft input method, ususally a soft keyboard.
        }, 100);
    }
    onFocus(args){
        let textField = <TextField>args.objects;
    }
    onBlur(args){
        let textField = <TextField>args.objects;

    }
    public onSelectSingleTap() {
        this.isSingleMode = true;

        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }
    private startSelection(context) {
        let that = this;
        var milliseconds = new Date().getTime();

        context.authorize().then(() => {
            that.imageAssets = [];
            that.imageSrc = null;
            return context.present();
        })
        .then((selection) => {
            console.log("Selection done: " + JSON.stringify(selection));
            that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;
            let folder = fs.knownFolders.documents();
            var path = fs.path.join(folder.path, "Profile.png");
            // var saved = that.imageSrc.saveToFile(path, "png");
            that.imagepath = that.imageSrc._android;
            console.log(that.imageSrc._android);
            console.log(that.imagepath);
            // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
            // selection.forEach(function (element) {
            //     element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
            //     element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;

            // });

            that.imageAssets = selection;
        }).catch(function(e) {

            console.log(e);
        });
    }
}
