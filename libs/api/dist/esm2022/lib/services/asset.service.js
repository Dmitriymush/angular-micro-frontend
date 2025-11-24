import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export class AssetService {
    http = inject(HttpClient);
    baseUrl = '/api/assets';
    /**
     * Get all assets (without vulnerabilities)
     */
    getAssets() {
        return this.http.get(this.baseUrl);
    }
    /**
     * Get a single asset by ID (with vulnerabilities)
     */
    getAssetById(id) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
    static ɵfac = function AssetService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AssetService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AssetService, factory: AssetService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AssetService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=asset.service.js.map