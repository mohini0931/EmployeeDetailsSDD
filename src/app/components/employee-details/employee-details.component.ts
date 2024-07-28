

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectEmployeeById } from '../../store/selectors/employee.selectors';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  
  employee: any;

  constructor(private route: ActivatedRoute, 
    private store: Store<AppState>,
    public employeeService:EmployeeService) {
   
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.store.select(selectEmployeeById(id)).subscribe(employee => {
      this.employee = employee;
      console.log(`Employee Details - Employee:`, this.employee);
      this.employeeService.setEmployee(this.employee);
    });
  }
 
}


