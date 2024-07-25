import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import * as EmployeeActions from '../actions/employee.actions';

export interface EmployeeState {
  employees: Employee[];
  total: number;
}

const initialState: EmployeeState = {
  employees: [
    { id: 1, name: 'Thomas Hardy', email: 'thomashardy@mail.com', address: '89 Chiaroscuro Rd, Portland, USA', phone: '(171) 555-2222' },
    { id: 2, name: 'Dominique Perrier', email: 'dominiqueperrier@mail.com', address: 'Obere Str. 57, Berlin, Germany', phone: '(313) 555-5735' },
    { id: 3, name: 'Maria Anders', email: 'mariaanders@mail.com', address: '25, rue Lauriston, Paris, France', phone: '(503) 555-9931' },
    { id: 4, name: 'Fran Wilson', email: 'franwilson@mail.com', address: 'C/ Araquil, 67, Madrid, Spain', phone: '(204) 619-5731' },
    { id: 5, name: 'Martin Blank', email: 'martinblank@mail.com', address: 'Via Monte Bianco 34, Turin, Italy', phone: '(480) 631-2097' }
  ],
  total: 5
};

const _employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadEmployees, state => state),
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
