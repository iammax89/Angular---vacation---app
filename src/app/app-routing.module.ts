import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "login/main", pathMatch: "full" },
  {
    path: "main",
    loadChildren: () =>
      import("./main-page/main-page-routing.module").then(m => m.MainPageModule)
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
