import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule
import { MatSidenavModule } from "@angular/material/sidenav";

import { MatDialogModule } from "@angular/material/dialog";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeDeleteComponent } from './components/employee-delete/employee-delete.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { employeeReducer } from './store/reducers/employee.reducer';
import { EmployeeEffects } from './store/effects/employee.effects';
import { DeleteConfirmationDialogComponent } from "./components/custom-components/delete-confirmation-dialog/delete-confirmation-dialog.component";
import { DrawerComponent } from './components/drawer/drawer.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { LeaveComponent } from './components/employee-details/leave/leave.component';
import { AttendanceComponent } from './components/employee-details/attendance/attendance.component';
import { PerformanceComponent } from './components/employee-details/performance/performance.component';
import { DashboardComponent } from "./components/employee-details/dashboard/dashboard.component";
import { PerformanceCircleComponent } from "./components/custom-components/performance-circle/performance-circle.component";
import { MyTeamComponent } from './components/custom-components/my-team/my-team.component';
import { PerformanceComparisonChartComponent } from './components/custom-components/performance-comparison-chart/performance-comparison-chart.component';
import { ExpenseComponent } from './components/custom-components/expense/expense.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeDeleteComponent,
    DashboardComponent,
    DeleteConfirmationDialogComponent,
    DrawerComponent,
    EmployeeDetailsComponent,
    LeaveComponent,
    AttendanceComponent,
    PerformanceComponent,
    PerformanceCircleComponent,
    MyTeamComponent,
    PerformanceComparisonChartComponent,
    ExpenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    StoreModule.forRoot({ employees: employeeReducer }),
    EffectsModule.forRoot([EmployeeEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
