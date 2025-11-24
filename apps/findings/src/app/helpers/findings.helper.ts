import { Finding } from '@angular-micro-frontend/shared';

export abstract class FindingsHelper {
  static filterByStatus(findings: Finding[], status: string): Finding[] {
    return findings.filter(finding => finding.status === status);
  }

  static filterBySeverity(findings: Finding[], severity: string): Finding[] {
    return findings.filter(finding => finding.severity === severity);
  }

  static getOpenFindings(findings: Finding[]): Finding[] {
    return findings.filter(finding => finding.status === 'open');
  }

  static getCriticalFindings(findings: Finding[]): Finding[] {
    return findings.filter(finding => finding.severity === 'critical');
  }

  static sortBySeverity(findings: Finding[]): Finding[] {
    const severityOrder: Record<string, number> = {
      critical: 4,
      high: 3,
      medium: 2,
      low: 1
    };

    return [...findings].sort((a, b) => {
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  }

  static groupBySeverity(findings: Finding[]): Record<string, Finding[]> {
    return findings.reduce((acc, finding) => {
      if (!acc[finding.severity]) {
        acc[finding.severity] = [];
      }
      acc[finding.severity].push(finding);
      return acc;
    }, {} as Record<string, Finding[]>);
  }

  static countByStatus(findings: Finding[]): Record<string, number> {
    return findings.reduce((acc, finding) => {
      acc[finding.status] = (acc[finding.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  static getSeverityColor(severity: string): string {
    const colors: Record<string, string> = {
      critical: '#f44336',
      high: '#ff9800',
      medium: '#ff9800',
      low: '#4caf50'
    };
    return colors[severity] || '#9e9e9e';
  }

  static getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      open: '#f44336',
      'in-progress': '#ff9800',
      resolved: '#4caf50',
      closed: '#9e9e9e'
    };
    return colors[status] || '#9e9e9e';
  }

  static isCriticalAndOpen(finding: Finding): boolean {
    return finding.severity === 'critical' && finding.status === 'open';
  }

  static isValidFinding(finding: Partial<Finding>): boolean {
    return !!(
      finding.id &&
      finding.title &&
      finding.severity &&
      finding.status
    );
  }
}