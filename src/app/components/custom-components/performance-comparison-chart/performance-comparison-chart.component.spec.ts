import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceComparisonChartComponent } from './performance-comparison-chart.component';

describe('PerformanceComparisonChartComponent', () => {
  let component: PerformanceComparisonChartComponent;
  let fixture: ComponentFixture<PerformanceComparisonChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceComparisonChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceComparisonChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
