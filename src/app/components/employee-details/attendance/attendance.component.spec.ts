import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendanceComponent } from './attendance.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AttendanceComponent', () => {
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendanceComponent],
      schemas: [NO_ERRORS_SCHEMA] // Add this to ignore unknown elements and attributes
    }).compileComponents();
    
    fixture = TestBed.createComponent(AttendanceComponent);
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
    expect(component.title).toBe('Attendance Details');
  });
});
