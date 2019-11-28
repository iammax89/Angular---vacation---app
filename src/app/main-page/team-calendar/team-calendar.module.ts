import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TeamCalendarComponent } from "./team-calendar.component";
import { FullCalendarModule } from "@fullcalendar/angular";

import { VacationRequestComponent } from "./vacation-request/vacation-request.component";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { NgSelectModule } from "@ng-select/ng-select";
import { MaterialModule } from "src/app/common/material/material.module";
@NgModule({
  declarations: [TeamCalendarComponent, VacationRequestComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    MaterialModule
  ],
  entryComponents: [VacationRequestComponent],
  exports: [TeamCalendarComponent]
})
export class TeamCalendarModule {}
