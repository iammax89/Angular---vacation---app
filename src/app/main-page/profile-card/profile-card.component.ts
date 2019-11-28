import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { Employee } from "src/app/common/models";
import { EmployeeService } from "src/app/common/services/employee.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-profile-card",
  templateUrl: "./profile-card.component.html",
  styleUrls: ["./profile-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent implements OnInit, OnDestroy {
  @Input() employee: Employee;
  teamLeads: Employee[] = [];
  sub: Subscription;
  constructor(
    private employeeService: EmployeeService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    for (const team of this.employee.teams) {
      this.sub = this.employeeService
        .fetchEmployee(team.teamLeadId)
        .subscribe((teamlead: Employee) => {
          this.teamLeads.push(teamlead);
          this.cd.markForCheck();
        });
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
