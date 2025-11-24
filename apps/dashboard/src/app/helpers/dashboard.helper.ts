import { DashboardStats } from '@angular-micro-frontend/shared';

export abstract class DashboardHelper {
  static getTotalAssets(stats: DashboardStats | null): number {
    if (!stats) return 0;
    return stats.totalAssets;
  }

  static getActiveAssetsPercentage(stats: DashboardStats | null): number {
    if (!stats || stats.totalAssets === 0) return 0;
    return Math.round((stats.activeAssets / stats.totalAssets) * 100);
  }

  static getCriticalFindingsPercentage(stats: DashboardStats | null): number {
    if (!stats || stats.openFindings === 0) return 0;
    return Math.round((stats.criticalFindings / stats.openFindings) * 100);
  }

  static hasCriticalAlerts(stats: DashboardStats | null): boolean {
    if (!stats) return false;
    return stats.criticalFindings > 0;
  }

  static getSeverityLevel(stats: DashboardStats | null): 'low' | 'medium' | 'high' | 'critical' {
    if (!stats) return 'low';

    const criticalCount = stats.criticalFindings;
    if (criticalCount === 0) return 'low';
    if (criticalCount <= 5) return 'medium';
    if (criticalCount <= 10) return 'high';
    return 'critical';
  }

  static getStatsSummary(stats: DashboardStats | null): string {
    if (!stats) return 'No data available';

    return `${stats.totalUsers} users, ${stats.totalAssets} assets, ${stats.openFindings} findings`;
  }
}
