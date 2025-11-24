import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export class UserService {
    http = inject(HttpClient);
    baseUrl = '/api/users';
    /**
     * Get all users
     */
    getUsers() {
        return this.http.get(this.baseUrl);
    }
    /**
     * Create a new user
     */
    createUser(user) {
        return this.http.post(this.baseUrl, user);
    }
    /**
     * Delete a user by ID
     */
    deleteUser(id) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
    static ɵfac = function UserService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=user.service.js.map