import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EmployeeState } from '../reducers/employee.reducer';

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.employees
);

export const selectTotalEmployees = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.total
);

export const selectEmployeeById = (id: number | null) => createSelector(
  selectAllEmployees,
  (employees) => {
    const filteredEmployees = employees.filter(employee => Number(employee.id) === id);
    const employee = filteredEmployees.length ? filteredEmployees[0] : undefined;
    console.log(`Selector - Employee with id ${id}:`, employee);
    return employee;
  }
);