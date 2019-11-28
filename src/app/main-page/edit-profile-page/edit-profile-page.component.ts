import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { TeamService } from "src/app/common/services/team.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Employee, Team } from "src/app/common/models";
import { EmployeeService } from "src/app/common/services/employee.service";

@Component({
  selector: "app-edit-profile-page",
  templateUrl: "./edit-profile-page.component.html",
  styleUrls: ["./edit-profile-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfilePageComponent implements OnInit, OnDestroy {
  avatarPreview: string;
  form: FormGroup;
  balance: number[] = [];
  editedEmployee: Employee;
  id: string;
  changes = false;
  profileSubscribtion: Subscription;
  teamMembershipSubscribtion: Subscription;
  formChangesSubscribtion: Subscription;
  subscribtion: Subscription;
  teams$: Observable<Team[]>;
  employee: Employee;
  constructor(
    private route: ActivatedRoute,
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
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    this.subscribtion = this.employeeService
      .fetchEmployee(this.id)
      .subscribe((employee: Employee) => {
        this.employee = employee;
        this.form.patchValue(this.employee);
      });
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
      workEndDate: new FormControl(""),
      teams: new FormControl("")
    });
    this.formChangesSubscribtion = this.form
      .get("teamMemebership")
      .valueChanges.subscribe(changes => {
        if (changes) {
          this.form.get("teams").enable();
        } else {
          this.form.get("teams").disable();
        }
      });
  }
  ngOnDestroy() {
    this.formChangesSubscribtion.unsubscribe();
    this.subscribtion.unsubscribe();
  }
  openSnackBar() {
    this._snackBar.open("Congratulations! Profile has been edited", null, {
      duration: 2000
    });
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
    const editedEmployee: Employee = {
      id: this.employee.id,
      firstName: this.form.value.firstName,
      surname: this.form.value.surname,
      avatar: this.employee.avatar,
      birthdate: this.form.value.birthdate,
      jobTitle: this.form.value.jobTitle,
      workEmail: this.form.value.workEmail,
      email: this.form.value.email,
      phone: this.form.value.phone,
      skype: this.form.value.skype,
      workStartDate: this.form.value.workStartDate,
      isActive: this.form.value.isActive,
      workEndDate: this.form.value.workEndDate,
      deleted: false,
      balance: this.form.value.balance,
      teamId: this.form.value.teams.id,
      teams: [this.form.value.teams]
    };

    this.employeeService.editEmployee(editedEmployee);
    if (editedEmployee.teams) {
      this.teamService.addEmployee(
        editedEmployee.teams[0].id,
        editedEmployee.id,
        editedEmployee
      );
    }
    this.openSnackBar();
  }
}
