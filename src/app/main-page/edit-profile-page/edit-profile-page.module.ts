import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditProfilePageComponent } from "./edit-profile-page.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from 'src/app/common/material/material.module';


@NgModule({
  declarations: [EditProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [EditProfilePageComponent]
})
export class EditProfilePageModule {}
