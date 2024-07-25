import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../models/user-roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: UserRole | null = null;

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    // This is a mock implementation for the sake of example.
    // In a real application, you would authenticate against a backend service.
    if (username === 'sop1' && password === 'password') {
      this.currentUser = { username, role: 'SOP1' };
      this.router.navigate(['/employee-list']);
      return true;
    } else if (username === 'sop2' && password === 'password') {
      this.currentUser = { username, role: 'SOP2' };
      this.router.navigate(['/employee-list']);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  getCurrentUser(): UserRole | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  hasRole(role: 'SOP1' | 'SOP2'): boolean {
    return this.currentUser?.role === role;
  }
}
