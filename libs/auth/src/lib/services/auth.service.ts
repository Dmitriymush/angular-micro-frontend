import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userSignal = signal<AuthUser | null>(null);
  private readonly tokenSignal = signal<string | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly token = this.tokenSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.tokenSignal() !== null);

  constructor() {
    this.restoreSession();
  }

  login(email: string, password: string): Observable<AuthUser> {
    return of({
      id: '1',
      name: 'Demo User',
      email,
      role: 'Admin'
    }).pipe(
      delay(500), // Simulate API delay
      tap(user => {
        const mockToken = `mock-jwt-token-${Date.now()}`;
        this.setSession(user, mockToken);
      })
    );
  }

  logout(): void {
    this.clearSession();
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  private setSession(user: AuthUser, token: string): void {
    this.userSignal.set(user);
    this.tokenSignal.set(token);

    localStorage.setItem('auth_user', JSON.stringify(user));
    localStorage.setItem('auth_token', token);
  }

  private clearSession(): void {
    this.userSignal.set(null);
    this.tokenSignal.set(null);

    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  }

  private restoreSession(): void {
    const user = localStorage.getItem('auth_user');
    const token = localStorage.getItem('auth_token');

    if (user && token) {
      try {
        this.userSignal.set(JSON.parse(user));
        this.tokenSignal.set(token);
      } catch (error) {
        this.clearSession();
      }
    }
  }
}
