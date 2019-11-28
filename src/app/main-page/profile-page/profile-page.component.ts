import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Employee, Vacation } from "src/app/common/models";
import { Observable, pipe } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { EmployeeService } from "src/app/common/services/employee.service";
import { VacationService } from "src/app/common/services/vacation.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent implements OnInit {
  id: string;
  employee$: Observable<Employee>;
  vacations$: Observable<Vacation[]>;

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
