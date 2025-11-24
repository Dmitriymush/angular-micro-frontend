import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Finding } from '@angular-micro-frontend/shared';

@Injectable({
  providedIn: 'root'
})
export class FindingService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/findings';

  getFindings(): Observable<Finding[]> {
    return this.http.get<Finding[]>(this.baseUrl);
  }

  updateFinding(id: string, updates: Partial<Finding>): Observable<Finding> {
    return this.http.patch<Finding>(`${this.baseUrl}/${id}`, updates);
  }

  resolveFinding(id: string): Observable<Finding> {
    return this.updateFinding(id, { status: 'resolved' });
  }
}
