import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

   // Set up the testing module
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService, { provide: Router, useValue: routerSpy }],
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Verify that no unmatched requests are outstanding after each test
  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch employees', () => {
    const mockEmployees: Employee[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Main St',
        phone: '123-456-7890',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
        address: '456 Elm St',
        phone: '987-654-3210',
      },
    ];

    service.getEmployees().subscribe((employees) => {
      expect(employees.length).toBe(2);
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });

  it('should add an employee', () => {
    const newEmployee: Employee = {
      id: 3,
      name: 'Alice',
      email: 'alice@example.com',
      address: '789 Oak St',
      phone: '555-555-5555',
    };

    service.addEmployee(newEmployee).subscribe((employee) => {
      expect(employee).toEqual(newEmployee);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmployee);
    req.flush(newEmployee);
  });

  it('should update an employee', () => {
    const updatedEmployee: Employee = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      phone: '123-456-7890',
    };

    service.updateEmployee(updatedEmployee).subscribe((response) => {
      expect(response).toEqual(updatedEmployee);
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}/${updatedEmployee.id}`
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedEmployee);
    req.flush(updatedEmployee);
  });

  it('should delete an employee', () => {
    const employeeId = '1';

    service.deleteEmployee(employeeId).subscribe((response) => {
      expect(response).toBeNull(); // Adjusted to allow null as a valid response
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${employeeId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Responding with null to simulate the backend response
  });

  // Test case: get employee details
  it('should get employee details', () => {
    const employeeId = 1;
    const employeeDetails = { id: 1, detail: 'Some details' };

    service.getEmployeeDetails(employeeId).subscribe((details) => {
      expect(details).toEqual([employeeDetails]);
    });

    const req = httpMock.expectOne(
      `${service['apiUrlDetails']}?id=${employeeId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush([employeeDetails]);
  });

   // Test case: get default employee details
  it('should get default employee details', () => {
    const defaultDetails = { id: 1, detail: 'Default details' };

    service.getDefaultEmpDetails().subscribe((details) => {
      expect(details).toEqual([defaultDetails]);
    });

    const req = httpMock.expectOne(`${service['apiUrlDetails']}?id=1`);
    expect(req.request.method).toBe('GET');
    req.flush([defaultDetails]);
  });
  
    // Test case: set and get employee
  it('should set and get employee', () => {
    const employee: Employee = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      phone: '123-456-7890',
    };
    service.setEmployee(employee);
    service.employee$.subscribe((emp) => {
      expect(emp).toEqual(employee);
    });
  });

   // Test case: clear employee and navigate to login on logout
  it('should clear employee and navigate to login on logout', () => {
    service.logout();
    service.employee$.subscribe((emp) => {
      expect(emp).toBeNull();
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
