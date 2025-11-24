import { Asset, AssetWithVulnerabilities } from '@angular-micro-frontend/shared';

export abstract class AssetsHelper {
  static filterByStatus(assets: Asset[], status: string): Asset[] {
    return assets.filter(asset => asset.status === status);
  }

  static filterBySearchTerm(assets: Asset[], searchTerm: string): Asset[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return assets;
    }
    const term = searchTerm.toLowerCase().trim();
    return assets.filter(asset =>
      asset.name.toLowerCase().includes(term) ||
      asset.owner.toLowerCase().includes(term)
    );
  }

  static applyFilters(
    assets: Asset[],
    searchTerm: string,
    statusFilter: string
  ): Asset[] {
    let filtered = assets;

    if (statusFilter !== 'all') {
      filtered = this.filterByStatus(filtered, statusFilter);
    }

    filtered = this.filterBySearchTerm(filtered, searchTerm);

    return filtered;
  }

  static sortByName(assets: Asset[]): Asset[] {
    return [...assets].sort((a, b) => a.name.localeCompare(b.name));
  }

  static sortByOwner(assets: Asset[]): Asset[] {
    return [...assets].sort((a, b) => a.owner.localeCompare(b.owner));
  }

  static getUniqueStatuses(assets: Asset[]): string[] {
    return Array.from(new Set(assets.map(asset => asset.status)));
  }

  static countByStatus(assets: Asset[]): Record<string, number> {
    return assets.reduce((acc, asset) => {
      acc[asset.status] = (acc[asset.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  static findById(assets: Asset[], id: string): Asset | undefined {
    return assets.find(asset => asset.id === id);
  }

  static isValidAsset(asset: any): asset is Asset {
    return !!(
      asset &&
      typeof asset === 'object' &&
      typeof asset.id === 'string' &&
      typeof asset.name === 'string' &&
      typeof asset.status === 'string' &&
      typeof asset.owner === 'string'
    );
  }

  static getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      active: '#4caf50',
      inactive: '#9e9e9e',
      maintenance: '#ff9800'
    };
    return colors[status] || '#9e9e9e';
  }

  static getStatusDisplayName(status: string): string {
    const names: Record<string, string> = {
      active: 'Active',
      inactive: 'Inactive',
      maintenance: 'Maintenance'
    };
    return names[status] || status;
  }

  static countVulnerabilitiesBySeverity(
    asset: AssetWithVulnerabilities,
    severity: string
  ): number {
    if (!asset || !asset.vulnerabilities) return 0;
    return asset.vulnerabilities.filter(v => v.severity === severity).length;
  }

  static getTotalVulnerabilities(asset: AssetWithVulnerabilities | null): number {
    if (!asset || !asset.vulnerabilities) return 0;
    return asset.vulnerabilities.length;
  }

  static hasCriticalVulnerabilities(asset: AssetWithVulnerabilities): boolean {
    return this.countVulnerabilitiesBySeverity(asset, 'critical') > 0;
  }

  static getVulnerabilitySeverityLevel(
    asset: AssetWithVulnerabilities | null
  ): 'none' | 'low' | 'medium' | 'high' | 'critical' {
    if (!asset || !asset.vulnerabilities || asset.vulnerabilities.length === 0) {
      return 'none';
    }

    const hasCritical = asset.vulnerabilities.some(v => v.severity === 'critical');
    if (hasCritical) return 'critical';

    const hasHigh = asset.vulnerabilities.some(v => v.severity === 'high');
    if (hasHigh) return 'high';

    const hasMedium = asset.vulnerabilities.some(v => v.severity === 'medium');
    if (hasMedium) return 'medium';

    return 'low';
  }
}
