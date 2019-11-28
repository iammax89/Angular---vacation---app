import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VacationRequestsListComponent } from "./vacation-requests-list.component";
import { VacationRequestComponent } from "./vacation-request/vacation-request.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from 'src/app/common/material/material.module';

@NgModule({
  declarations: [VacationRequestsListComponent, VacationRequestComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  entryComponents: [VacationRequestComponent],
  exports: [VacationRequestsListComponent]
})
export class VacationRequestsListModule {}
