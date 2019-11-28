import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VacationRequestPageComponent } from "./vacation-request-page.component";
import { DaysAvaliableDashboardComponent } from "./days-avaliable-dashboard/days-avaliable-dashboard.component";
import { VacationRequestFormComponent } from "./vacation-request-form/vacation-request-form.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { ProfileCardModule } from "../profile-card/profile-card.module";
import { MaterialModule } from "src/app/common/material/material.module";

@NgModule({
  declarations: [
    VacationRequestPageComponent,
    DaysAvaliableDashboardComponent,
    VacationRequestFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ProfileCardModule,
    MaterialModule
  ],
  exports: [
    VacationRequestPageComponent,
    DaysAvaliableDashboardComponent,
    VacationRequestFormComponent
  ]
})
export class VacationRequestPageModule {}
