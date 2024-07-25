import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import * as EmployeeActions from '../actions/employee.actions';

export interface EmployeeState {
  employees: Employee[];
  total: number;
}

const initialState: EmployeeState = {
  employees: [],
  total: 0
};

const _employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    total: employees.length
  })),
  on(EmployeeActions.addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    total: state.total + 1
  })),
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: state.employees.map(emp => emp.id === employee.id ? employee : emp)
  })),
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    employees: state.employees.filter(emp => emp.id !== id),
    total: state.total - 1
  }))
);

export function employeeReducer(state: EmployeeState | undefined, action: any) {
  return _employeeReducer(state, action);
}
