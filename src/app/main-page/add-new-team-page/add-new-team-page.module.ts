import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddNewTeamPageComponent } from "./add-new-team-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from 'src/app/common/material/material.module';

@NgModule({
  declarations: [AddNewTeamPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ],
  exports: [AddNewTeamPageComponent]
})
export class AddNewTeamPageModule {}
