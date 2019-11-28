import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VacationRequestDashboardComponent } from "./vacation-request-dashboard/vacation-request-dashboard.component";
import { VacationsTableComponent } from "./vacations-table/vacations-table.component";

import { ProfilePageComponent } from "./profile-page.component";
import { RouterModule } from "@angular/router";

import { ProfileCardModule } from "../profile-card/profile-card.module";
import { MaterialModule } from 'src/app/common/material/material.module';

@NgModule({
  declarations: [
    ProfilePageComponent,
    VacationRequestDashboardComponent,
    VacationsTableComponent
  ],
  imports: [CommonModule, ProfileCardModule, RouterModule, MaterialModule],
  exports: [
    VacationRequestDashboardComponent,
    VacationsTableComponent,
    ProfilePageComponent
  ]
})
export class ProfilePageModule {}
