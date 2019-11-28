import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef
} from "@angular/core";
import { TeamService } from "src/app/common/services/team.service";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Subscription, Observable } from "rxjs";
import { EventInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { MatDialog } from "@angular/material/dialog";
import { VacationRequestComponent } from "./vacation-request/vacation-request.component";
import { Team, Vacation } from "src/app/common/models";
import { VacationService } from "src/app/common/services/vacation.service";

@Component({
  selector: "app-team-calendar",
  templateUrl: "./team-calendar.component.html",
  styleUrls: ["./team-calendar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamCalendarComponent implements OnInit, OnDestroy, AfterViewInit {
  teams$: Observable<Team[]>;
  vacations: Vacation;
  teamSubscribtion: Subscription;
  eventSubscribtion: Subscription;
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  calendarEvents: EventInput[];
  @ViewChild("calendar", { static: false })
  calendarComponent: FullCalendarComponent;
  constructor(
    private teamService: TeamService,
    private cd: ChangeDetectorRef,
    private vacationService: VacationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.teams$ = this.teamService.fetchTeams();
    // Subscribe for Subject with calendarEvents for each team.
    this.teamSubscribtion = this.vacationService.changeTeam.subscribe(
      teamEvents => {
        this.calendarEvents = teamEvents;
        this.cd.markForCheck();
      }
    );
  }
  ngAfterViewInit(): void {
    this.eventSubscribtion = this.calendarComponent.eventClick.subscribe(
      data => {
        this.openDialog(data);
      }
    );
  }
  ngOnDestroy() {
    this.eventSubscribtion.unsubscribe();
    this.teamSubscribtion.unsubscribe();
  }
  openDialog(vacation: any): void {
    const dialogRef = this.dialog.open(VacationRequestComponent, {
      width: "460px",
      data: { vacation: vacation }
    });
  }
  selectVacationsForTeam(event) {
    // making get response to receive Vacation[] for each team.
    return this.vacationService.selectVacationsForTeam(event);
  }
}
