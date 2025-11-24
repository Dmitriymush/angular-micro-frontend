import { User, DashboardStats, Finding, Settings, Asset } from '../models';
export declare abstract class RandomHelper {
    static randomString(length?: number): string;
    static randomNumber(min: number, max: number): number;
    static randomBoolean(): boolean;
    static randomElement<T>(array: readonly T[]): T;
    static randomDate(startYear?: number, endYear?: number): string;
    static randomUser(overrides?: Partial<User>): User;
    static randomUsers(count: number, overrides?: Partial<User>): User[];
    static randomFinding(overrides?: Partial<Finding>): Finding;
    static randomFindings(count: number, overrides?: Partial<Finding>): Finding[];
    static randomDashboardStats(overrides?: Partial<DashboardStats>): DashboardStats;
    static randomSettings(overrides?: Partial<Settings>): Settings;
    static randomAsset(overrides?: Partial<Asset>): Asset;
    static randomAssets(count: number, overrides?: Partial<Asset>): Asset[];
    static randomVulnerability(overrides?: Partial<import('../models').Vulnerability>): import('../models').Vulnerability;
    static randomVulnerabilities(count: number, overrides?: Partial<import('../models').Vulnerability>): import('../models').Vulnerability[];
    static createSeededRandom(seed: number): () => number;
}
//# sourceMappingURL=random.helper.d.ts.map