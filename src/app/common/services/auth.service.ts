import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { logIn } from "src/environments/interface";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ResetPassword } from "../models";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  helper = new JwtHelperService();
  tokenData: any;
  constructor(private http: HttpClient) {}

  get token(): string {
    const exsDate = new Date(localStorage.getItem("token-exs"));
    return localStorage.getItem("token");
  }

  logIn(login: logIn): Observable<any> {
    const formData = new FormData();
    formData.append("username", login.email);
    formData.append("password", login.password);
    formData.append("client_id", "api");
    formData.append("client_secret", "vacationsecrets");
    formData.append("grant_type", "password");
    return this.http
      .post("https://vacations.polytech.rocks:52540/connect/token", formData)
      .pipe(
        map(response => {
          this.setToken(response);
          return response;
        })
      );
  }

  logOut() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
  getId(response) {
    return this.helper.decodeToken(response.access_token).sub;
  }
  private setToken(response: any | null) {
    if (response) {
      this.tokenData = this.helper.decodeToken(response.access_token);
      console.log(this.tokenData);
      const expDate = new Date(
        new Date().getTime() + +response.expires_in * 1000
      );
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("token-exs", expDate.toString());
    } else localStorage.clear();
  }
  onforgotPassword(body: ResetPassword) {
    this.http
      .post(
        "https://vacations.polytech.rocks:52540/api/auth/forgotPassword",
        body
      )
      .subscribe(response => console.log(response));
  }
}
