export class RandomHelper {
    static randomString(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static randomBoolean() {
        return Math.random() >= 0.5;
    }
    static randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    static randomDate(startYear = 2020, endYear = 2025) {
        const start = new Date(startYear, 0, 1).getTime();
        const end = new Date(endYear, 11, 31).getTime();
        const randomTime = start + Math.random() * (end - start);
        return new Date(randomTime).toISOString();
    }
    static randomUser(overrides) {
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
    static randomUsers(count, overrides) {
        return Array.from({ length: count }, () => this.randomUser(overrides));
    }
    static randomFinding(overrides) {
        const severities = ['low', 'medium', 'high', 'critical'];
        const statuses = ['open', 'resolved'];
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
    static randomFindings(count, overrides) {
        return Array.from({ length: count }, () => this.randomFinding(overrides));
    }
    static randomDashboardStats(overrides) {
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
    static randomSettings(overrides) {
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
    static randomAsset(overrides) {
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
    static randomAssets(count, overrides) {
        return Array.from({ length: count }, () => this.randomAsset(overrides));
    }
    static randomVulnerability(overrides) {
        const severities = ['low', 'medium', 'high', 'critical'];
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
    static randomVulnerabilities(count, overrides) {
        return Array.from({ length: count }, () => this.randomVulnerability(overrides));
    }
    static createSeededRandom(seed) {
        let currentSeed = seed;
        return function () {
            currentSeed = (currentSeed * 9301 + 49297) % 233280;
            return currentSeed / 233280;
        };
    }
}
//# sourceMappingURL=random.helper.js.map