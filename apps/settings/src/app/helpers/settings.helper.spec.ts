import { SettingsHelper } from './settings.helper';
import { RandomHelper, Settings } from '@angular-micro-frontend/shared';

describe('SettingsHelper', () => {
  describe('isValidTheme', () => {
    it('should return true for "light" theme', () => {
      const result = SettingsHelper.isValidTheme('light');

      expect(result).toBe(true);
    });

    it('should return true for "dark" theme', () => {
      const result = SettingsHelper.isValidTheme('dark');

      expect(result).toBe(true);
    });

    it('should return true for "auto" theme', () => {
      const result = SettingsHelper.isValidTheme('auto');

      expect(result).toBe(true);
    });

    it('should return false for invalid theme', () => {
      const result = SettingsHelper.isValidTheme('invalid');

      expect(result).toBe(false);
    });
  });

  describe('isValidLanguage', () => {
    it('should return true for "en" language', () => {
      const result = SettingsHelper.isValidLanguage('en');

      expect(result).toBe(true);
    });

    it('should return true for "es" language', () => {
      const result = SettingsHelper.isValidLanguage('es');

      expect(result).toBe(true);
    });

    it('should return false for invalid language', () => {
      const result = SettingsHelper.isValidLanguage('invalid');

      expect(result).toBe(false);
    });
  });

  describe('getDefaultSettings', () => {
    it('should return settings with "light" theme', () => {
      const result = SettingsHelper.getDefaultSettings();

      expect(result.theme).toBe('light');
    });

    it('should return settings with "en" language', () => {
      const result = SettingsHelper.getDefaultSettings();

      expect(result.language).toBe('en');
    });

    it('should return settings with notifications enabled', () => {
      const result = SettingsHelper.getDefaultSettings();

      expect(result.notifications).toBe(true);
    });

    it('should return settings with autoRefresh enabled', () => {
      const result = SettingsHelper.getDefaultSettings();

      expect(result.autoRefresh).toBe(true);
    });
  });

  describe('mergeWithDefaults', () => {
    it('should merge user settings with defaults', () => {
      const userSettings: Partial<Settings> = { theme: 'dark' };
      const result = SettingsHelper.mergeWithDefaults(userSettings);

      expect(result.theme).toBe('dark');
    });

    it('should use defaults for missing properties', () => {
      const userSettings: Partial<Settings> = { theme: 'dark' };
      const result = SettingsHelper.mergeWithDefaults(userSettings);

      expect(result.language).toBe('en');
    });

    it('should preserve user values over defaults', () => {
      const userSettings: Partial<Settings> = { notifications: false };
      const result = SettingsHelper.mergeWithDefaults(userSettings);

      expect(result.notifications).toBe(false);
    });
  });

  describe('isValidSettings', () => {
    it('should return true for valid settings', () => {
      const settings = RandomHelper.randomSettings();
      const result = SettingsHelper.isValidSettings(settings);

      expect(result).toBe(true);
    });

    it('should return false for null settings', () => {
      const result = SettingsHelper.isValidSettings(null as any);

      expect(result).toBe(false);
    });

    it('should return false when theme is invalid', () => {
      const settings = { ...RandomHelper.randomSettings(), theme: 'invalid' };
      const result = SettingsHelper.isValidSettings(settings);

      expect(result).toBe(false);
    });

    it('should return false when language is invalid', () => {
      const settings = { ...RandomHelper.randomSettings(), language: 'invalid' };
      const result = SettingsHelper.isValidSettings(settings);

      expect(result).toBe(false);
    });

    it('should return false when notifications is not boolean', () => {
      const settings: any = { ...RandomHelper.randomSettings(), notifications: 'yes' };
      const result = SettingsHelper.isValidSettings(settings);

      expect(result).toBe(false);
    });
  });

  describe('getThemeDisplayName', () => {
    it('should return "Light Mode" for "light" theme', () => {
      const result = SettingsHelper.getThemeDisplayName('light');

      expect(result).toBe('Light Mode');
    });

    it('should return "Dark Mode" for "dark" theme', () => {
      const result = SettingsHelper.getThemeDisplayName('dark');

      expect(result).toBe('Dark Mode');
    });

    it('should return "Auto (System)" for "auto" theme', () => {
      const result = SettingsHelper.getThemeDisplayName('auto');

      expect(result).toBe('Auto (System)');
    });

    it('should return original value for unknown theme', () => {
      const result = SettingsHelper.getThemeDisplayName('unknown');

      expect(result).toBe('unknown');
    });
  });

  describe('getLanguageDisplayName', () => {
    it('should return "English" for "en" language', () => {
      const result = SettingsHelper.getLanguageDisplayName('en');

      expect(result).toBe('English');
    });

    it('should return "Español" for "es" language', () => {
      const result = SettingsHelper.getLanguageDisplayName('es');

      expect(result).toBe('Español');
    });

    it('should return original value for unknown language', () => {
      const result = SettingsHelper.getLanguageDisplayName('unknown');

      expect(result).toBe('unknown');
    });
  });

  describe('hasChanges', () => {
    it('should return false for identical settings', () => {
      const settings = RandomHelper.randomSettings();
      const result = SettingsHelper.hasChanges(settings, { ...settings });

      expect(result).toBe(false);
    });

    it('should return true when theme changed', () => {
      const original = RandomHelper.randomSettings({ theme: 'light' });
      const updated = { ...original, theme: 'dark' as const };
      const result = SettingsHelper.hasChanges(original, updated);

      expect(result).toBe(true);
    });

    it('should return true when language changed', () => {
      const original = RandomHelper.randomSettings({ language: 'en' });
      const updated = { ...original, language: 'es' };
      const result = SettingsHelper.hasChanges(original, updated);

      expect(result).toBe(true);
    });

    it('should return true when notifications changed', () => {
      const original = RandomHelper.randomSettings({ notifications: true });
      const updated = { ...original, notifications: false };
      const result = SettingsHelper.hasChanges(original, updated);

      expect(result).toBe(true);
    });
  });

  describe('getChangedFields', () => {
    it('should return empty array for identical settings', () => {
      const settings = RandomHelper.randomSettings();
      const result = SettingsHelper.getChangedFields(settings, { ...settings });

      expect(result.length).toBe(0);
    });

    it('should return ["theme"] when only theme changed', () => {
      const original = RandomHelper.randomSettings({ theme: 'light' });
      const updated = { ...original, theme: 'dark' as const };
      const result = SettingsHelper.getChangedFields(original, updated);

      expect(result).toContain('theme');
    });

    it('should return multiple fields when multiple values changed', () => {
      const original = RandomHelper.randomSettings({ theme: 'light', language: 'en' });
      const updated = { ...original, theme: 'dark' as const, language: 'es' };
      const result = SettingsHelper.getChangedFields(original, updated);

      expect(result.length).toBe(2);
    });
  });
});