import { createAction, props } from '@ngrx/store';
import { Employee } from '../../models/employee.model';

export const loadEmployees = createAction('[Employee List] Load Employees');

export const loadEmployeesSuccess = createAction(
  '[Employee List] Load Employees Success',
  props<{ employees: Employee[] }>()
);

export const loadEmployeesFailure = createAction(
  '[Employee List] Load Employees Failure',
  props<{ error: any }>()
);

export const addEmployee = createAction(
  '[Employee List] Add Employee',
  props<{ employee: Employee }>()
);

export const addEmployeeSuccess = createAction(
  '[Employee List] Add Employee Success',
  props<{ employee: Employee }>()
);

export const addEmployeeFailure = createAction(
  '[Employee List] Add Employee Failure',
  props<{ error: any }>()
);

export const updateEmployee = createAction(
  '[Employee List] Update Employee',
  props<{ employee: Employee }>()
);

export const updateEmployeeSuccess = createAction(
  '[Employee List] Update Employee Success',
  props<{ employee: Employee }>()
);

export const updateEmployeeFailure = createAction(
  '[Employee List] Update Employee Failure',
  props<{ error: any }>()
);

export const deleteEmployee = createAction(
  '[Employee List] Delete Employee',
  props<{ id: number }>()
);

export const deleteEmployeeSuccess = createAction(
  '[Employee List] Delete Employee Success',
  props<{ id: number }>()
);

export const deleteEmployeeFailure = createAction(
  '[Employee List] Delete Employee Failure',
  props<{ error: any }>()
);
