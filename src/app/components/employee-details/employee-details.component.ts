/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectAllEmployees } from '../../store/selectors/employee.selectors';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = +(params.get('id') ?? '0');
        return this.store.select(selectAllEmployees);
      })
    ).subscribe(employees => {
      const id = +(this.route.snapshot.paramMap.get('id') ?? '0');
      this.employee = employees.find(e => e.id === id) || null;
    });
  }
}
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Employee } from '../../models/employee.model';
import { Observable } from 'rxjs';
import { selectEmployeeById } from '../../store/selectors/employee.selectors';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  
  employee: Employee | undefined;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
   
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.store.select(selectEmployeeById(id)).subscribe(employee => {
      this.employee = employee;
      console.log(`Employee Details - Employee:`, this.employee);
    });
  }
  
}


