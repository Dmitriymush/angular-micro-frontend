import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardService } from '@angular-micro-frontend/api';
import { DashboardStats } from '@angular-micro-frontend/shared';
import { DashboardHelper } from '../../helpers/dashboard.helper';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  protected readonly stats = signal<DashboardStats | null>(null);
  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  protected readonly activeAssetsPercentage = computed(() =>
    DashboardHelper.getActiveAssetsPercentage(this.stats())
  );

  protected readonly criticalFindingsPercentage = computed(() =>
    DashboardHelper.getCriticalFindingsPercentage(this.stats())
  );

  protected readonly hasCriticalAlerts = computed(() =>
    DashboardHelper.hasCriticalAlerts(this.stats())
  );

  protected readonly severityLevel = computed(() =>
    DashboardHelper.getSeverityLevel(this.stats())
  );

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  private loadDashboardStats(): void {
    this.loading.set(true);
    this.error.set(null);

    this.dashboardService
      .getStats()
      .subscribe({
        next: (stats) => {
          this.stats.set(stats);
          this.loading.set(false);
        },
        error: (err: Error) => {
          this.error.set('Failed to load dashboard statistics. Please try again later.');
          this.loading.set(false);
          console.error('Dashboard stats loading error:', err);
        }
      });
  }
}
