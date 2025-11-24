import { Observable } from 'rxjs';
import { AuthUser } from '../interfaces';
import * as i0 from "@angular/core";
export declare class AuthService {
    private readonly userSignal;
    private readonly tokenSignal;
    readonly user: import("@angular/core").Signal<AuthUser | null>;
    readonly token: import("@angular/core").Signal<string | null>;
    readonly isAuthenticated: import("@angular/core").Signal<boolean>;
    constructor();
    /**
     * Login with username and password
     * (Mock implementation - replace with real API call)
     */
    login(email: string, password: string): Observable<AuthUser>;
    /**
     * Logout and clear session
     */
    logout(): void;
    /**
     * Get the current auth token
     */
    getToken(): string | null;
    /**
     * Check if user is authenticated
     */
    isLoggedIn(): boolean;
    /**
     * Set user session
     */
    private setSession;
    /**
     * Clear user session
     */
    private clearSession;
    /**
     * Restore session from localStorage
     */
    private restoreSession;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthService>;
}
//# sourceMappingURL=auth.service.d.ts.map