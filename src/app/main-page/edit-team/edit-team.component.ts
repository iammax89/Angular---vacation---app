import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { TeamService } from "src/app/common/services/team.service";
import { Employee, Team } from "src/app/common/models";
import { Observable, Subscription } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmployeeService } from "src/app/common/services/employee.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { startWith, map } from "rxjs/operators";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-edit-team",
  templateUrl: "./edit-team.component.html",
  styleUrls: ["./edit-team.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTeamComponent implements OnInit, OnDestroy {
  form: FormGroup;
  employees: Employee[];
  allEmployee: Employee[];
  filteredEmployees: Observable<Employee[]>;
  filteredEmployeesChips: Observable<Employee[]>;
  id: string;
  sub: Subscription;
  subTL: Subscription;
  team: Team;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild("employeeInput", { static: false }) employeeInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("employeeAuto", { static: false })
  matAutocomplete: MatAutocomplete;

  constructor(
    private _snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      teamLeadName: new FormControl(""),
      employees: new FormControl([])
    });
    this.employeeService.fetchEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
      this.cd.markForCheck();
      this.filteredEmployees = this.form.get("teamLeadName").valueChanges.pipe(
        startWith(""),
        map(value => (typeof value === "string" ? value : value.name)),
        map(name => (name ? this._filter(name) : this.employees.slice()))
      );
      this.filteredEmployeesChips = this.form
        .get("employees")
        .valueChanges.pipe(
          startWith(null),
          map((name: string | null) =>
            name ? this._filter(name) : this.employees.slice()
          )
        );
    });

    this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    this.sub = this.teamService.fetchTeam(this.id).subscribe(response => {
      this.team = response;
      this.form.patchValue(this.team);
      this.subTL = this.employeeService
        .fetchEmployee(this.team.teamLeadId)
        .subscribe((response: Employee) => {
          this.form.get("teamLeadName").setValue(response);
          this.cd.markForCheck();
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subTL.unsubscribe();
  }
  displayFn(employee?: Employee): string | undefined {
    return employee ? `${employee.firstName} ${employee.surname}` : undefined;
  }
  add(event: MatChipInputEvent): void {
    // Add employee only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Reset the input value
      if (input) {
        input.value = "";
      }

      this.form.get("employees").setValue(null);
    }
  }
  remove(employee: Employee): void {
    const index = this.team.employees.indexOf(employee);
    this.team.employees.splice(index, 1);
  }
  private _filter(value: string): Employee[] {
    const filterValue = value.toLowerCase();
    if (this.employees) {
      return this.employees.filter((employee: Employee) => {
        if (employee.firstName) {
          return employee.firstName.toLowerCase().includes(filterValue);
        }
      });
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.team.employees.push(event.option.value);
    this.employeeInput.nativeElement.value = "";
    this.form.get("employees").setValue(null);
  }

  openSnackBar() {
    this._snackBar.open("Congratulations! Team has been edited", null, {
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
