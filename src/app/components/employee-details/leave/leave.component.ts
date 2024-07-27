import { Component, Input, OnInit } from '@angular/core';
import { Employee } from './../../../models/employee.model';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  @Input() employee: Employee | undefined;
  thisYearData = [80, 90, 70, 100];
  lastYearData = [60, 70, 50, 80];
  labels = ['Q1', 'Q2', 'Q3', 'Q4'];
  title = 'Leave Details';
  constructor() { }

  ngOnInit(): void {
  }
}
