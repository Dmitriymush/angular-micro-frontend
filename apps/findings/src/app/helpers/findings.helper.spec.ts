import { FindingsHelper } from './findings.helper';
import { RandomHelper, Finding } from '@angular-micro-frontend/shared';

describe('FindingsHelper', () => {
  describe('filterByStatus', () => {
    it('should filter findings by specified status', () => {
      const findings = [
        RandomHelper.randomFinding({ status: 'open' }),
        RandomHelper.randomFinding({ status: 'resolved' }),
        RandomHelper.randomFinding({ status: 'open' })
      ];
      const result = FindingsHelper.filterByStatus(findings, 'open');

      expect(result.length).toBe(2);
    });
  });

  describe('filterBySeverity', () => {
    it('should filter findings by specified severity', () => {
      const findings = [
        RandomHelper.randomFinding({ severity: 'critical' }),
        RandomHelper.randomFinding({ severity: 'low' }),
        RandomHelper.randomFinding({ severity: 'critical' })
      ];
      const result = FindingsHelper.filterBySeverity(findings, 'critical');

      expect(result.length).toBe(2);
    });
  });

  describe('getOpenFindings', () => {
    it('should return only open findings', () => {
      const findings = [
        RandomHelper.randomFinding({ status: 'open' }),
        RandomHelper.randomFinding({ status: 'resolved' }),
        RandomHelper.randomFinding({ status: 'open' })
      ];
      const result = FindingsHelper.getOpenFindings(findings);

      expect(result.length).toBe(2);
    });
  });

  describe('getCriticalFindings', () => {
    it('should return only critical findings', () => {
      const findings = [
        RandomHelper.randomFinding({ severity: 'critical' }),
        RandomHelper.randomFinding({ severity: 'low' }),
        RandomHelper.randomFinding({ severity: 'critical' })
      ];
      const result = FindingsHelper.getCriticalFindings(findings);

      expect(result.length).toBe(2);
    });
  });

  describe('sortBySeverity', () => {
    it('should sort findings with critical first', () => {
      const findings = [
        RandomHelper.randomFinding({ severity: 'low' }),
        RandomHelper.randomFinding({ severity: 'critical' }),
        RandomHelper.randomFinding({ severity: 'medium' }),
        RandomHelper.randomFinding({ severity: 'high' })
      ];
      const result = FindingsHelper.sortBySeverity(findings);

      expect(result[0].severity).toBe('critical');
    });

    it('should not mutate original array', () => {
      const findings = RandomHelper.randomFindings(3);
      const original = [...findings];
      FindingsHelper.sortBySeverity(findings);

      expect(findings).toEqual(original);
    });
  });

  describe('groupBySeverity', () => {
    it('should group findings by severity', () => {
      const findings = [
        RandomHelper.randomFinding({ severity: 'critical' }),
        RandomHelper.randomFinding({ severity: 'low' }),
        RandomHelper.randomFinding({ severity: 'critical' })
      ];
      const result = FindingsHelper.groupBySeverity(findings);

      expect(result['critical'].length).toBe(2);
    });

    it('should return empty object for empty array', () => {
      const result = FindingsHelper.groupBySeverity([]);

      expect(Object.keys(result).length).toBe(0);
    });
  });

  describe('countByStatus', () => {
    it('should count findings by status', () => {
      const findings = [
        RandomHelper.randomFinding({ status: 'open' }),
        RandomHelper.randomFinding({ status: 'open' }),
        RandomHelper.randomFinding({ status: 'resolved' })
      ];
      const result = FindingsHelper.countByStatus(findings);

      expect(result['open']).toBe(2);
    });
  });

  describe('getSeverityColor', () => {
    it('should return red color for critical severity', () => {
      const result = FindingsHelper.getSeverityColor('critical');

      expect(result).toBe('#f44336');
    });

    it('should return orange color for high severity', () => {
      const result = FindingsHelper.getSeverityColor('high');

      expect(result).toBe('#ff9800');
    });

    it('should return green color for low severity', () => {
      const result = FindingsHelper.getSeverityColor('low');

      expect(result).toBe('#4caf50');
    });

    it('should return gray for unknown severity', () => {
      const result = FindingsHelper.getSeverityColor('unknown');

      expect(result).toBe('#9e9e9e');
    });
  });

  describe('getStatusColor', () => {
    it('should return red color for open status', () => {
      const result = FindingsHelper.getStatusColor('open');

      expect(result).toBe('#f44336');
    });

    it('should return green color for resolved status', () => {
      const result = FindingsHelper.getStatusColor('resolved');

      expect(result).toBe('#4caf50');
    });

    it('should return gray for unknown status', () => {
      const result = FindingsHelper.getStatusColor('unknown');

      expect(result).toBe('#9e9e9e');
    });
  });

  describe('isCriticalAndOpen', () => {
    it('should return true for critical and open finding', () => {
      const finding = RandomHelper.randomFinding({ severity: 'critical', status: 'open' });
      const result = FindingsHelper.isCriticalAndOpen(finding);

      expect(result).toBe(true);
    });

    it('should return false for critical but resolved finding', () => {
      const finding = RandomHelper.randomFinding({ severity: 'critical', status: 'resolved' });
      const result = FindingsHelper.isCriticalAndOpen(finding);

      expect(result).toBe(false);
    });

    it('should return false for low severity but open finding', () => {
      const finding = RandomHelper.randomFinding({ severity: 'low', status: 'open' });
      const result = FindingsHelper.isCriticalAndOpen(finding);

      expect(result).toBe(false);
    });
  });

  describe('isValidFinding', () => {
    it('should return true for valid finding object', () => {
      const finding = RandomHelper.randomFinding();
      const result = FindingsHelper.isValidFinding(finding);

      expect(result).toBe(true);
    });

    it('should return false when id is missing', () => {
      const finding: Partial<Finding> = { title: 'Test', severity: 'low', status: 'open' };
      const result = FindingsHelper.isValidFinding(finding);

      expect(result).toBe(false);
    });

    it('should return false when title is missing', () => {
      const finding: Partial<Finding> = { id: '123', severity: 'low', status: 'open' };
      const result = FindingsHelper.isValidFinding(finding);

      expect(result).toBe(false);
    });
  });
});