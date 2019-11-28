import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { VacationService } from "src/app/common/services/vacation.service";
import { Vacation, Employee } from "src/app/common/models";
import { AuthService } from "src/app/common/services/auth.service";
import { EmployeeService } from "src/app/common/services/employee.service";

@Component({
  selector: "app-vacation-request",
  templateUrl: "./vacation-request.component.html",
  styleUrls: ["./vacation-request.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationRequestComponent implements OnInit, OnDestroy {
  vacation: Vacation;
  employee: Employee;
  teamName: string;
  teamLeader: string;
  form: FormGroup;
  subscribtion: Subscription;
  approverSub: Subscription;
  vacationRange: number;
  status: number;
  approverComment: string;
  approverId: string;
  approver: Employee;
  constructor(
    public dialogRef: MatDialogRef<VacationRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private vacationService: VacationService,
    private auth: AuthService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.approverId = this.auth.helper.decodeToken(this.auth.token).sub;
    this.approverSub = this.employeeService
      .fetchEmployee(this.approverId)
      .subscribe(response => (this.approver = response));
    this.approverComment = "";
    this.vacation = this.data.vacation.vacation;
    this.employee = this.data.vacation.vacation.employee;
    this.teamName = this.data.vacation.vacation.employee.teams;
    this.form = new FormGroup({
      startDate: new FormControl(
        this.data.vacation.startDate,
        Validators.required
      ),
      endDate: new FormControl(this.data.vacation.endDate, Validators.required)
    });
    this.vacationRange = this.vacationService.vacationDaysDifference(
      this.form.value.startDate,
      this.form.value.endDate
    );
    this.subscribtion = this.form.valueChanges.subscribe(change => {
      if (change.startDate && change.endDate) {
        this.vacationRange = this.vacationService.vacationDaysDifference(
          change.startDate,
          change.endDate
        );
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
    this.approverSub.unsubscribe();
  }
  onStatusChnage() {
    const vacationChange = {
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      status: +this.status,
      approverId: this.approverId,
      approver: this.approver,
      approverComment: this.approverComment
    };
    console.log(vacationChange);
    this.vacationService.statusChnage(vacationChange, this.vacation.id);
  }
}
