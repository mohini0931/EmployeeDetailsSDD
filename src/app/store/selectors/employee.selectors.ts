import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EmployeeState } from '../reducers/employee.reducer';

// Selector to select the employee feature state
export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

// Selector to get all employees from the employee state
export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.employees // Returns the employees array
);

// Selector to get the total number of employees from the employee state
export const selectTotalEmployees = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.total // Returns the total count of employees
);

// Selector to get an employee by ID
export const selectEmployeeById = (id: number | null) => createSelector(
  selectAllEmployees,
  (employees) => {
    // Filters employees by matching ID and returns the first match or undefined
    const filteredEmployees = employees.filter(employee => Number(employee.id) === id);
    const employee = filteredEmployees.length ? filteredEmployees[0] : undefined;
    console.log(`Selector - Employee with id ${id}:`, employee);
    return employee;
  }
);
