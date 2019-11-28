import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "../models";

@Pipe({
  name: "statusFilter"
})
export class StatusFilterPipe implements PipeTransform {
  transform(employees: Employee[], status: string): any {
    if (!status || status === "all") {
      // Option to disply all employees.
      return employees;
    }
    return employees.filter(employee =>
      status === "active" ? employee.isActive : !employee.isActive
    );
  }
}
