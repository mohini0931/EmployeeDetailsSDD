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
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { Router } from '@angular/router';

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
  selectedEmployee: Employee | null = null;
  drawerTitle: string = '';
  showAddForm = false;
  deleteIconClicked: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('employeeAdd') employeeAddComponent!: EmployeeAddComponent;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    public authService: AuthService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private router: Router
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

  closeDrawer(): void {
    this.showAddForm = false;
    this.selectedEmployee = null;
    this.drawer.close();
  }

  editEmployee(event:Event,employee: Employee): void {
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

  onRowClick(row: Employee, event: Event): void {
    const target = event.target as HTMLElement;
    if (target && (target.closest('button.mat-icon-button'))) {
      return;
    }
    this.router.navigate(['/employee-details', row.id]);
  }
  
  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAnySelected() {
    return this.selection.selected.length > 0;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  toggleSelection(row: Employee): void {
    this.selection.toggle(row);
  }

  onCheckboxChange(event: Event, row: Employee): void {
    event.stopPropagation();
    this.toggleSelection(row);
  }
}
