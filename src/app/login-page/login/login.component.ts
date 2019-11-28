import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/common/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submited = false;
  message: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params["notAuthorized"]) {
        this.message = "Your account is not authorized to access this route.";
        this.cd.markForCheck();
      }
    });
    this.auth.tokenData;
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7)
      ])
    });
  }
  toPassReminder() {
    this.router.navigate(["/login/password"], { relativeTo: this.route });
  }

  submit() {
    this.submited = true;
    const login = {
      email: this.form.get("email").value,
      password: this.form.get("password").value
    };
    this.auth.logIn(login).subscribe(response => {
      const id = this.auth.getId(response);
      this.router.navigate(["../main", `${id}`]);
    });
    this.form.reset();
    this.form.markAsUntouched();
    Object.keys(this.form.controls).forEach(name => {
      let control = this.form.controls[name];
      control.setErrors(null);
    });

    this.submited = false;
  }
}
