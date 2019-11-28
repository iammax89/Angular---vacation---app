import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, Subscription } from "rxjs";
import { map, shareReplay, switchMap } from "rxjs/operators";
import { AuthService } from "src/app/common/services/auth.service";
import { Router } from "@angular/router";
import { VacationService } from "src/app/common/services/vacation.service";
import { Vacation } from "src/app/common/models";

@Component({
  selector: "app-admin-nav",
  templateUrl: "./admin-nav.component.html",
  styleUrls: ["./admin-nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  id: string;
  vacationsPending$: Observable<Vacation[]>;
  subscrobtion: Subscription;
  sideBar = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private auth: AuthService,
    private router: Router,
    private vacationService: VacationService
  ) {}

  ngOnInit() {
    this.id = this.auth.helper.decodeToken(this.auth.token).sub;
    this.vacationsPending$ = this.vacationService.fetchVacationsPending();
    this.cd.markForCheck();
  }

  logOut() {
    this.auth.logOut();
    this.router.navigate(["/login", "main"]);
  }
}
