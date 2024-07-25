import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { AppState } from '../../store/app.state';
import { addEmployee } from '../../store/actions/employee.actions';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  @Output() formClose = new EventEmitter<void>();

  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    address: '',
    phone: ''
  };

  constructor(private store: Store<AppState>) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.store.dispatch(addEmployee({ employee: this.employee }));
      this.formClose.emit();
    } else {
      form.controls['name'].markAsTouched();
      form.controls['email'].markAsTouched();
      form.controls['address'].markAsTouched();
      form.controls['phone'].markAsTouched();
    }
  }

  cancel(): void {
    this.formClose.emit();
  }
}
