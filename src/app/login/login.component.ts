import { RouterExtensions } from "nativescript-angular/router";
import { UserLoginService } from "./../services/user-login.service";
import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { setString } from "tns-core-modules/application-settings";
import { User } from "../model/user.model";
@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.css"],
    providers: [UserLoginService]
})
export class LoginComponent implements OnInit {
    message: any;
    errmsg: string;
    uemail: any;
    upass: string = "";
    user: User[] = [];
    constructor(private page: Page, private userLoginService: UserLoginService,
                private routerExtensions: RouterExtensions) {
        this.page.actionBarHidden = true;
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    usercheck(user: any , check: any) {
        // console.log(this.user);
        if (user == check) {

          setString("userId", this.userdata.email);

          // tslint:disable-next-line: ban-comma-operator
          this.routerExtensions.navigate(["../home"]), {clearHistory : true};
      } else {

        // tslint:disable-next-line: ban-comma-operator
        this.routerExtensions.back(), {clearHistory : true};
        this.errmsg = "Invalid username or password !";
       }
      }

    userdata= {"email":"","password": "" };

    loginUser() {
        this.userLoginService.loginUser(this.userdata).subscribe((res) => {
                // this.message = res;
               this.user = res;
            console.log (this.user['data']['email']);
            this.usercheck(this.user['data']['email'], this.userdata.email);

            })

        }
    public showAlert(value1, value2) {

            this.userdata.email = value1;
            this.userdata.password = value2;

            if (this.userdata.email == null || this.userdata.password == null){
                this.errmsg = "Fill in the blank field";
            }
            this.loginUser();

        }
}
