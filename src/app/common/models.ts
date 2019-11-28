export interface Team {
  id?: string;
  name: string;
  teamLeadId: string;
  deleted: boolean;
  teamLeadName: string;
  employeeCount: number;
  employees: Employee[];
}
export interface Employee {
  id?: string;
  firstName: string;
  surname: string;
  avatar: string;
  birthdate: Date;
  jobTitle: string;
  workEmail: string;
  email: string;
  phone: string;
  skype: string;
  workStartDate: Date;
  isActive: boolean;
  workEndDate: Date;
  deleted: boolean;
  balance: number;
  teamId: string;
  teams: Team[];
}

export interface Vacation {
  id?: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  comment: string;
  approverComment: string;
  approverId: string;
  status: Status;
  statusChangeDate: Date;
  createDateTime: Date;
  deleted: boolean;
  employee: Employee;
  approver: Employee;
}
export interface VacationStatusChange {
  approverComment: string;
  status: Status;
}
enum Status {
  Pending = 0,
  Approved = 1,
  Denied = 2
}
export interface VacationStatusChange {
  approverComment: string;
  status: Status;
}
export interface ResetPassword {
  email: string;
  date: Date;
}
