import { Component, OnInit, inject, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { AssetWithVulnerabilities } from '@angular-micro-frontend/shared';
import { AssetsHelper } from '../../helpers/assets.helper';
import * as AssetsActions from '../../state/assets.actions';
import * as AssetsSelectors from '../../state/assets.selectors';

@Component({
  selector: 'app-asset-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './asset-detail.component.html',
  styleUrl: './asset-detail.component.scss'
})
export class AssetDetailComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly asset = this.store.selectSignal(AssetsSelectors.selectSelectedAsset);
  protected readonly loading = this.store.selectSignal(AssetsSelectors.selectAssetsLoading);
  protected readonly error = this.store.selectSignal(AssetsSelectors.selectAssetsError);

  protected readonly totalVulnerabilities = computed(() =>
    AssetsHelper.getTotalVulnerabilities(this.asset())
  );

  protected readonly hasCriticalVulnerabilities = computed(() => {
    const currentAsset = this.asset();
    return currentAsset ? AssetsHelper.hasCriticalVulnerabilities(currentAsset) : false;
  });

  protected readonly severityLevel = computed(() =>
    AssetsHelper.getVulnerabilitySeverityLevel(this.asset())
  );

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.store.dispatch(AssetsActions.loadAsset({ id }));
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(AssetsActions.clearSelectedAsset());
  }

  protected countBySeverity(severity: string): number {
    const currentAsset = this.asset();
    if (!currentAsset) return 0;
    return AssetsHelper.countVulnerabilitiesBySeverity(currentAsset, severity);
  }

  protected goBack(): void {
    this.router.navigate(['/assets']);
  }

  protected getStatusColor(status: string): string {
    return AssetsHelper.getStatusColor(status);
  }

  protected getStatusDisplayName(status: string): string {
    return AssetsHelper.getStatusDisplayName(status);
  }
}
