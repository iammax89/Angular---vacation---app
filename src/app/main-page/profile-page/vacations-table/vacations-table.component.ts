import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit
} from "@angular/core";
import { Observable } from "rxjs";
import { VacationService } from "src/app/common/services/vacation.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-vacations-table",
  templateUrl: "./vacations-table.component.html",
  styleUrls: ["./vacations-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationsTableComponent implements OnInit {
  @Input() id: string;
  vacations$: Observable<any[]>;
  displayedColumns: string[] = [
    "dates",
    "description",
    "status",
    "vacation balance"
  ];
  constructor(private vacationService: VacationService) {}
  ngOnInit(): void {
    this.vacations$ = this.vacationService
      .fetchVavactionsForEmployee(this.id)
      .pipe(
        map(vacations => {
          const vacationRqsts = [];
          vacations.forEach(vacation => {
            vacationRqsts.push({
              startDate: vacation.startDate,
              endDate: vacation.endDate,
              comment: vacation.comment,
              status: vacation.status,
              dayRange: this.vacationService.vacationDaysDifference(
                vacation.startDate,
                vacation.endDate
              )
            });
          });
          return vacationRqsts;
        })
      );
  }
}
