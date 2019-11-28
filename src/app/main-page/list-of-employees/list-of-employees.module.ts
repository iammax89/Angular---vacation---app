import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListOfEmployeesComponent } from "./list-of-employees.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StatusFilterPipe } from "src/app/common/pipes/status-filter.pipe";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from 'src/app/common/material/material.module';

@NgModule({
  declarations: [ListOfEmployeesComponent, StatusFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ],
  exports: [ListOfEmployeesComponent]
})
export class ListOfEmployeesModule {}
