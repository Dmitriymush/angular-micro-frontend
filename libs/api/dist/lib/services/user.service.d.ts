import { Observable } from 'rxjs';
import { User } from '@angular-micro-frontend/shared';
import * as i0 from "@angular/core";
export declare class UserService {
    private readonly http;
    private readonly baseUrl;
    /**
     * Get all users
     */
    getUsers(): Observable<User[]>;
    /**
     * Create a new user
     */
    createUser(user: Omit<User, 'id' | 'lastLogin'>): Observable<User>;
    /**
     * Delete a user by ID
     */
    deleteUser(id: string): Observable<User>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserService>;
}
//# sourceMappingURL=user.service.d.ts.map