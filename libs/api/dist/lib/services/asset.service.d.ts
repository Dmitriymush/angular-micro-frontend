import { Observable } from 'rxjs';
import { Asset, AssetWithVulnerabilities } from '@angular-micro-frontend/shared';
import * as i0 from "@angular/core";
export declare class AssetService {
    private readonly http;
    private readonly baseUrl;
    /**
     * Get all assets (without vulnerabilities)
     */
    getAssets(): Observable<Asset[]>;
    /**
     * Get a single asset by ID (with vulnerabilities)
     */
    getAssetById(id: string): Observable<AssetWithVulnerabilities>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AssetService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AssetService>;
}
//# sourceMappingURL=asset.service.d.ts.map