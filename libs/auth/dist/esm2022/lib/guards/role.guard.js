import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
/**
 * Role Guard Factory - Protects routes based on user role
 * Usage: { path: 'admin', component: AdminComponent, canActivate: [roleGuard(['Admin'])] }
 */
export function roleGuard(allowedRoles) {
    return (route, state) => {
        const authService = inject(AuthService);
        const router = inject(Router);
        const user = authService.user();
        if (!user) {
            router.navigate(['/login']);
            return false;
        }
        if (allowedRoles.includes(user.role)) {
            return true;
        }
        // User doesn't have required role
        router.navigate(['/unauthorized']);
        return false;
    };
}
//# sourceMappingURL=role.guard.js.map