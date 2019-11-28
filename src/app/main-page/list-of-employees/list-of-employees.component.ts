import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";

import { Team } from "src/app/common/models";

import { TeamService } from "src/app/common/services/team.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";

@Component({
  selector: "app-list-of-employees",
  templateUrl: "./list-of-employees.component.html",
  styleUrls: ["./list-of-employees.component.scss"]
})
export class ListOfEmployeesComponent implements OnInit, AfterViewInit {
  search: "";
  sort_by: "";
  status: string;
  teamColumns: string[] = ["name"];
  subscribtion: Subscription;
  profileColumns: string[] = [
    "name",
    "phone number",
    "work email",
    "vacation balance",
    "view/edit"
  ];
  dataSource = new MatTableDataSource<Team>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.subscribtion = this.teamService
      .fetchTeams()
      .subscribe((teams: Team[]) => (this.dataSource.data = teams));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  sort(sort_by) {
    for (const team of this.dataSource.data) {
      team.employees = [...team.employees].sort((a, b) => {
        if (a[sort_by] > b[sort_by]) return 1;
        if (a[sort_by] < b[sort_by]) return -1;
        return 0;
      });
    }
  }
  sortTeam(sort_by) {
    this.dataSource.data = [...this.dataSource.data].sort((a, b) => {
      if (a[sort_by] > b[sort_by]) return 1;
      if (a[sort_by] < b[sort_by]) return -1;
      return 0;
    });
  }
}
