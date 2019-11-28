import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditTeamComponent } from "./edit-team.component";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/common/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [EditTeamComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [EditTeamComponent]
})
export class EditTeamModule {}
