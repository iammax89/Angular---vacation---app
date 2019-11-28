import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminNavComponent } from "./admin-nav/admin-nav.component";
import { RouterModule, Routes } from "@angular/router";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { VacationRequestPageComponent } from "./vacation-request-page/vacation-request-page.component";
import { AdminNavModule } from "./admin-nav/admin-nav.module";

import { ProfilePageModule } from "./profile-page/profile-page.module";

import { VacationRequestPageModule } from "./vacation-request-page/vacation-request-page.module";
import { EditProfilePageComponent } from "./edit-profile-page/edit-profile-page.component";
import { EditProfilePageModule } from "./edit-profile-page/edit-profile-page.module";
import { AddNewEmployeePageModule } from "./add-new-employee-page/add-new-employee-page.module";
import { AddNewEmployeePageComponent } from "./add-new-employee-page/add-new-employee-page.component";
import { AddNewTeamPageComponent } from "./add-new-team-page/add-new-team-page.component";
import { AddNewTeamPageModule } from "./add-new-team-page/add-new-team-page.module";
import { VacationRequestsListModule } from "./vacation-requests-list/vacation-requests-list.module";
import { VacationRequestsListComponent } from "./vacation-requests-list/vacation-requests-list.component";
import { ListOfEmployeesModule } from "./list-of-employees/list-of-employees.module";
import { ListOfEmployeesComponent } from "./list-of-employees/list-of-employees.component";
import { TeamCalendarComponent } from "./team-calendar/team-calendar.component";
import { TeamCalendarModule } from "./team-calendar/team-calendar.module";
import { TeamsComponent } from "./teams/teams.component";
import { TeamsModule } from "./teams/teams.module";
import { EditTeamComponent } from "./edit-team/edit-team.component";
import { EditTeamModule } from "./edit-team/edit-team.module";
import { AuthGuard } from "../common/services/auth.guard";
import { RoleGuardService } from "../common/services/role-guard.service";

const mainPageRoutes: Routes = [
  {
    path: "",
    component: AdminNavComponent,
    children: [
      {
        path: "employee",
        component: AddNewEmployeePageComponent,
        canActivate: [RoleGuardService]
      },
      {
        path: "team",
        component: AddNewTeamPageComponent,
        canActivate: [RoleGuardService]
      },
      {
        path: "requests",
        component: VacationRequestsListComponent,
        canActivate: [RoleGuardService]
      },
      {
        path: "calendar",
        component: TeamCalendarComponent,
        canActivate: [RoleGuardService]
      },
      {
        path: "employees",
        component: ListOfEmployeesComponent,
        canActivate: [RoleGuardService]
      },
      {
        path: "teams",
        component: TeamsComponent,
        canActivate: [RoleGuardService]
      },
      {
        path: "teams/:id/edit",
        component: EditTeamComponent,
        canActivate: [RoleGuardService]
      },
      {
        path: ":id",
        component: ProfilePageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ":id/request",
        component: VacationRequestPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ":id/edit",
        component: EditProfilePageComponent,
        canActivate: [RoleGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainPageRoutes),
    AdminNavModule,
    ProfilePageModule,
    VacationRequestPageModule,
    EditProfilePageModule,
    AddNewEmployeePageModule,
    AddNewTeamPageModule,
    VacationRequestsListModule,
    ListOfEmployeesModule,
    TeamCalendarModule,
    TeamsModule,
    EditTeamModule
  ]
})
export class MainPageModule {}
