import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TeamsComponent } from "./teams.component";
import { RouterModule } from "@angular/router";
import { MaterialModule } from 'src/app/common/material/material.module';

@NgModule({
  declarations: [TeamsComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [TeamsComponent]
})
export class TeamsModule {}
