import { Injectable, OnInit } from "@angular/core";
import * as moment from "moment";
import { Vacation, VacationStatusChange } from "../models";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { EventInput } from "@fullcalendar/core";

@Injectable({
  providedIn: "root"
})
export class VacationService {
  changeTeam = new Subject<EventInput[]>();
  constructor(private http: HttpClient) {}

  fetchVacations() {
    return this.http.get<Vacation[]>(
      "https://vacations.polytech.rocks:52540/api/Vacation"
    );
  }
  fetchVacationsPending() {
    return this.http.get<Vacation[]>(
      "https://vacations.polytech.rocks:52540/api/Vacation/pending"
    );
  }
  fetchVavactionsForEmployee(id: string) {
    return this.http.get<Vacation[]>(
      `https://vacations.polytech.rocks:52540/api/Vacation/employee/${id}`
    );
  }
  fetchVacationsForTeam(id: string) {
    return this.http.get<Vacation[]>(
      `https://vacations.polytech.rocks:52540/api/Vacation/team/${id}`
    );
  }
  fetchVacationRange(id: string, from: string, to: string) {
    return this.http.get(
      `https://vacations.polytech.rocks:52540/api/Vacation/team/${id}/range/${from}/${to}`
    );
  }

  addVacation(vacation: Vacation) {
    return this.http.post<Vacation>(
      "https://vacations.polytech.rocks:52540/api/Vacation",
      vacation
    );
  }
  statusChnage(vacation, id: string) {
    return this.http
      .put(
        `https://vacations.polytech.rocks:52540/api/Vacation/${id}/status`,
        vacation
      )
      .subscribe(response => console.log(response));
  }
  vacationDaysDifference(from, to) {
    //count amount of days for single vacation
    const start = moment(from);
    const end = moment(to);
    return end.diff(start, "days");
  }
  approvedVacations(id: string) {
    //count all approved vacation for single employee
    return this.fetchVavactionsForEmployee(id).pipe(
      map(vacatios => {
        let approvedVacations = 0;
        vacatios.forEach(vacation => {
          if (vacation.status === 1) {
            approvedVacations += this.vacationDaysDifference(
              vacation.startDate,
              vacation.endDate
            );
          }
        });
        return approvedVacations;
      })
    );
  }
  selectVacationsForTeam(event?: Vacation) {
    this.fetchVacationsForTeam(event.id)
      .pipe(
        map(vacations => {
          const calendarEvents = [];
          vacations.forEach(vacation => {
            return calendarEvents.push({
              title: `${vacation.employee.firstName} ${vacation.employee.surname}`,
              start: vacation.startDate,
              end: vacation.endDate,
              extendedProps: {
                vacation: vacation
              }
            });
          });
          return calendarEvents;
        })
      )
      .subscribe(events => this.changeTeam.next(events));
    //push vacation events for single team to the Subject 'changeTeam'
  }
}
