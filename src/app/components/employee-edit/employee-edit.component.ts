import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { updateEmployee } from '../../store/actions/employee.actions';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee | null = null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const employeeId = +id;
      this.store.select('employees').subscribe(state => {
        this.employee = state.employees.find(e => e.id === employeeId) || null;
      });
    } else {
      // Handle case where id is null, e.g., navigate to another page or show an error message
      this.router.navigate(['/employee-list']);
    }
  }

  onSubmit(): void {
    if (this.employee) {
      this.store.dispatch(updateEmployee({ employee: this.employee }));
      this.router.navigate(['/employee-list']);
    }
  }

  onCancel(): void {
    // Navigate back to the employee list or another appropriate page
    this.router.navigate(['/employee-list']);
  }
}
