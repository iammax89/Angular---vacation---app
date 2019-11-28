import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/common/services/auth.service";
import { ResetPassword } from "src/app/common/models";

@Component({
  selector: "app-password-reminder",
  templateUrl: "./password-reminder.component.html",
  styleUrls: ["./password-reminder.component.scss"]
})
export class PasswordReminderComponent implements OnInit {
  form: FormGroup;
  sent: boolean = false;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  goBack() {
    this.router.navigate(["../login/main"]);
  }

  submit() {
    this.sent = true;
    const body: ResetPassword = {
      email: this.form.value.email,
      date: new Date()
    };
    this.auth.onforgotPassword(body);
  }
}
