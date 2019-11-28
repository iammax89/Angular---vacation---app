import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
} from "@angular/core";
import { Employee } from "src/app/common/models";
import { VacationService } from "src/app/common/services/vacation.service";

@Component({
  selector: "app-days-avaliable-dashboard",
  templateUrl: "./days-avaliable-dashboard.component.html",
  styleUrls: ["./days-avaliable-dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysAvaliableDashboardComponent implements OnInit {
  @Input() employee: Employee;
  daysleft: number;
  constructor(
    private vacationService: VacationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.vacationService
      .approvedVacations(this.employee.id)
      .subscribe(approvedVacations => {
        this.daysleft = this.employee.balance - approvedVacations;
        this.cd.markForCheck();
      });
  }
}
