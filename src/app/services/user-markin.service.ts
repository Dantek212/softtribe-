import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../model/user.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserMarkinService {

  private serverUrl = "http://104.211.60.175/softtapi/public/api/markin";

  constructor(
    private http: HttpClient
  ) { }

  markinUser(users: any) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(this.serverUrl, users, {headers: new HttpHeaders()
        .set("Content-Type", "application/json") }).pipe(map((res: User[]) => {
      return res; }))
  }

}
