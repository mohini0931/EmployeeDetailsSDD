import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeDeleteComponent } from './components/employee-delete/employee-delete.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { DashboardComponent } from './components/employee-details/dashboard/dashboard.component';
import { LeaveComponent } from './components/employee-details/leave/leave.component'; // Create LeaveComponent
import { AttendanceComponent } from './components/employee-details/attendance/attendance.component'; // Create AttendanceComponent
import { PerformanceComponent } from './components/employee-details/performance/performance.component'; // Create PerformanceComponent
import { AuthGuard } from './guards/auth.guard';
import { MyTeamComponent } from './components/custom-components/my-team/my-team.component';
import { PerformanceComparisonChartComponent } from './components/custom-components/performance-comparison-chart/performance-comparison-chart.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employee-add', component: EmployeeAddComponent, canActivate: [AuthGuard] },
  { path: 'employee-edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuard] },
  { path: 'employee-delete/:id', component: EmployeeDeleteComponent, canActivate: [AuthGuard] },
  {
    path: 'employee-details/:id',
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'leave', component: LeaveComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'performance', component: MyTeamComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
