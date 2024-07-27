import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceCircleComponent } from './performance-circle.component';

describe('PerformanceCircleComponent', () => {
  let component: PerformanceCircleComponent;
  let fixture: ComponentFixture<PerformanceCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceCircleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
