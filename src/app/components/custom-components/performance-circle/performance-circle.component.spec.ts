import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerformanceCircleComponent } from './performance-circle.component';

describe('PerformanceCircleComponent', () => {
  let component: PerformanceCircleComponent;
  let fixture: ComponentFixture<PerformanceCircleComponent>;
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D | null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceCircleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PerformanceCircleComponent);
    component = fixture.componentInstance;

    canvas = document.createElement('canvas');
    canvas.id = 'performanceCircle';
    canvas.width = 100;
    canvas.height = 100;
    document.body.appendChild(canvas);

    context = canvas.getContext('2d');
    
    if (context) {
      spyOn(context, 'beginPath').and.callThrough();
      spyOn(context, 'arc').and.callThrough();
      spyOn(context, 'stroke').and.callThrough();
      spyOn(context, 'clearRect').and.callThrough();
      spyOn(context, 'fillText').and.callThrough();
    }

    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.removeChild(canvas);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});
