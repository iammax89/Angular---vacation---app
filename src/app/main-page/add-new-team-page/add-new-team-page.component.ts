import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Employee, Team } from "src/app/common/models";
import { EmployeeService } from "src/app/common/services/employee.service";
import { TeamService } from "src/app/common/services/team.service";

@Component({
  selector: "app-add-new-team-page",
  templateUrl: "./add-new-team-page.component.html",
  styleUrls: ["./add-new-team-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewTeamPageComponent implements OnInit {
  form: FormGroup;
  employees$: Observable<Employee[]>;
  constructor(
    private _snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.employees$ = this.employeeService.fetchEmployees();
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      teamLeadName: new FormControl(""),
      employees: new FormControl([])
    });
  }
  openSnackBar() {
    this._snackBar.open("Congratulations! New team has been added", null, {
      duration: 2000
    });
  }
  submit() {
    const team: Team = {
      name: this.form.value.name,
      teamLeadId: this.form.value.teamLeadName.id,
      deleted: false,
      teamLeadName: `${this.form.value.teamLeadName.firstName} ${this.form.value.teamLeadName.surname}`,
      employeeCount: this.form.value.employees.length,
      employees: this.form.value.employees
    };
    this.teamService.addTeam(team);
    this.openSnackBar();
    this.form.reset();
    this.form.markAsUntouched();
    Object.keys(this.form.controls).forEach(name => {
      let control = this.form.controls[name];
      control.setErrors(null);
    });
  }
}
