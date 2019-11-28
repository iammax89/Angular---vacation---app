import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from "@angular/core";
import { TeamService } from "src/app/common/services/team.service";
import { MatTableDataSource } from "@angular/material/table";
import { Team } from "src/app/common/models";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsComponent implements OnInit {
  dataSource = new MatTableDataSource<Team>();
  displayedColumns: string[] = [
    "team name",
    "team leader",
    "amount of employees",
    "view/edit"
  ];
  subscribtion: Subscription;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private teamService: TeamService) {}

  ngOnInit() {
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
}
