import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddNewEmployeePageComponent } from "./add-new-employee-page.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from 'src/app/common/material/material.module';

@NgModule({
  declarations: [AddNewEmployeePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [AddNewEmployeePageComponent]
})
export class AddNewEmployeePageModule {}
