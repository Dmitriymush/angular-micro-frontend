import { DashboardHelper } from './dashboard.helper';
import { RandomHelper } from '@angular-micro-frontend/shared';
import { DashboardStats } from '../models';

describe('DashboardHelper', () => {
  describe('getTotalAssets', () => {
    it('should return total assets from valid stats', () => {
      const stats = RandomHelper.randomDashboardStats({ totalAssets: 100 });
      const result = DashboardHelper.getTotalAssets(stats);

      expect(result).toBe(100);
    });

    it('should return 0 for null stats', () => {
      const result = DashboardHelper.getTotalAssets(null);

      expect(result).toBe(0);
    });
  });

  describe('getActiveAssetsPercentage', () => {
    it('should calculate correct percentage for valid stats', () => {
      const stats = RandomHelper.randomDashboardStats({ totalAssets: 100, activeAssets: 75 });
      const result = DashboardHelper.getActiveAssetsPercentage(stats);

      expect(result).toBe(75);
    });

    it('should return 0 for null stats', () => {
      const result = DashboardHelper.getActiveAssetsPercentage(null);

      expect(result).toBe(0);
    });

    it('should return 0 when total assets is 0', () => {
      const stats = RandomHelper.randomDashboardStats({ totalAssets: 0, activeAssets: 0 });
      const result = DashboardHelper.getActiveAssetsPercentage(stats);

      expect(result).toBe(0);
    });

    it('should round percentage to nearest integer', () => {
      const stats = RandomHelper.randomDashboardStats({ totalAssets: 3, activeAssets: 2 });
      const result = DashboardHelper.getActiveAssetsPercentage(stats);

      expect(result).toBe(67);
    });
  });

  describe('getCriticalFindingsPercentage', () => {
    it('should calculate correct percentage for valid stats', () => {
      const stats = RandomHelper.randomDashboardStats({ openFindings: 100, criticalFindings: 25 });
      const result = DashboardHelper.getCriticalFindingsPercentage(stats);

      expect(result).toBe(25);
    });

    it('should return 0 for null stats', () => {
      const result = DashboardHelper.getCriticalFindingsPercentage(null);

      expect(result).toBe(0);
    });

    it('should return 0 when open findings is 0', () => {
      const stats = RandomHelper.randomDashboardStats({ openFindings: 0, criticalFindings: 0 });
      const result = DashboardHelper.getCriticalFindingsPercentage(stats);

      expect(result).toBe(0);
    });
  });

  describe('hasCriticalAlerts', () => {
    it('should return true when critical findings exist', () => {
      const stats = RandomHelper.randomDashboardStats({ criticalFindings: 5 });
      const result = DashboardHelper.hasCriticalAlerts(stats);

      expect(result).toBe(true);
    });

    it('should return false when no critical findings', () => {
      const stats = RandomHelper.randomDashboardStats({ criticalFindings: 0 });
      const result = DashboardHelper.hasCriticalAlerts(stats);

      expect(result).toBe(false);
    });

    it('should return false for null stats', () => {
      const result = DashboardHelper.hasCriticalAlerts(null);

      expect(result).toBe(false);
    });
  });

  describe('getSeverityLevel', () => {
    it('should return "low" for 0 critical findings', () => {
      const stats = RandomHelper.randomDashboardStats({ criticalFindings: 0 });
      const result = DashboardHelper.getSeverityLevel(stats);

      expect(result).toBe('low');
    });

    it('should return "medium" for 1-5 critical findings', () => {
      const stats = RandomHelper.randomDashboardStats({ criticalFindings: 3 });
      const result = DashboardHelper.getSeverityLevel(stats);

      expect(result).toBe('medium');
    });

    it('should return "high" for 6-10 critical findings', () => {
      const stats = RandomHelper.randomDashboardStats({ criticalFindings: 8 });
      const result = DashboardHelper.getSeverityLevel(stats);

      expect(result).toBe('high');
    });

    it('should return "critical" for more than 10 critical findings', () => {
      const stats = RandomHelper.randomDashboardStats({ criticalFindings: 15 });
      const result = DashboardHelper.getSeverityLevel(stats);

      expect(result).toBe('critical');
    });

    it('should return "low" for null stats', () => {
      const result = DashboardHelper.getSeverityLevel(null);

      expect(result).toBe('low');
    });
  });

  describe('getStatsSummary', () => {
    it('should return formatted summary for valid stats', () => {
      const stats: DashboardStats = {
        totalUsers: 50,
        totalAssets: 100,
        activeAssets: 75,
        openFindings: 20,
        criticalFindings: 5
      };
      const result = DashboardHelper.getStatsSummary(stats);

      expect(result).toBe('50 users, 100 assets, 20 findings');
    });

    it('should return "No data available" for null stats', () => {
      const result = DashboardHelper.getStatsSummary(null);

      expect(result).toBe('No data available');
    });
  });
});