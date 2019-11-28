import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminNavComponent } from "./admin-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { RouterModule } from "@angular/router";
import { MaterialModule } from 'src/app/common/material/material.module';

@NgModule({
  declarations: [AdminNavComponent],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    MaterialModule
  ],
  exports: [AdminNavComponent]
})
export class AdminNavModule {}
