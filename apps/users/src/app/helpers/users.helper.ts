import { User } from '@angular-micro-frontend/shared';

export abstract class UsersHelper {
  static filterByRole(users: User[], role: string): User[] {
    return users.filter(user => user.role === role);
  }

  static sortByName(users: User[]): User[] {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }

  static sortByLastLogin(users: User[]): User[] {
    return [...users].sort((a, b) => {
      const dateA = new Date(a.lastLogin).getTime();
      const dateB = new Date(b.lastLogin).getTime();
      return dateB - dateA;
    });
  }

  static getUniqueRoles(users: User[]): string[] {
    return Array.from(new Set(users.map(user => user.role)));
  }

  static countByRole(users: User[]): Record<string, number> {
    return users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  static findById(users: User[], id: string): User | undefined {
    return users.find(user => user.id === id);
  }

  static isRecentlyActive(user: User, days: number = 7): boolean {
    const lastLogin = new Date(user.lastLogin);
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days);
    return lastLogin >= daysAgo;
  }

  static getDisplayName(user: User): string {
    return `${user.name} (${user.role})`;
  }

  static isValidUser(user: Partial<User>): boolean {
    return !!(user.id && user.name && user.role && user.lastLogin);
  }
}