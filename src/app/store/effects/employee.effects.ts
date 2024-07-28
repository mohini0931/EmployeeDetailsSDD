import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EmployeeService } from '../../services/employee.service';
import * as EmployeeActions from '../actions/employee.actions';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions, // Injecting the Actions observable to listen for dispatched actions
    private employeeService: EmployeeService // Injecting the EmployeeService to perform API calls
  ) {}

  // Effect to load employees
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees), // Listening for the loadEmployees action
      mergeMap(() =>
        this.employeeService.getEmployees().pipe( // Calling the getEmployees method of the EmployeeService
          map(employees => EmployeeActions.loadEmployeesSuccess({ employees })), // Dispatching loadEmployeesSuccess action with the loaded employees
          catchError(error => of(EmployeeActions.loadEmployeesFailure({ error }))) // Handling errors and dispatching loadEmployeesFailure action
        )
      )
    )
  );

  // Effect to add a new employee
  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee), // Listening for the addEmployee action
      mergeMap(action =>
        this.employeeService.addEmployee(action.employee).pipe( // Calling the addEmployee method of the EmployeeService with the new employee data
          map(employee => EmployeeActions.addEmployeeSuccess({ employee })), // Dispatching addEmployeeSuccess action with the added employee
          catchError(error => of(EmployeeActions.addEmployeeFailure({ error }))) // Handling errors and dispatching addEmployeeFailure action
        )
      )
    )
  );

  // Effect to update an existing employee
  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee), // Listening for the updateEmployee action
      mergeMap(action =>
        this.employeeService.updateEmployee(action.employee).pipe( // Calling the updateEmployee method of the EmployeeService with the updated employee data
          map(employee => EmployeeActions.updateEmployeeSuccess({ employee })), // Dispatching updateEmployeeSuccess action with the updated employee
          catchError(error => of(EmployeeActions.updateEmployeeFailure({ error }))) // Handling errors and dispatching updateEmployeeFailure action
        )
      )
    )
  );

  // Effect to delete an employee
  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee), // Listening for the deleteEmployee action
      mergeMap(action =>
        this.employeeService.deleteEmployee(action.id).pipe( // Calling the deleteEmployee method of the EmployeeService with the employee ID
          map(() => EmployeeActions.deleteEmployeeSuccess({ id: action.id })), // Dispatching deleteEmployeeSuccess action with the deleted employee ID
          catchError(error => of(EmployeeActions.deleteEmployeeFailure({ error }))) // Handling errors and dispatching deleteEmployeeFailure action
        )
      )
    )
  );
}
