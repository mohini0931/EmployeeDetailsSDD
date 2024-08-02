import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  addEmployee,
  updateEmployee,
} from '../../store/actions/employee.actions';
import { Employee } from '../../models/employee.model';
import { NotificationService } from '../../services/notification.service';
import { FormGroupDirective } from '@angular/forms';

//This component handles both Add and Edit options
@Component({
  selector: 'app-employee-add', 
  templateUrl: './employee-add.component.html', 
  styleUrls: ['./employee-add.component.css'] 
})
export class EmployeeAddComponent implements OnChanges {
  @Input() employee: Employee | null = null; // Input property to receive an employee object for editing
  @Output() formClosed = new EventEmitter<void>(); // Output event emitter to notify parent component when the form is closed
  employeeForm: FormGroup; 

  constructor(
    private fb: FormBuilder, 
    private store: Store<AppState>, // NGRX store for state management
    private notificationService: NotificationService // Notification service for showing success messages
  ) {
    // Initializing the employee form with default values and validators
    this.employeeForm = this.fb.group({
      id: [{ value: 0, disabled: true }, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  // Lifecycle hook called when any data-bound property of a directive changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && changes['employee'].currentValue) {
      // If employee input changes, patch the form values with the employee data
      this.employeeForm.patchValue(this.employee as Employee);
    } else if (
      changes['employee'] &&
      changes['employee'].currentValue === null
    ) {
      // If employee input is null, reset the form
     this.employeeForm.reset(); // Reset form data
  
    }
  }

  // Method to handle form submission
  onSubmit(formData: FormGroup,
    formDirective: FormGroupDirective): void {
    if (this.employeeForm.valid) {
      // If form is valid, create an employee object from form values
      const employeeData: Employee = {
        ...this.employeeForm.getRawValue(),
        id: this.employee?.id ?? this.generateId().toString(),
      };
      if (this.employee) {
        // If an employee exists, dispatch update action
        this.store.dispatch(updateEmployee({ employee: employeeData }));
        this.notificationService.showSuccess('Employee details have been updated successfully.');
      } else {
        // If no employee exists, dispatch add action
        this.store.dispatch(addEmployee({ employee: employeeData }));
        this.notificationService.showSuccess('Employee has been added successfully.');
      }
      // Reset the form and emit formClosed event
      this.employeeForm.reset(); // Reset form data
      formDirective.resetForm(); // Reset the ugly validators
      this.formClosed.emit();
    } else {
      // If form is invalid, mark all controls as touched to show validation errors
      this.markFormAsTouched(this.employeeForm);
    }
  }

  // Method to handle form cancellation
  onCancel(): void {
    this.formClosed.emit();
  }

  // Private method to generate a random ID for new employees
  private generateId(): number {
    return Math.floor(Math.random() * 100000);
  }

  // Private method to mark all controls in the form group as touched
   private markFormAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  } 

  // Private method to mark all controls in the form group as untouched
  private markFormAsUntouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsUntouched();
    });
  } 

  // Method to reset the form to its initial state
  resetForm(): void {
    this.employeeForm.reset({
      id: 0,
      name: '',
      email: '',
      address: '',
      phone: ''
    });
    this.markFormAsUntouched(this.employeeForm);
    this.employeeForm.markAsPristine();
    this.employeeForm.updateValueAndValidity();
  }
}
