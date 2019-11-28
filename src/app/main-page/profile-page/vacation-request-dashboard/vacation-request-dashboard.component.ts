import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
} from "@angular/core";
import { Employee } from "src/app/common/models";
import { VacationService } from "src/app/common/services/vacation.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-vacation-request-dashboard",
  templateUrl: "./vacation-request-dashboard.component.html",
  styleUrls: ["./vacation-request-dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationRequestDashboardComponent implements OnInit {
  @Input() employee: Employee;
  daysLeft: number;
  private sub: Subscription;
  constructor(
    private vacationService: VacationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.vacationService
      .approvedVacations(this.employee.id)
      .subscribe(approvedVacations => {
        this.daysLeft = this.employee.balance - approvedVacations;
        this.cd.markForCheck();
      });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
