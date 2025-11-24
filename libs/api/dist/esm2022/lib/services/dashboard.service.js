import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export class DashboardService {
    http = inject(HttpClient);
    /**
     * Get dashboard statistics
     */
    getStats() {
        return this.http.get('/api/dashboard/stats');
    }
    /**
     * Get application settings
     */
    getSettings() {
        return this.http.get('/api/settings');
    }
    static ɵfac = function DashboardService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DashboardService, factory: DashboardService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=dashboard.service.js.map