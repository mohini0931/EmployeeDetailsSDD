import { Component, Input, OnInit } from '@angular/core';
import { Employee } from './../../../models/employee.model';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  @Input() employee: Employee | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
