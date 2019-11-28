import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`
        }
      });
    }

    return next.handle(req).pipe(
      tap(() => console.log("intercept")),
      catchError((error: HttpErrorResponse) => {
        console.log("[Interceptor Error]", error);
        if (error.status === 401) {
          this.auth.logOut();
          this.router.navigate(["/login", "main"]);
        }
        return throwError(error);
      })
    );
  }
}
