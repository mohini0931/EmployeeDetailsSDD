import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private employeeSubject = new BehaviorSubject<Employee | null>(null);
  employee$ = this.employeeSubject.asObservable();

  setEmployee(employee: Employee | null) {
    this.employeeSubject.next(employee);
  }

  private apiUrl = 'http://localhost:3000/employees';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${employee.id}`,
      employee,
      this.httpOptions
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  logout() {
    // Clear any stored user data
    this.setEmployee(null);
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
