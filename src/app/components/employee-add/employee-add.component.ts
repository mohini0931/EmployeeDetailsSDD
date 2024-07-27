import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
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

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() employee: Employee | null = null;
  @Output() formClosed = new EventEmitter<void>();
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private notificationService: NotificationService
  ) {
    this.employeeForm = this.fb.group({
      id: [{ value: 0, disabled: true }, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  ngAfterViewInit(): void {
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && changes['employee'].currentValue) {
      this.employeeForm.patchValue(this.employee as Employee);
    } else if (
      changes['employee'] &&
      changes['employee'].currentValue === null
    ) {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData: Employee = {
        ...this.employeeForm.getRawValue(),
        id: this.employee?.id ?? this.generateId(),
      };
      if (this.employee) {
        this.store.dispatch(updateEmployee({ employee: employeeData }));
        this.notificationService.showSuccess('Employee details have been updated successfully.');
      } else {
        this.store.dispatch(addEmployee({ employee: employeeData }));
        this.notificationService.showSuccess('Employee has been added successfully.');
      }
      this.resetForm();
      this.formClosed.emit();
    } else {
      this.markFormAsTouched(this.employeeForm);
    }
  }

  onCancel(): void {
    this.formClosed.emit();
  }

  private generateId(): number {
    return Math.floor(Math.random() * 100000);
  }

  private markFormAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  private markFormAsUntouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsUntouched();
    });
  }

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
  }
}
