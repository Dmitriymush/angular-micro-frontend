import { Observable } from 'rxjs';
import { Finding } from '@angular-micro-frontend/shared';
import * as i0 from "@angular/core";
export declare class FindingService {
    private readonly http;
    private readonly baseUrl;
    /**
     * Get all findings
     */
    getFindings(): Observable<Finding[]>;
    /**
     * Update finding status (e.g., mark as resolved)
     */
    updateFinding(id: string, updates: Partial<Finding>): Observable<Finding>;
    /**
     * Mark finding as resolved
     */
    resolveFinding(id: string): Observable<Finding>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FindingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FindingService>;
}
//# sourceMappingURL=finding.service.d.ts.map