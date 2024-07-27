import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
  thisYearData = [80, 90, 70, 100];
  lastYearData = [60, 70, 50, 80];
  labels = ['Q1', 'Q2', 'Q3', 'Q4'];
  title = 'Attendance Details';
}
