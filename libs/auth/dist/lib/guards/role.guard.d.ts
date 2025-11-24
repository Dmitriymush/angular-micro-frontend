import { CanActivateFn } from '@angular/router';
/**
 * Role Guard Factory - Protects routes based on user role
 * Usage: { path: 'admin', component: AdminComponent, canActivate: [roleGuard(['Admin'])] }
 */
export declare function roleGuard(allowedRoles: string[]): CanActivateFn;
//# sourceMappingURL=role.guard.d.ts.map