import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from './../../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentDate: Date = new Date();
  employeeId: string;
  employee: Employee | null = null;
  employeeDetails: any;
  thisYearData: any = [];
  lastYearData: any = [];
  labels: any;
  employeeExpenses: any = [];
  teamData: any = [];
  performanceCirclePercentage: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    this.employeeId = this.route.snapshot.paramMap.get('id') || ''; // Retrieve the employee ID from the route
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    this.employeeService.employee$.subscribe((employee) => {
      this.employee = employee;
      console.log('from dashboard component=' + this.employee);
    });
    this.employeeService
      .getEmployeeDetails(Number(this.employee?.id))
      .subscribe((empDetailsObj) => {
        if (empDetailsObj.length > 0) {
          this.employeeDetails = empDetailsObj[0];
          this.setDashboardData(); //set the dashbaord details only once we receive API data
        } else {//call this method for the emp id for which we have not configured the json data in db.json
          this.employeeService.getDefaultEmpDetails().subscribe((empdata) => {
            this.employeeDetails = empdata[0];
            this.setDashboardData();
          });
        }
      });
  }

  onAttendanceClick() {
    this.router.navigate([`/employee-details`, this.employeeId, 'attendance']);
  }
  onLeavesClick() {
    this.router.navigate([`/employee-details`, this.employeeId, 'leave']);
  }
  setDashboardData() {
    this.thisYearData = this.employeeDetails?.performanceComparison?.thisYear;
    this.lastYearData = this.employeeDetails?.performanceComparison?.lastYear;
    this.labels = this.employeeDetails?.performanceComparison?.labels;

    this.employeeExpenses = this.employeeDetails?.expenses;

    this.teamData = this.employeeDetails?.team;

    this.performanceCirclePercentage =
      this.employeeDetails?.dashboard?.performance?.percentage;
  }
}
