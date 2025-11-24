import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset, AssetWithVulnerabilities } from '@angular-micro-frontend/shared';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/assets';

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.baseUrl);
  }

  getAssetById(id: string): Observable<AssetWithVulnerabilities> {
    return this.http.get<AssetWithVulnerabilities>(`${this.baseUrl}/${id}`);
  }
}
