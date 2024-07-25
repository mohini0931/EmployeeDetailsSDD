import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../../models/employee.model';
import { AppState } from '../../store/app.state';
import { loadEmployees, deleteEmployee, updateEmployee } from '../../store/actions/employee.actions';
import { selectAllEmployees, selectTotalEmployees } from '../../store/selectors/employee.selectors';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { MatDrawer } from '@angular/material/sidenav'; // Import MatDrawer
import { EmployeeAddComponent } from '../employee-add/employee-add.component';

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
  selectedEmployee: Employee | null = null;
  drawerTitle: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer; // ViewChild to access the drawer
  @ViewChild('employeeAdd') employeeAddComponent!: EmployeeAddComponent; // ViewChild to access the EmployeeAddComponent

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public authService: AuthService // Inject AuthService
  ) {
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

  editEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
    this.drawerTitle = 'Edit Employee';
    this.showAddForm = true;
    this.drawer.open();
  }


  deleteEmployee(employee: Employee): void {
    if (this.authService.hasRole('SOP2')) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '400px';
      dialogConfig.panelClass = 'custom-dialog-container';

      const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(deleteEmployee({ id: employee.id }));
        }
      });
    } else {
      alert('You do not have permission to delete an employee.');
    }
  }

  deleteSelectedEmployees(): void {
    if (this.authService.hasRole('SOP2')) {
      if (this.selection.selected.length > 0) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '400px';
        dialogConfig.panelClass = 'custom-dialog-container';

        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.selection.selected.forEach(employee => {
              this.store.dispatch(deleteEmployee({ id: employee.id }));
            });
            this.selection.clear();
          }
        });
      } else {
        alert('Please select at least one employee to delete.');
      }
    } else {
      alert('You do not have permission to delete employees.');
    }
  }

  viewEmployeeDetails(employee: Employee): void {
    // Logic to view employee details
  }

  showSnackBar(): void {
    this.snackBar.open('Employee has been added successfully.', 'Close', {
      duration: 3000,
    });
  }
  openDrawer(title: string): void {
    this.drawerTitle = title;
    this.selectedEmployee = null;
    this.showAddForm = true;
    this.drawer.open();

    // Reset the form and mark as untouched
    if (this.employeeAddComponent) {
      this.employeeAddComponent.resetForm();
    }
  }
  closeDrawer(): void {
    this.showAddForm = false;
    this.selectedEmployee = null;
    this.drawer.close(); // Close the drawer
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Whether the number of selected elements is greater than zero but less than the total number of rows. */
  isAnySelected() {
    return this.selection.selected.length > 0;
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
