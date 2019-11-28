import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Employee, Vacation } from "src/app/common/models";
import { VacationService } from "src/app/common/services/vacation.service";

@Component({
  selector: "app-vacation-request-form",
  templateUrl: "./vacation-request-form.component.html",
  styleUrls: ["./vacation-request-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationRequestFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  vacationRange = 0;
  subscribtion: Subscription;
  subLeftDays: Subscription;
  daysleft: number;
  @Input() employee: Employee;
  constructor(
    private vacationService: VacationService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subLeftDays = this.vacationService
      .approvedVacations(this.employee.id)
      .subscribe(approvedVacations => {
        this.daysleft = this.employee.balance - approvedVacations;
      });
    this.vacationService.approvedVacations(this.employee.id);
    this.form = new FormGroup({
      startDate: new FormControl("", Validators.required),
      comment: new FormControl(""),
      endDate: new FormControl("", Validators.required)
    });
    this.subscribtion = this.form.valueChanges.subscribe(change => {
      if (change.startDate && change.endDate) {
        this.vacationRange = this.vacationService.vacationDaysDifference(
          change.startDate,
          change.endDate
        );
      }
    });
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
    this.subLeftDays.unsubscribe();
  }
  openSnackBar() {
    this._snackBar.open("Your request has been sent!", null, {
      duration: 2000
    });
  }
  onSubmit() {
    const vacation: Vacation = {
      employeeId: this.employee.id,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      comment: this.form.value.comment,
      approverComment: null,
      approverId: null,
      status: 0,
      statusChangeDate: null,
      createDateTime: new Date(),
      deleted: false,
      employee: this.employee,
      approver: null
    };
    this.vacationService
      .addVacation(vacation)
      .subscribe(response => console.log(response));
    this.openSnackBar();
    this.form.reset();
    this.form.markAsUntouched();
    Object.keys(this.form.controls).forEach(name => {
      let control = this.form.controls[name];
      control.setErrors(null);
    });
  }
}
