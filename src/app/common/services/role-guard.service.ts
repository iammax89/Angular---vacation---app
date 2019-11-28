import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      !this.auth.isAuthenticated() ||
      this.auth.tokenData.role !== "Administrator"
    ) {
      this.auth.logOut();
      this.router.navigate(["/login", "main"], {
        queryParams: {
          notAuthorized: true
        }
      });
      return false;
    }
    return true;
  }
}
