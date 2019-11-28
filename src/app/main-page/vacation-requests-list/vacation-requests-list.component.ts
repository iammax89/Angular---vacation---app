import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { VacationRequestComponent } from "./vacation-request/vacation-request.component";
import { Subscription } from "rxjs";
import { VacationService } from "src/app/common/services/vacation.service";
import { Vacation } from "src/app/common/models";
import { map } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-vacation-requests-list",
  templateUrl: "./vacation-requests-list.component.html",
  styleUrls: ["./vacation-requests-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationRequestsListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    "name",
    "team",
    "vacation dates",
    "amount of days",
    "vacation balance",
    "status"
  ];
  sub: Subscription;
  dataSource = new MatTableDataSource<Vacation>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private vacationService: VacationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.sub = this.vacationService
      .fetchVacations()
      .pipe(
        map(vacations => {
          const allVacations = [];
          vacations.forEach(vacation => {
            allVacations.push({
              name: `${vacation.employee.firstName} ${vacation.employee.surname}`,
              team: `${vacation.employee.teams}`,
              startDate: vacation.startDate,
              endDate: vacation.endDate,
              amount: this.vacationService.vacationDaysDifference(
                vacation.startDate,
                vacation.endDate
              ),
              balance: vacation.employee.balance,
              status: vacation.status,
              vacation: vacation
            });
          });
          return allVacations;
        })
      )
      .subscribe(vacations => (this.dataSource.data = vacations));
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  openDialog(vacation: any): void {
    const dialogRef = this.dialog.open(VacationRequestComponent, {
      width: "460px",
      data: { vacation: vacation }
    });
  }
}
