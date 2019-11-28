import { Injectable } from "@angular/core";
import { Employee } from "src/app/common/models";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  employees$: Observable<Employee[]>;
  employee$: Observable<Employee>;

  constructor(private http: HttpClient) {
    this.fetchEmployees();
  }

  fetchEmployees() {
    return this.http.get<Employee[]>(
      "https://vacations.polytech.rocks:52540/api/Employee/all"
    );
  }
  fetchEmployee(id: string) {
    return (this.employee$ = this.http.get<Employee>(
      `https://vacations.polytech.rocks:52540/api/Employee/${id}`
    ));
  }

  addEmployee(employee: Employee) {
    return this.http
      .post<Employee>(
        "https://vacations.polytech.rocks:52540/api/Employee",
        employee
      )
      .subscribe(response => console.log(response));
  }

  editEmployee(employee: Employee) {
    return this.http
      .put<Employee>(
        "https://vacations.polytech.rocks:52540/api/Employee",
        employee
      )
      .subscribe(response => console.log(response));
  }
  addAvatar(avatar: File) {
    return this.http.post("http://localhost:5000/", avatar);
  }
}
