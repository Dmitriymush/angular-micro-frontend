import { AssetsHelper } from './assets.helper';
import { RandomHelper } from '@angular-micro-frontend/shared';
import { Asset, AssetWithVulnerabilities } from '@angular-micro-frontend/shared';

describe('AssetsHelper', () => {
  describe('filterByStatus', () => {
    it('should filter assets by specified status', () => {
      const assets = [
        RandomHelper.randomAsset({ status: 'active' }),
        RandomHelper.randomAsset({ status: 'inactive' }),
        RandomHelper.randomAsset({ status: 'active' })
      ];
      const result = AssetsHelper.filterByStatus(assets, 'active');

      expect(result.length).toBe(2);
    });
  });

  describe('filterBySearchTerm', () => {
    it('should filter assets by name', () => {
      const assets = [
        RandomHelper.randomAsset({ name: 'Server-1' }),
        RandomHelper.randomAsset({ name: 'Database-1' }),
        RandomHelper.randomAsset({ name: 'Server-2' })
      ];
      const result = AssetsHelper.filterBySearchTerm(assets, 'server');

      expect(result.length).toBe(2);
    });

    it('should return all assets when search term is empty', () => {
      const assets = RandomHelper.randomAssets(3);
      const result = AssetsHelper.filterBySearchTerm(assets, '');

      expect(result.length).toBe(3);
    });
  });

  describe('applyFilters', () => {
    it('should apply both status and search filters', () => {
      const assets = [
        RandomHelper.randomAsset({ name: 'Server-1', status: 'active' }),
        RandomHelper.randomAsset({ name: 'Server-2', status: 'inactive' }),
        RandomHelper.randomAsset({ name: 'Database-1', status: 'active' })
      ];
      const result = AssetsHelper.applyFilters(assets, 'server', 'active');

      expect(result.length).toBe(1);
    });

    it('should return all assets when filter is "all"', () => {
      const assets = RandomHelper.randomAssets(3);
      const result = AssetsHelper.applyFilters(assets, '', 'all');

      expect(result.length).toBe(3);
    });
  });

  describe('sortByName', () => {
    it('should sort assets alphabetically by name', () => {
      const assets = [
        RandomHelper.randomAsset({ name: 'Zebra' }),
        RandomHelper.randomAsset({ name: 'Apple' }),
        RandomHelper.randomAsset({ name: 'Mango' })
      ];
      const result = AssetsHelper.sortByName(assets);

      expect(result[0].name).toBe('Apple');
    });

    it('should not mutate original array', () => {
      const assets = RandomHelper.randomAssets(3);
      const original = [...assets];
      AssetsHelper.sortByName(assets);

      expect(assets).toEqual(original);
    });
  });

  describe('sortByOwner', () => {
    it('should sort assets alphabetically by owner', () => {
      const assets = [
        RandomHelper.randomAsset({ owner: 'Zoe' }),
        RandomHelper.randomAsset({ owner: 'Alice' }),
        RandomHelper.randomAsset({ owner: 'Bob' })
      ];
      const result = AssetsHelper.sortByOwner(assets);

      expect(result[0].owner).toBe('Alice');
    });
  });

  describe('getUniqueStatuses', () => {
    it('should return unique statuses from asset list', () => {
      const assets = [
        RandomHelper.randomAsset({ status: 'active' }),
        RandomHelper.randomAsset({ status: 'inactive' }),
        RandomHelper.randomAsset({ status: 'active' })
      ];
      const result = AssetsHelper.getUniqueStatuses(assets);

      expect(result.length).toBe(2);
    });
  });

  describe('countByStatus', () => {
    it('should count assets by status', () => {
      const assets = [
        RandomHelper.randomAsset({ status: 'active' }),
        RandomHelper.randomAsset({ status: 'active' }),
        RandomHelper.randomAsset({ status: 'inactive' })
      ];
      const result = AssetsHelper.countByStatus(assets);

      expect(result['active']).toBe(2);
    });
  });

  describe('findById', () => {
    it('should find asset by ID', () => {
      const asset = RandomHelper.randomAsset({ id: 'test-123' });
      const assets = [asset, RandomHelper.randomAsset()];
      const result = AssetsHelper.findById(assets, 'test-123');

      expect(result).toBe(asset);
    });

    it('should return undefined when asset not found', () => {
      const assets = RandomHelper.randomAssets(2);
      const result = AssetsHelper.findById(assets, 'nonexistent');

      expect(result).toBeUndefined();
    });
  });

  describe('isValidAsset', () => {
    it('should return true for valid asset', () => {
      const asset = RandomHelper.randomAsset();
      const result = AssetsHelper.isValidAsset(asset);

      expect(result).toBe(true);
    });

    it('should return false when id is missing', () => {
      const asset: Partial<Asset> = { name: 'Test', status: 'active', owner: 'Admin' };
      const result = AssetsHelper.isValidAsset(asset);

      expect(result).toBe(false);
    });

    it('should return false for null', () => {
      const result = AssetsHelper.isValidAsset(null);

      expect(result).toBe(false);
    });
  });

  describe('getStatusColor', () => {
    it('should return green for active status', () => {
      const result = AssetsHelper.getStatusColor('active');

      expect(result).toBe('#4caf50');
    });

    it('should return gray for unknown status', () => {
      const result = AssetsHelper.getStatusColor('unknown');

      expect(result).toBe('#9e9e9e');
    });
  });

  describe('getStatusDisplayName', () => {
    it('should return "Active" for active status', () => {
      const result = AssetsHelper.getStatusDisplayName('active');

      expect(result).toBe('Active');
    });

    it('should return original value for unknown status', () => {
      const result = AssetsHelper.getStatusDisplayName('unknown');

      expect(result).toBe('unknown');
    });
  });

  describe('countVulnerabilitiesBySeverity', () => {
    it('should count vulnerabilities by severity', () => {
      const asset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: [
          RandomHelper.randomVulnerability({ severity: 'critical' }),
          RandomHelper.randomVulnerability({ severity: 'low' }),
          RandomHelper.randomVulnerability({ severity: 'critical' })
        ]
      };
      const result = AssetsHelper.countVulnerabilitiesBySeverity(asset, 'critical');

      expect(result).toBe(2);
    });

    it('should return 0 for asset without vulnerabilities', () => {
      const asset = { ...RandomHelper.randomAsset(), vulnerabilities: [] };
      const result = AssetsHelper.countVulnerabilitiesBySeverity(asset, 'critical');

      expect(result).toBe(0);
    });
  });

  describe('getTotalVulnerabilities', () => {
    it('should return total vulnerability count', () => {
      const asset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: RandomHelper.randomVulnerabilities(5)
      };
      const result = AssetsHelper.getTotalVulnerabilities(asset);

      expect(result).toBe(5);
    });

    it('should return 0 for null asset', () => {
      const result = AssetsHelper.getTotalVulnerabilities(null);

      expect(result).toBe(0);
    });
  });

  describe('hasCriticalVulnerabilities', () => {
    it('should return true when asset has critical vulnerabilities', () => {
      const asset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: [RandomHelper.randomVulnerability({ severity: 'critical' })]
      };
      const result = AssetsHelper.hasCriticalVulnerabilities(asset);

      expect(result).toBe(true);
    });

    it('should return false when asset has no critical vulnerabilities', () => {
      const asset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: [RandomHelper.randomVulnerability({ severity: 'low' })]
      };
      const result = AssetsHelper.hasCriticalVulnerabilities(asset);

      expect(result).toBe(false);
    });
  });

  describe('getVulnerabilitySeverityLevel', () => {
    it('should return "critical" when critical vulnerabilities exist', () => {
      const asset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: [
          RandomHelper.randomVulnerability({ severity: 'critical' }),
          RandomHelper.randomVulnerability({ severity: 'low' })
        ]
      };
      const result = AssetsHelper.getVulnerabilitySeverityLevel(asset);

      expect(result).toBe('critical');
    });

    it('should return "none" for null asset', () => {
      const result = AssetsHelper.getVulnerabilitySeverityLevel(null);

      expect(result).toBe('none');
    });

    it('should return "none" for asset without vulnerabilities', () => {
      const asset = { ...RandomHelper.randomAsset(), vulnerabilities: [] };
      const result = AssetsHelper.getVulnerabilitySeverityLevel(asset);

      expect(result).toBe('none');
    });
  });
});
