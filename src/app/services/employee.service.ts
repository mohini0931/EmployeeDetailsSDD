import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    { id: 1, name: 'Thomas Hardy', email: 'thomashardy@mail.com', address: '89 Chiaroscuro Rd, Portland, USA', phone: '(171) 555-2222' },
    { id: 2, name: 'Dominique Perrier', email: 'dominiqueperrier@mail.com', address: 'Obere Str. 57, Berlin, Germany', phone: '(313) 555-5735' },
    { id: 3, name: 'Maria Anders', email: 'mariaanders@mail.com', address: '25, rue Lauriston, Paris, France', phone: '(503) 555-9931' },
    { id: 4, name: 'Fran Wilson', email: 'franwilson@mail.com', address: 'C/ Araquil, 67, Madrid, Spain', phone: '(204) 619-5731' },
    { id: 5, name: 'Martin Blank', email: 'martinblank@mail.com', address: 'Via Monte Bianco 34, Turin, Italy', phone: '(480) 631-2097' }
  ];

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    employee.id = Math.max(...this.employees.map(emp => emp.id)) + 1;
    this.employees.push(employee);
    return of(employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const index = this.employees.findIndex(emp => emp.id === employee.id);
    this.employees[index] = employee;
    return of(employee);
  }

  deleteEmployee(id: number): Observable<void> {
    this.employees = this.employees.filter(emp => emp.id !== id);
    return of();
  }
}
