import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { RegisRoutingModule } from "./regis-routing.module";
import { RegisComponent } from "./regis.component";

@NgModule({
    imports: [
        NativeScriptModule,
        RegisRoutingModule
    ],
    declarations: [
        RegisComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RegisModule { }
