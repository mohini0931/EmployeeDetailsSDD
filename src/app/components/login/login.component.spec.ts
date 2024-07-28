import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

class MockAuthService {
  login(username: string, password: string) {
    if (username === 'test' && password === 'password') {
      return true;
    }
    return false;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  let routerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    routerSpy = router.navigate as jasmine.Spy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message for invalid login', () => {
    component.username = 'invalid';
    component.password = 'invalid';
    component.onSubmit();
    expect(component.loginError).toBe('Invalid username or password');
  });

  it('should navigate to /employee-list on successful login', () => {
    component.username = 'test';
    component.password = 'password';
    component.onSubmit();
    expect(routerSpy).toHaveBeenCalledWith(['/employee-list']);
  });

  it('should not navigate on failed login', () => {
    component.username = 'invalid';
    component.password = 'invalid';
    component.onSubmit();
    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should have username and password fields', () => {
    const usernameInput: DebugElement = fixture.debugElement.query(By.css('input[name="username"]'));
    const passwordInput: DebugElement = fixture.debugElement.query(By.css('input[name="password"]'));
    
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should bind input fields to component properties', () => {
    const usernameInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="username"]')).nativeElement;
    const passwordInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;

    usernameInput.value = 'test';
    passwordInput.value = 'password';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    expect(component.username).toBe('test');
    expect(component.password).toBe('password');
  });


  it('should display the login form correctly', () => {
    const form = fixture.debugElement.query(By.css('form'));
    const inputs = form.queryAll(By.css('input'));
    const button = form.query(By.css('button'));

    expect(form).toBeTruthy();
    expect(inputs.length).toBe(2); // Username and Password fields
    expect(button.nativeElement.textContent).toContain('Sign In');
  });
  

});
