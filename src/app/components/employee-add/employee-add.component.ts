import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { addEmployee, updateEmployee } from '../../store/actions/employee.actions';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit, OnChanges {
  @Input() employee: Employee | null = null;
  @Output() formClosed = new EventEmitter<void>();
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.employeeForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    } else {
      this.employeeForm.reset();
      this.markFormAsUntouched(this.employeeForm);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && changes['employee'].currentValue) {
      this.employeeForm.patchValue(this.employee as Employee);
    } else if (changes['employee'] && changes['employee'].currentValue === null) {
      this.employeeForm.reset();
      this.markFormAsUntouched(this.employeeForm);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData: Employee = {
        ...this.employeeForm.getRawValue(),
        id: this.employee?.id ?? this.generateId()
      };
      if (this.employee) {
        this.store.dispatch(updateEmployee({ employee: employeeData }));
      } else {
        this.store.dispatch(addEmployee({ employee: employeeData }));
      }
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
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  private markFormAsUntouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsUntouched();
    });
  }
  resetForm(): void {
    this.employeeForm.reset();
    this.markFormAsUntouched(this.employeeForm);
  }
}
