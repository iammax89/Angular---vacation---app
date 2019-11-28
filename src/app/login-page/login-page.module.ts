import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { PasswordReminderComponent } from "./password-reminder/password-reminder.component";
import { BackgroundFormComponent } from "./background-form/background-form.component";
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../common/material/material.module';

const loginRoutes: Routes = [
  {
    path: "login",
    component: BackgroundFormComponent,
    children: [
      { path: "main", component: LoginComponent },
      { path: "password", component: PasswordReminderComponent }
    ]
  }
];

@NgModule({
  declarations: [
    BackgroundFormComponent,
    LoginComponent,
    PasswordReminderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class LoginPageModule {}
