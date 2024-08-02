import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveComponent } from './leave.component';
import { Employee } from './../../../models/employee.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LeaveComponent', () => {
  let component: LeaveComponent;
  let fixture: ComponentFixture<LeaveComponent>;

  const mockEmployee: Employee = {
    id: 1,
    name: 'Test Employee',
    email: 'test@example.com',
    address: '123 Test St',
    phone: '123-456-7890'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveComponent],
      schemas: [NO_ERRORS_SCHEMA] // Add this to ignore unknown elements and attributes
    }).compileComponents();
    
    fixture = TestBed.createComponent(LeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default thisYearData values', () => {
    expect(component.thisYearData).toEqual([80, 90, 70, 100]);
  });

  it('should have default lastYearData values', () => {
    expect(component.lastYearData).toEqual([60, 70, 50, 80]);
  });

  it('should have default labels', () => {
    expect(component.labels).toEqual(['Q1', 'Q2', 'Q3', 'Q4']);
  });

  it('should have default title', () => {
    expect(component.title).toBe('Leave Details');
  });

  it('should set employee input correctly', () => {
    component.employee = mockEmployee;
    fixture.detectChanges();
    expect(component.employee).toEqual(mockEmployee);
  });
});
