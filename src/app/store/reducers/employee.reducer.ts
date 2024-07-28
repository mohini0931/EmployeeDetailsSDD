import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import * as EmployeeActions from '../actions/employee.actions';

// Interface defining the shape of the employee state
export interface EmployeeState {
  employees: Employee[]; 
  total: number; 
}

// Initial state for the employee store
const initialState: EmployeeState = {
  employees: [], 
  total: 0 
};

// Private reducer function created using createReducer
const _employeeReducer = createReducer(
  initialState, 
  // Handler for loadEmployeesSuccess action
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state, // Spread the existing state
    employees, // Set the employees array from the action payload
    total: employees.length // Set the total to the length of the employees array
  })),
  // Handler for addEmployeeSuccess action
  on(EmployeeActions.addEmployeeSuccess, (state, { employee }) => ({
    ...state, // Spread the existing state
    employees: [...state.employees, employee], // Add the new employee to the employees array
    total: state.total + 1 // Increment the total by 1
  })),
  // Handler for updateEmployeeSuccess action
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
    ...state, // Spread the existing state
    employees: state.employees.map(emp => emp.id === employee.id ? employee : emp) // Update the employee in the employees array
  })),
  // Handler for deleteEmployeeSuccess action
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({
    ...state, // Spread the existing state
    employees: state.employees.filter(emp => emp.id !== id), // Remove the employee with the given id
    total: state.total - 1 // Decrement the total by 1
  }))
);

// Exported reducer function to be used in the store
export function employeeReducer(state: EmployeeState | undefined, action: any) {
  return _employeeReducer(state, action);
}
