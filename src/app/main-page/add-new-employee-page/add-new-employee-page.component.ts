import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { TeamService } from "src/app/common/services/team.service";
import { Team, Employee } from "src/app/common/models";

import { MatSnackBar } from "@angular/material/snack-bar";
import { EmployeeService } from "src/app/common/services/employee.service";
@Component({
  selector: "app-add-new-employee-page",
  templateUrl: "./add-new-employee-page.component.html",
  styleUrls: ["./add-new-employee-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewEmployeePageComponent implements OnInit {
  form: FormGroup;
  avatarPreview: string;
  balance: number[] = [];
  subscribtion: Subscription;
  teams$: Observable<Team[]>;
  id: string;
  checked = false;
  constructor(
    private teamService: TeamService,
    private _snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private cd: ChangeDetectorRef
  ) {
    for (let i = 1; i <= 30; i++) {
      this.balance.push(i);
    }
  }

  ngOnInit() {
    this.teams$ = this.teamService.fetchTeams();
    this.form = new FormGroup({
      avatar: new FormControl(null),
      firstName: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      jobTitle: new FormControl("", Validators.required),
      isActive: new FormControl("", Validators.required),
      balance: new FormControl("", Validators.required),
      birthdate: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      workEmail: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", Validators.required),
      skype: new FormControl("", Validators.required),
      teamMemebership: new FormControl(false),
      workStartDate: new FormControl("", Validators.required),
      teams: new FormControl({ value: "", disabled: true })
    });
    this.form.get("teamMemebership").valueChanges.subscribe(changes => {
      if (changes) {
        this.form.get("teams").enable();
      } else {
        this.form.get("teams").disable();
      }
    });
  }

  openSnackBar() {
    this._snackBar.open(
      "Congratulations! New employee has been created",
      null,
      {
        duration: 2000
      }
    );
  }
  onAvatarPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ avatar: file });
    this.form.get("avatar").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = reader.result as string;
      this.cd.markForCheck();
      console.log(this.form.value.avatar);
    };
    reader.readAsDataURL(file);
  }
  submit() {
    const employee: Employee = {
      firstName: this.form.value.firstName,
      surname: this.form.value.surname,
      avatar: this.form.value.avatar,
      birthdate: this.form.value.birthdate,
      jobTitle: this.form.value.jobTitle,
      workEmail: this.form.value.workEmail,
      email: this.form.value.email,
      phone: this.form.value.phone,
      skype: this.form.value.skype,
      workStartDate: this.form.value.workStartDate,
      isActive: this.form.value.isActive,
      workEndDate: null,
      deleted: false,
      balance: this.form.value.balance,
      teamId: this.form.value.teams.id,
      teams: this.form.value.teams
    };
    this.employeeService.addEmployee(employee);
    this.openSnackBar();
    this.form.reset();
    this.form.markAsUntouched();
    Object.keys(this.form.controls).forEach(name => {
      let control = this.form.controls[name];
      control.setErrors(null);
    });
  }
}
