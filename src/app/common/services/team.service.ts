import { Injectable } from "@angular/core";
import { Team, Employee } from "../models";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TeamService {
  constructor(private http: HttpClient) {}

  fetchTeams() {
    return this.http.get<Team[]>(
      "https://vacations.polytech.rocks:52540/api/Team/all"
    );
  }

  fetchTeam(id: string) {
    return this.http.get<Team>(
      `https://vacations.polytech.rocks:52540/api/Team/${id}`
    );
  }
  addTeam(team: Team) {
    this.http
      .post("https://vacations.polytech.rocks:52540/api/Team", team)
      .subscribe(response => {
        console.log(response);
      });
  }
  addEmployee(id: string, employeeId: string, employee: Employee) {
    this.http
      .post(
        `https://vacations.polytech.rocks:52540/api/Team/${id}/user/${employeeId}/add`,
        employee
      )
      .subscribe(response => console.log(response));
  }
}
