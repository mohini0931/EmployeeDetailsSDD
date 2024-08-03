import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserRole } from '../models/user-roles';

describe('AuthService', () => {
  let service: AuthService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create a spy object for Router with navigate method
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: routerSpy }],
    });
    // Inject the AuthService and Router spy
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  // Test to ensure the service is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test successful login for SOP1 user
  it('should login SOP1 user correctly', () => {
    const result = service.login('sop1', 'password');
    expect(result).toBeTrue();
    expect(service.getCurrentUser()).toEqual({
      username: 'sop1',
      role: 'SOP1',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/employee-list']);
  });

  // Test successful login for SOP2 user
  it('should login SOP2 user correctly', () => {
    const result = service.login('sop2', 'password');
    expect(result).toBeTrue();
    expect(service.getCurrentUser()).toEqual({
      username: 'sop2',
      role: 'SOP2',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/employee-list']);
  });

  // Test login with incorrect credentials
  it('should not login with incorrect credentials', () => {
    const result = service.login('invalidUser', 'invalidPassword');
    expect(result).toBeFalse();
    expect(service.getCurrentUser()).toBeNull();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  // Test the logout functionality
  it('should logout correctly', () => {
    service.login('sop1', 'password');
    service.logout();
    expect(service.getCurrentUser()).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  // Test getting the current user
  it('should return current user', () => {
    service.login('sop1', 'password');
    const currentUser = service.getCurrentUser();
    expect(currentUser).toEqual({ username: 'sop1', role: 'SOP1' });
  });

  // Test getting the current user when no user is logged in
  it('should return null if no user is logged in', () => {
    const currentUser = service.getCurrentUser();
    expect(currentUser).toBeNull();
  });

  // Test the isLoggedIn method
  it('should correctly identify logged in state', () => {
    service.login('sop1', 'password');
    expect(service.isLoggedIn()).toBeTrue();
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
  });

  // Test the hasRole method
  it('should correctly check user roles', () => {
    service.login('sop1', 'password');
    expect(service.hasRole('SOP1')).toBeTrue();
    expect(service.hasRole('SOP2')).toBeFalse();
    service.logout();
    expect(service.hasRole('SOP1')).toBeFalse();
  });
});
