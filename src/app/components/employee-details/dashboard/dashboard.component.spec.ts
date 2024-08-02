import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';

import { DashboardComponent } from './dashboard.component';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';
import { Component, Input } from '@angular/core';

// Mock components
@Component({
  selector: 'app-performance-comparison-chart',
  template: '<div></div>'
})
class PerformanceComparisonChartComponent {
  @Input() title: string = '';
  @Input() thisYearData: any = [];
  @Input() lastYearData: any = [];
  @Input() labels: any = [];
}

@Component({
  selector: 'app-performance-circle',
  template: '<div></div>'
})
class PerformanceCircleComponent {
  @Input() percentage: number = 0;
}

@Component({
  selector: 'app-my-team',
  template: '<div></div>'
})
class MyTeamComponent {
  @Input() teamDetails: any = [];
}

@Component({
  selector: 'app-expense',
  template: '<div></div>'
})
class ExpenseComponent {
  @Input() expenses: any = [];
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let employeeService: EmployeeService;
  const mockEmployee: Employee = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St',
    phone: '123-456-7890'
  };
  const mockEmployeeDetails = {
    performanceComparison: {
      thisYear: [70, 80, 90],
      lastYear: [60, 70, 80],
      labels: ['Q1', 'Q2', 'Q3']
    },
    expenses: [{}, {}],
    team: [{}],
    dashboard: {
      performance: { score: 85, percentage: 90, scoreDesc: 'Excellent' },
      taskAssigned: { total: 120, averageTasks: 30 },
      taskCompletion: { percentage: 95, scoreDesc: 'Great' },
      attendance: { percentage: 90, scoreDesc: 'Good' },
      leaves: { percentage: 5, scoreDesc: 'Minimal' }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        PerformanceComparisonChartComponent,
        PerformanceCircleComponent,
        MyTeamComponent,
        ExpenseComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatIconModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        },
        EmployeeService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);

    spyOn(employeeService, 'getEmployeeDetails').and.returnValue(of([mockEmployeeDetails]));
    spyOn(employeeService, 'getDefaultEmpDetails').and.returnValue(of([mockEmployeeDetails]));

    // Mocking the employee$ observable property
    Object.defineProperty(employeeService, 'employee$', { writable: true });
    employeeService.employee$ = of(mockEmployee);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employee details on init', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.employee).toEqual(mockEmployee);
    expect(component.employeeDetails).toEqual(mockEmployeeDetails);
  });

  it('should call setDashboardData when employee details are fetched', () => {
    spyOn(component, 'setDashboardData');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.setDashboardData).toHaveBeenCalled();
  });

  it('should set dashboard data correctly', () => {
    component.employeeDetails = mockEmployeeDetails;
    component.setDashboardData();
    expect(component.thisYearData).toEqual(mockEmployeeDetails.performanceComparison.thisYear);
    expect(component.lastYearData).toEqual(mockEmployeeDetails.performanceComparison.lastYear);
    expect(component.labels).toEqual(mockEmployeeDetails.performanceComparison.labels);
    expect(component.employeeExpenses).toEqual(mockEmployeeDetails.expenses);
    expect(component.teamData).toEqual(mockEmployeeDetails.team);
    expect(component.performanceCirclePercentage).toEqual(mockEmployeeDetails.dashboard.performance.percentage);
  });

  it('should navigate to attendance onAttendanceClick', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.onAttendanceClick();
    expect(router.navigate).toHaveBeenCalledWith(['/employee-details', component.employeeId, 'attendance']);
  });

  it('should navigate to leave onLeavesClick', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.onLeavesClick();
    expect(router.navigate).toHaveBeenCalledWith(['/employee-details', component.employeeId, 'leave']);
  });
});
