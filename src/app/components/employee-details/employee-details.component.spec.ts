/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EmployeeDetailsComponent } from './employee-details.component';
import { selectEmployeeById } from '../../store/selectors/employee.selectors';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let store: MockStore;
  const mockEmployee: Employee = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St',
    phone: '123-456-7890'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDetailsComponent],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            { selector: selectEmployeeById(1), value: mockEmployee }
          ]
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        },
        EmployeeService
      ],
      imports: [RouterTestingModule, HttpClientTestingModule, MatIconModule, MatFormFieldModule]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should handle case where id is not provided', () => {
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue(null);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.employee).toBeUndefined();
  });
});
 */