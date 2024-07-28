import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { Store, StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { EmployeeListComponent } from './employee-list.component';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../store/app.state';
import { Employee } from '../../models/employee.model';
import { DeleteConfirmationDialogComponent } from '../custom-components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EmployeeAddComponent } from '../employee-add-edit/employee-add.component';
import { Router } from '@angular/router';
import { DrawerComponent } from '../../components/drawer/drawer.component'; // Import DrawerComponent
import { deleteEmployee, loadEmployees } from '../../store/actions/employee.actions';
import { selectAllEmployees, selectTotalEmployees } from '../../store/selectors/employee.selectors';

// Mock AuthService class
class MockAuthService {
  hasRole(role: string): boolean {
    return role === 'SOP2';
  }
}

// Mock Store class
class MockStore {
  dispatch(action: any): void {}
  select(selector: any): any {
    if (selector === selectTotalEmployees) {
      return of(10);
    }
    if (selector === selectAllEmployees) {
      return of([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St', phone: '555-1234' }
      ]);
    }
  }
}

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let authService: AuthService;
  let store: Store<AppState>;
  let snackBar: MatSnackBar;
  let dialog: MatDialog;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListComponent, DeleteConfirmationDialogComponent, EmployeeAddComponent, DrawerComponent], // Add DrawerComponent
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatIconModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatDialogModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatCardModule,
        MatTooltipModule,
        MatMenuModule,
        MatListModule,
        ReactiveFormsModule // Import ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Store, useClass: MockStore },
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy('open') } },
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of(true) }) } },
        provideRouter([]) // Provide the router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
    snackBar = TestBed.inject(MatSnackBar);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Test case to check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case to check if the snackbar message is displayed correctly
  it('should show snackbar message', () => {
    component.showSnackBar('Test Message');
    expect(snackBar.open).toHaveBeenCalledWith('Test Message', 'Close', { duration: 3000 });
  });

  // Test case to check if the component navigates to employee details on row click
  it('should route to employee details on row click', () => {
    spyOn(router, 'navigate');
    const employee: Employee = { id: 1, name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St', phone: '555-1234' };
    component.onRowClick(employee, new Event('click'));
    expect(router.navigate).toHaveBeenCalledWith(['/employee-details', employee.id]);
  });

  // Test case to check if the total number of employees is displayed correctly
  it('should display the total number of employees', () => {
    component.totalEmployees$.subscribe(total => {
      expect(total).toBe(10);
    });
  });

  // Test case to check if the delete confirmation dialog is opened
  it('should open delete confirmation dialog', () => {
    spyOn(store, 'dispatch');
    const employee: Employee = { id: 1, name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St', phone: '555-1234' };
    component.selection.select(employee);
    component.deleteSelectedEmployees();
    expect(dialog.open).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(deleteEmployee({ id: employee.id }));
  });

  // Test case to check if the delete button is disabled when no employee is selected
  it('should disable delete button if no employee is selected', () => {
    component.selection.clear();
    fixture.detectChanges();
    const deleteButton = fixture.debugElement.query(By.css('.delete-header-button')).nativeElement;
    expect(deleteButton.disabled).toBeTrue();
  });

  // Test case to check if the employees are loaded on init
  it('should load employees on init', () => {
    spyOn(store, 'dispatch').and.callThrough();
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadEmployees());
  });

  // Test case to check if the drawer is opened for adding new employee
  it('should open drawer for adding new employee', () => {
    spyOn(component.drawer, 'open');
    component.openDrawer('Add New Employee');
    expect(component.drawerTitle).toBe('Add New Employee');
    expect(component.showAddForm).toBeTrue();
    expect(component.drawer.open).toHaveBeenCalled();
  });

  // Test case to check if the drawer is closed
  it('should close drawer', () => {
    spyOn(component.drawer, 'close');
    component.closeDrawer();
    expect(component.showAddForm).toBeFalse();
    expect(component.drawer.close).toHaveBeenCalled();
  });

  // Test case to check if the selection is toggled
  it('should toggle selection', () => {
    const employee: Employee = { id: 1, name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St', phone: '555-1234' };
    component.toggleSelection(employee);
    expect(component.selection.isSelected(employee)).toBeTrue();
    component.toggleSelection(employee);
    expect(component.selection.isSelected(employee)).toBeFalse();
  });

  // Test case to check if the selected employee is deleted
  it('should delete selected employee', () => {
    spyOn(component.selection, 'isSelected').and.returnValue(true);
    spyOn(component, 'deleteEmployee').and.callThrough();
    spyOn(store, 'dispatch');
    const employee: Employee = { id: 1, name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St', phone: '555-1234' };
    component.selection.select(employee);
    component.deleteEmployee(new Event('click'), employee);
    expect(component.deleteEmployee).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(deleteEmployee({ id: employee.id }));
  });
});
