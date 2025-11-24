import { Observable } from 'rxjs';
import { DashboardStats, Settings } from '@angular-micro-frontend/shared';
import * as i0 from "@angular/core";
export declare class DashboardService {
    private readonly http;
    /**
     * Get dashboard statistics
     */
    getStats(): Observable<DashboardStats>;
    /**
     * Get application settings
     */
    getSettings(): Observable<Settings>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DashboardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DashboardService>;
}
//# sourceMappingURL=dashboard.service.d.ts.map