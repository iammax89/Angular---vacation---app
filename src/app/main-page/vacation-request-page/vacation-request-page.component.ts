import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { TeamService } from "src/app/common/services/team.service";
import { Employee } from "src/app/common/models";
import { EmployeeService } from "src/app/common/services/employee.service";

@Component({
  selector: "app-vacation-request-page",
  templateUrl: "./vacation-request-page.component.html",
  styleUrls: ["./vacation-request-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationRequestPageComponent implements OnInit {
  id: string;
  employee$: Observable<Employee>;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    this.employee$ = this.employeeService.fetchEmployee(this.id);
  }
}
