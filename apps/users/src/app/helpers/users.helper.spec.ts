import { UsersHelper } from './users.helper';
import { RandomHelper, User } from '@angular-micro-frontend/shared';

describe('UsersHelper', () => {
  describe('filterByRole', () => {
    it('should filter users by specified role', () => {
      const users = [
        RandomHelper.randomUser({ role: 'admin' }),
        RandomHelper.randomUser({ role: 'user' }),
        RandomHelper.randomUser({ role: 'admin' })
      ];
      const result = UsersHelper.filterByRole(users, 'admin');

      expect(result.length).toBe(2);
    });

    it('should return empty array when no users match role', () => {
      const users = RandomHelper.randomUsers(3, { role: 'user' });
      const result = UsersHelper.filterByRole(users, 'admin');

      expect(result.length).toBe(0);
    });
  });

  describe('sortByName', () => {
    it('should sort users alphabetically by name', () => {
      const users = [
        RandomHelper.randomUser({ name: 'Charlie' }),
        RandomHelper.randomUser({ name: 'Alice' }),
        RandomHelper.randomUser({ name: 'Bob' })
      ];
      const result = UsersHelper.sortByName(users);

      expect(result[0].name).toBe('Alice');
    });

    it('should not mutate original array', () => {
      const users = RandomHelper.randomUsers(3);
      const original = [...users];
      UsersHelper.sortByName(users);

      expect(users).toEqual(original);
    });
  });

  describe('sortByLastLogin', () => {
    it('should sort users by last login (most recent first)', () => {
      const users = [
        RandomHelper.randomUser({ lastLogin: '2024-01-01T00:00:00.000Z' }),
        RandomHelper.randomUser({ lastLogin: '2024-12-31T00:00:00.000Z' }),
        RandomHelper.randomUser({ lastLogin: '2024-06-15T00:00:00.000Z' })
      ];
      const result = UsersHelper.sortByLastLogin(users);

      expect(result[0].lastLogin).toBe('2024-12-31T00:00:00.000Z');
    });

    it('should not mutate original array', () => {
      const users = RandomHelper.randomUsers(3);
      const original = [...users];
      UsersHelper.sortByLastLogin(users);

      expect(users).toEqual(original);
    });
  });

  describe('getUniqueRoles', () => {
    it('should return unique roles from users array', () => {
      const users = [
        RandomHelper.randomUser({ role: 'admin' }),
        RandomHelper.randomUser({ role: 'user' }),
        RandomHelper.randomUser({ role: 'admin' }),
        RandomHelper.randomUser({ role: 'editor' })
      ];
      const result = UsersHelper.getUniqueRoles(users);

      expect(result.length).toBe(3);
    });

    it('should return empty array for empty users array', () => {
      const result = UsersHelper.getUniqueRoles([]);

      expect(result.length).toBe(0);
    });
  });

  describe('countByRole', () => {
    it('should count users by each role', () => {
      const users = [
        RandomHelper.randomUser({ role: 'admin' }),
        RandomHelper.randomUser({ role: 'user' }),
        RandomHelper.randomUser({ role: 'admin' }),
        RandomHelper.randomUser({ role: 'user' }),
        RandomHelper.randomUser({ role: 'user' })
      ];
      const result = UsersHelper.countByRole(users);

      expect(result['admin']).toBe(2);
    });

    it('should return empty object for empty users array', () => {
      const result = UsersHelper.countByRole([]);

      expect(Object.keys(result).length).toBe(0);
    });
  });

  describe('findById', () => {
    it('should find user by id', () => {
      const targetUser = RandomHelper.randomUser({ id: 'test-123' });
      const users = [RandomHelper.randomUser(), targetUser, RandomHelper.randomUser()];
      const result = UsersHelper.findById(users, 'test-123');

      expect(result).toEqual(targetUser);
    });

    it('should return undefined when user not found', () => {
      const users = RandomHelper.randomUsers(3);
      const result = UsersHelper.findById(users, 'non-existent-id');

      expect(result).toBeUndefined();
    });
  });

  describe('isRecentlyActive', () => {
    it('should return true for user active within specified days', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const user = RandomHelper.randomUser({ lastLogin: yesterday.toISOString() });
      const result = UsersHelper.isRecentlyActive(user, 7);

      expect(result).toBe(true);
    });

    it('should return false for user not active within specified days', () => {
      const user = RandomHelper.randomUser({ lastLogin: '2020-01-01T00:00:00.000Z' });
      const result = UsersHelper.isRecentlyActive(user, 7);

      expect(result).toBe(false);
    });

    it('should use 7 days as default when days not specified', () => {
      const sixDaysAgo = new Date();
      sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
      const user = RandomHelper.randomUser({ lastLogin: sixDaysAgo.toISOString() });
      const result = UsersHelper.isRecentlyActive(user);

      expect(result).toBe(true);
    });
  });

  describe('getDisplayName', () => {
    it('should format user display name with role', () => {
      const user = RandomHelper.randomUser({ name: 'John Doe', role: 'admin' });
      const result = UsersHelper.getDisplayName(user);

      expect(result).toBe('John Doe (admin)');
    });
  });

  describe('isValidUser', () => {
    it('should return true for valid user object', () => {
      const user = RandomHelper.randomUser();
      const result = UsersHelper.isValidUser(user);

      expect(result).toBe(true);
    });

    it('should return false when id is missing', () => {
      const user: Partial<User> = { name: 'John', role: 'admin', lastLogin: '2024-01-01' };
      const result = UsersHelper.isValidUser(user);

      expect(result).toBe(false);
    });

    it('should return false when name is missing', () => {
      const user: Partial<User> = { id: '123', role: 'admin', lastLogin: '2024-01-01' };
      const result = UsersHelper.isValidUser(user);

      expect(result).toBe(false);
    });

    it('should return false when role is missing', () => {
      const user: Partial<User> = { id: '123', name: 'John', lastLogin: '2024-01-01' };
      const result = UsersHelper.isValidUser(user);

      expect(result).toBe(false);
    });

    it('should return false when lastLogin is missing', () => {
      const user: Partial<User> = { id: '123', name: 'John', role: 'admin' };
      const result = UsersHelper.isValidUser(user);

      expect(result).toBe(false);
    });
  });
});