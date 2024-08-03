import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseComponent } from './expense.component';

describe('ExpenseComponent', () => {
  let component: ExpenseComponent;
  let fixture: ComponentFixture<ExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test to ensure the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to ensure the getTotal method calculates the total expense correctly
  it('should calculate the total expense correctly', () => {
    const expense = {
      salary: 1000,
      bonuses: 200,
      entertainment: 150,
      claims: 50,
    };
    const total = component.getTotal(expense);
    expect(total).toEqual(1400);
  });

  // Test to ensure the drawBars method is called after the view initialization
  it('should call drawBars after view initialization', () => {
    spyOn(component, 'drawBars');
    component.ngAfterViewInit();
    expect(component.drawBars).toHaveBeenCalled();
  });

  // Test to ensure the drawBars method works correctly with given expenses data
  it('should draw bars correctly on the canvas', () => {
    const mockExpenses = [
      {
        name: 'John Doe',
        role: 'Developer',
        salary: 1000,
        bonuses: 200,
        entertainment: 150,
        claims: 50,
        image: 'avatar1.png',
      },
      {
        name: 'Jane Smith',
        role: 'Designer',
        salary: 1200,
        bonuses: 300,
        entertainment: 100,
        claims: 100,
        image: 'avatar2.png',
      },
    ];

    component.expenses = mockExpenses;
    fixture.detectChanges();

    const canvases = fixture.nativeElement.querySelectorAll('canvas');
    expect(canvases.length).toBe(mockExpenses.length);

    // Check if the canvas contexts are set correctly
    mockExpenses.forEach((expense, index) => {
      const canvas = canvases[index];
      const ctx = canvas.getContext('2d');
      expect(ctx).toBeTruthy();
    });
  });

  // Test to ensure the correct number of legend items are displayed
  it('should display the correct number of legend items', () => {
    const legendItems = fixture.nativeElement.querySelectorAll('.legend-item');
    expect(legendItems.length).toBe(4); // We expect 4 legend items: Salary, Bonuses, Entertainment, and Claims
  });
});
