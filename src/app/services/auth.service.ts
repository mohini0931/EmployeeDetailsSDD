import { Injectable } from '@angular/core';
import { UserRole } from '../models/user-roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private userRole: UserRole | null = null;

  login(username: string, password: string): boolean {
    // Simplified logic for demonstration purposes
    if (username === 'SOP1' && password === 'admin') {
      this.isAuthenticated = true;
      this.userRole = UserRole.Admin;
      return true;
    } else if (username === 'SOP2' && password === 'user') {
      this.isAuthenticated = true;
      this.userRole = UserRole.User;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userRole = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getRole(): UserRole | null {
    return this.userRole;
  }
}
