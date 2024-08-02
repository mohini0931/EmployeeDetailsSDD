/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmployeeDeleteComponent } from './employee-delete.component';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

describe('EmployeeDeleteComponent', () => {
  let component: EmployeeDeleteComponent;
  let fixture: ComponentFixture<EmployeeDeleteComponent>;
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
      declarations: [EmployeeDeleteComponent],
      providers: [
        provideMockStore({}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        EmployeeService
      ],
      imports: [HttpClientTestingModule, MatDialogModule]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(EmployeeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
 */