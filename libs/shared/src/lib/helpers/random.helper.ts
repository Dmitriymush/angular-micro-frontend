import { User, DashboardStats, Finding, Settings, Asset } from '../models';

export abstract class RandomHelper {
  static randomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomBoolean(): boolean {
    return Math.random() >= 0.5;
  }

  static randomElement<T>(array: readonly T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  static randomDate(startYear: number = 2020, endYear: number = 2025): string {
    const start = new Date(startYear, 0, 1).getTime();
    const end = new Date(endYear, 11, 31).getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime).toISOString();
  }

  static randomUser(overrides?: Partial<User>): User {
    const roles = ['admin', 'user', 'viewer', 'editor'];
    const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];

    return {
      id: this.randomString(8),
      name: `${this.randomElement(firstNames)} ${this.randomElement(lastNames)}`,
      role: this.randomElement(roles),
      lastLogin: this.randomDate(),
      ...overrides
    };
  }

  static randomUsers(count: number, overrides?: Partial<User>): User[] {
    return Array.from({ length: count }, () => this.randomUser(overrides));
  }

  static randomFinding(overrides?: Partial<Finding>): Finding {
    const severities = ['low', 'medium', 'high', 'critical'] as const;
    const statuses = ['open', 'resolved'] as const;
    const titles = [
      'SQL Injection Vulnerability',
      'Cross-Site Scripting (XSS)',
      'Broken Authentication',
      'Sensitive Data Exposure',
      'XML External Entities',
      'Broken Access Control'
    ];

    return {
      id: this.randomString(8),
      title: this.randomElement(titles),
      severity: this.randomElement(severities),
      status: this.randomElement(statuses),
      assetId: this.randomString(6),
      ...overrides
    };
  }

  static randomFindings(count: number, overrides?: Partial<Finding>): Finding[] {
    return Array.from({ length: count }, () => this.randomFinding(overrides));
  }

  static randomDashboardStats(overrides?: Partial<DashboardStats>): DashboardStats {
    const totalAssets = this.randomNumber(50, 500);
    const activeAssets = this.randomNumber(0, totalAssets);
    const openFindings = this.randomNumber(0, 100);
    const criticalFindings = this.randomNumber(0, openFindings);

    return {
      totalUsers: this.randomNumber(10, 1000),
      totalAssets,
      activeAssets,
      openFindings,
      criticalFindings,
      ...overrides
    };
  }

  static randomSettings(overrides?: Partial<Settings>): Settings {
    const themes = ['light', 'dark', 'auto'];
    const languages = ['en', 'es', 'fr', 'de', 'ja', 'zh'];

    return {
      theme: this.randomElement(themes),
      language: this.randomElement(languages),
      notifications: this.randomBoolean(),
      autoRefresh: this.randomBoolean(),
      ...overrides
    };
  }

  static randomAsset(overrides?: Partial<Asset>): Asset {
    const statuses = ['active', 'inactive', 'maintenance'];
    const owners = ['Alice Johnson', 'Bob Smith', 'Charlie Davis', 'Diana Wilson', 'Eve Martinez', 'Frank Brown'];

    return {
      id: this.randomString(8),
      name: `Asset-${this.randomString(4)}`,
      status: this.randomElement(statuses),
      owner: this.randomElement(owners),
      ...overrides
    };
  }

  static randomAssets(count: number, overrides?: Partial<Asset>): Asset[] {
    return Array.from({ length: count }, () => this.randomAsset(overrides));
  }

  static randomVulnerability(overrides?: Partial<import('../models').Vulnerability>): import('../models').Vulnerability {
    const severities = ['low', 'medium', 'high', 'critical'] as const;
    const descriptions = [
      'Buffer overflow in legacy system',
      'SQL injection vulnerability detected',
      'Cross-site scripting vulnerability',
      'Insecure authentication mechanism',
      'Weak encryption algorithm',
      'Missing access control'
    ];

    return {
      id: this.randomString(8),
      severity: this.randomElement(severities),
      description: this.randomElement(descriptions),
      ...overrides
    };
  }

  static randomVulnerabilities(count: number, overrides?: Partial<import('../models').Vulnerability>): import('../models').Vulnerability[] {
    return Array.from({ length: count }, () => this.randomVulnerability(overrides));
  }

  static createSeededRandom(seed: number): () => number {
    let currentSeed = seed;
    return function() {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      return currentSeed / 233280;
    };
  }
}