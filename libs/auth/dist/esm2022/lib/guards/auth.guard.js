import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
/**
 * Auth Guard - Protects routes that require authentication
 * Usage: { path: 'protected', component: SomeComponent, canActivate: [authGuard] }
 */
export const authGuard = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isLoggedIn()) {
        return true;
    }
    // Redirect to login with return URL
    router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
    });
    return false;
};
//# sourceMappingURL=auth.guard.js.map