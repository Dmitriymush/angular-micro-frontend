import { Injectable, signal, computed } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class AuthService {
    // Signals for reactive state management
    userSignal = signal(null, ...(ngDevMode ? [{ debugName: "userSignal" }] : []));
    tokenSignal = signal(null, ...(ngDevMode ? [{ debugName: "tokenSignal" }] : []));
    // Computed values
    user = this.userSignal.asReadonly();
    token = this.tokenSignal.asReadonly();
    isAuthenticated = computed(() => this.tokenSignal() !== null, ...(ngDevMode ? [{ debugName: "isAuthenticated" }] : []));
    constructor() {
        // Restore session from localStorage on init
        this.restoreSession();
    }
    /**
     * Login with username and password
     * (Mock implementation - replace with real API call)
     */
    login(email, password) {
        // Mock login - replace with actual HTTP call
        return of({
            id: '1',
            name: 'Demo User',
            email,
            role: 'Admin'
        }).pipe(delay(500), // Simulate API delay
        tap(user => {
            const mockToken = `mock-jwt-token-${Date.now()}`;
            this.setSession(user, mockToken);
        }));
    }
    /**
     * Logout and clear session
     */
    logout() {
        this.clearSession();
    }
    /**
     * Get the current auth token
     */
    getToken() {
        return this.tokenSignal();
    }
    /**
     * Check if user is authenticated
     */
    isLoggedIn() {
        return this.isAuthenticated();
    }
    /**
     * Set user session
     */
    setSession(user, token) {
        this.userSignal.set(user);
        this.tokenSignal.set(token);
        // Persist to localStorage
        localStorage.setItem('auth_user', JSON.stringify(user));
        localStorage.setItem('auth_token', token);
    }
    /**
     * Clear user session
     */
    clearSession() {
        this.userSignal.set(null);
        this.tokenSignal.set(null);
        // Clear localStorage
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
    }
    /**
     * Restore session from localStorage
     */
    restoreSession() {
        const user = localStorage.getItem('auth_user');
        const token = localStorage.getItem('auth_token');
        if (user && token) {
            try {
                this.userSignal.set(JSON.parse(user));
                this.tokenSignal.set(token);
            }
            catch (error) {
                this.clearSession();
            }
        }
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [], null); })();
//# sourceMappingURL=auth.service.js.map