// employee-details.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './../components/employee-details/employee-details.component';
import { DashboardComponent } from  './../components/employee-details/dashboard/dashboard.component';
import { LeaveComponent } from './../components/employee-details/leave/leave.component';
import { AttendanceComponent } from './../components/employee-details/attendance/attendance.component';
import { MyTeamComponent } from './../components/custom-components/my-team/my-team.component';
import { PerformanceComparisonChartComponent } from '../components/custom-components/performance-comparison-chart/performance-comparison-chart.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDetailsComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'leave', component: LeaveComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'performance', component: PerformanceComparisonChartComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDetailsModule {}
