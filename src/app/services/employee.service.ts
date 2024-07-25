import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return of([...this.employees]);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const newEmployee = {
      ...employee,
      id: this.employees.length + 1
    };
    this.employees = [...this.employees, newEmployee];
    return of(newEmployee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const index = this.employees.findIndex(emp => emp.id === employee.id);
    if (index >= 0) {
      this.employees = [
        ...this.employees.slice(0, index),
        employee,
        ...this.employees.slice(index + 1)
      ];
    }
    return of(employee);
  }

  deleteEmployee(id: number): Observable<Employee[]> {
    this.employees = this.employees.filter(emp => emp.id !== id);
    return of(this.employees);
  }
}
