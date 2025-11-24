import { Settings } from '@angular-micro-frontend/shared';

export abstract class SettingsHelper {
  static isValidTheme(theme: string): boolean {
    const validThemes = ['light', 'dark', 'auto'];
    return validThemes.includes(theme);
  }

  static isValidLanguage(language: string): boolean {
    const validLanguages = ['en', 'es', 'fr', 'de', 'ja', 'zh'];
    return validLanguages.includes(language);
  }

  static getDefaultSettings(): Settings {
    return {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoRefresh: true
    };
  }

  static mergeWithDefaults(userSettings: Partial<Settings>): Settings {
    return {
      ...this.getDefaultSettings(),
      ...userSettings
    };
  }

  static isValidSettings(settings: Partial<Settings>): boolean {
    if (!settings) return false;

    // Check if theme exists and is valid
    if (settings.theme !== undefined && !this.isValidTheme(settings.theme)) {
      return false;
    }

    // Check if language exists and is valid
    if (settings.language !== undefined && !this.isValidLanguage(settings.language)) {
      return false;
    }

    // For complete validation, all fields must be present
    const hasTheme = settings.theme !== undefined && this.isValidTheme(settings.theme);
    const hasLanguage = settings.language !== undefined && this.isValidLanguage(settings.language);
    const hasNotifications = typeof settings.notifications === 'boolean';
    const hasAutoRefresh = typeof settings.autoRefresh === 'boolean';

    return hasTheme && hasLanguage && hasNotifications && hasAutoRefresh;
  }

  static getThemeDisplayName(theme: string): string {
    const displayNames: Record<string, string> = {
      light: 'Light Mode',
      dark: 'Dark Mode',
      auto: 'Auto (System)'
    };
    return displayNames[theme] || theme;
  }

  static getLanguageDisplayName(language: string): string {
    const displayNames: Record<string, string> = {
      en: 'English',
      es: 'Español',
      fr: 'Français',
      de: 'Deutsch',
      ja: '日本語',
      zh: '中文'
    };
    return displayNames[language] || language;
  }

  static hasChanges(original: Settings, updated: Settings): boolean {
    return JSON.stringify(original) !== JSON.stringify(updated);
  }

  static getChangedFields(original: Settings, updated: Settings): string[] {
    const changed: string[] = [];

    (Object.keys(updated) as (keyof Settings)[]).forEach(key => {
      if (original[key] !== updated[key]) {
        changed.push(key);
      }
    });

    return changed;
  }
}