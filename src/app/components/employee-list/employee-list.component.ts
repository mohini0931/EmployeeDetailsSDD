import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../../models/employee.model';
import { AppState } from '../../store/app.state';
import { loadEmployees, deleteEmployee, updateEmployee } from '../../store/actions/employee.actions';
import { selectAllEmployees, selectTotalEmployees } from '../../store/selectors/employee.selectors';
import { AuthService } from '../../services/auth.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../custom-components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EmployeeAddComponent } from '../employee-add-edit/employee-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list', 
  templateUrl: './employee-list.component.html', 
  styleUrls: ['./employee-list.component.css'] 
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  // Define the columns to be displayed in the table
  displayedColumns: string[] = ['select', 'name', 'email', 'address', 'phone', 'actions'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  totalEmployees$: Observable<number>;
  selection = new SelectionModel<Employee>(true, []);
  selectedEmployee: Employee | null = null;
  drawerTitle: string = '';
  showAddForm = false;
  deleteIconClicked: boolean = false;

  // ViewChild properties to access template elements
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('employeeAdd') employeeAddComponent!: EmployeeAddComponent;

  constructor(
    private store: Store<AppState>, // Inject NGRX store
    private snackBar: MatSnackBar, // Inject Angular Material snack bar
    public authService: AuthService, // Inject custom authentication service
    private dialog: MatDialog, // Inject Angular Material dialog
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private router: Router // Inject Angular router
  ) {
    // Select the total number of employees from the store
    this.totalEmployees$ = this.store.select(selectTotalEmployees);
  }

  // Lifecycle hook called once the component is initialized
  ngOnInit(): void {
    // Dispatch the action to load employees
    this.store.dispatch(loadEmployees());
    // Select all employees from the store and set the data source
    this.store.select(selectAllEmployees).subscribe(employees => {
      this.dataSource.data = employees;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  // Lifecycle hook called after the component's view has been fully initialized
  ngAfterViewInit() {
    // Set the paginator for the data source
    this.dataSource.paginator = this.paginator;
    // Update the paginator length based on the total number of employees
    this.totalEmployees$.subscribe(total => {
      if (this.paginator) {
        this.paginator.length = total;
      }
    });
  }

  // Method to open the drawer for adding or editing an employee
  openDrawer(title: string): void {
    this.drawerTitle = title;
    this.selectedEmployee = null;
    this.showAddForm = true;
    this.drawer.open();
    
    this.drawer.openedChange.subscribe((opened) => {
      if (opened && this.employeeAddComponent) {
        this.employeeAddComponent.resetForm();
      }
    });
  }

  // Method to close the drawer
  closeDrawer(): void {
    this.showAddForm = false;
    this.selectedEmployee = null;
    this.drawer.close();
  }

  // Method to handle the edit action for an employee
  editEmployee(event: Event, employee: Employee): void {
    event.stopPropagation();
    this.deleteIconClicked = false;
    if (this.selection.isSelected(employee)) {
      this.selectedEmployee = employee;
      this.drawerTitle = 'Edit Employee';
      this.showAddForm = true;
      this.drawer.open();

      this.drawer.openedChange.subscribe((opened) => {
        if (opened && this.employeeAddComponent) {
          this.employeeAddComponent.employeeForm.patchValue(this.selectedEmployee as { [key: string]: any });
        }
      });
    }
  }

  // Method to delete a single employee
  deleteEmployee(event: Event, employee: Employee): void {
    event.stopPropagation();
    if (this.authService.hasRole('SOP2') && this.selection.isSelected(employee)) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '400px';
      dialogConfig.panelClass = 'custom-dialog-container';
  
      const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(deleteEmployee({ id: employee.id }));
          this.selection.clear();
        }
      });
    } else {
      alert('Please select the checkbox before deleting an employee.');
    }
  }

  // Method to delete selected employees
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

  // Method to handle row click and navigate to employee details
  onRowClick(row: Employee, event: Event): void {
    const target = event.target as HTMLElement;
    if (target && (target.closest('button.mat-icon-button'))) {
      return;
    }
    this.router.navigate(['/employee-details', row.id]);
  }
  
  // Method to show a snackbar message
  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  // Method to check if all rows are selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Method to check if any rows are selected
  isAnySelected() {
    return this.selection.selected.length > 0;
  }

  masterToggle() {
    // Toggle the selection state for all rows
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  // Method to get the label for the checkbox
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  // Method to toggle the selection of a row
  toggleSelection(row: Employee): void {
    this.selection.toggle(row);
  }

  // Method to handle checkbox change event
  onCheckboxChange(event: Event, row: Employee): void {
    event.stopPropagation();
    this.toggleSelection(row);
  }
}
