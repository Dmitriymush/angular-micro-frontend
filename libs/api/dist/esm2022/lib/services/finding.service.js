import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export class FindingService {
    http = inject(HttpClient);
    baseUrl = '/api/findings';
    /**
     * Get all findings
     */
    getFindings() {
        return this.http.get(this.baseUrl);
    }
    /**
     * Update finding status (e.g., mark as resolved)
     */
    updateFinding(id, updates) {
        return this.http.patch(`${this.baseUrl}/${id}`, updates);
    }
    /**
     * Mark finding as resolved
     */
    resolveFinding(id) {
        return this.updateFinding(id, { status: 'resolved' });
    }
    static ɵfac = function FindingService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FindingService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FindingService, factory: FindingService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FindingService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=finding.service.js.map