import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { EmployeeAddComponent } from './employee-add.component';
import { NotificationService } from '../../services/notification.service';
import { AppState } from '../../store/app.state';
import { addEmployee, updateEmployee } from '../../store/actions/employee.actions';
import { Employee } from '../../models/employee.model';

describe('EmployeeAddComponent', () => {
  let component: EmployeeAddComponent;
  let fixture: ComponentFixture<EmployeeAddComponent>;
  let store: MockStore<AppState>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    notificationService = jasmine.createSpyObj('NotificationService', ['showSuccess']);
    await TestBed.configureTestingModule({
      declarations: [EmployeeAddComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [
        provideMockStore({}),
        { provide: NotificationService, useValue: notificationService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeAddComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore) as MockStore<AppState>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.employeeForm).toBeDefined();
  });

  it('should patch form values when employee input changes', () => {
    const employee: Employee = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      phone: '123-456-7890'
    };
    component.employee = employee;
    component.ngOnChanges({
      employee: {
        currentValue: employee,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    expect(component.employeeForm.getRawValue()).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      phone: '123-456-7890'
    });
  });

  it('should dispatch addEmployee action on valid form submission', () => {
    spyOn(store, 'dispatch');
    component.employeeForm.setValue({
      id: 0,
      name: 'New Employee',
      email: 'new@example.com',
      address: '456 New St',
      phone: '987-654-3210'
    });
    
    const formDirective = jasmine.createSpyObj('FormGroupDirective', ['resetForm']);
    component.onSubmit(component.employeeForm, formDirective);
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: '[Employee List] Add Employee', // Ensure the action type matches the one in your code
      employee: {
        id: jasmine.stringMatching(/^\d+$/), // Match the string representation of a number
        name: 'New Employee',
        email: 'new@example.com',
        address: '456 New St',
        phone: '987-654-3210'
      }
    }));
  });

  it('should emit formClosed event on cancel', () => {
    spyOn(component.formClosed, 'emit');
    component.onCancel();
    expect(component.formClosed.emit).toHaveBeenCalled();
  });
});
