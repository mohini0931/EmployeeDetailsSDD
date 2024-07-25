import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { AppState } from '../../store/app.state';
import { loadEmployees, deleteEmployee } from '../../store/actions/employee.actions';
import { selectAllEmployees, selectTotalEmployees } from '../../store/selectors/employee.selectors';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'name', 'email', 'address', 'phone', 'actions'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  totalEmployees$: Observable<number>;
  selection = new SelectionModel<Employee>(true, []);
  showAddForm = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store<AppState>) {
    this.totalEmployees$ = this.store.select(selectTotalEmployees);
  }

  ngOnInit(): void {
    this.store.dispatch(loadEmployees());
    this.store.select(selectAllEmployees).subscribe(employees => {
      this.dataSource.data = employees;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.totalEmployees$.subscribe(total => {
      if (this.paginator) {
        this.paginator.length = total;
      }
    });
  }

  addEmployee(): void {
    this.showAddForm = true;
  }

  editEmployee(employee: Employee): void {
    // Logic to edit an employee
  }

  deleteEmployee(employee: Employee): void {
    this.store.dispatch(deleteEmployee({ id: employee.id }));
  }

  deleteSelectedEmployees(): void {
    this.selection.selected.forEach(employee => this.deleteEmployee(employee));
    this.selection.clear();
  }

  viewEmployeeDetails(employee: Employee): void {
    // Logic to view employee details
  }

  showAddEmployeeForm(): void {
    this.showAddForm = true;
  }

  hideAddEmployeeForm(): void {
    this.showAddForm = false;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Whether the number of selected elements is greater than zero but less than the total number of rows. */
  isAnySelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected > 0 && numSelected < numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  toggleSelection(row: Employee): void {
    this.selection.toggle(row);
  }
}
