import { DateHelper } from './date.helper';

describe('DateHelper', () => {
  describe('formatToLocaleString', () => {
    it('should format valid date string to locale string', () => {
      const result = DateHelper.formatToLocaleString('2024-01-15T10:30:00.000Z');

      expect(typeof result).toBe('string');
    });

    it('should return empty string for empty input', () => {
      const result = DateHelper.formatToLocaleString('');

      expect(result).toBe('');
    });

    it('should return "Invalid Date" for invalid date string', () => {
      const result = DateHelper.formatToLocaleString('invalid-date');

      expect(result).toBe('Invalid Date');
    });

    it('should use provided locale when specified', () => {
      const result = DateHelper.formatToLocaleString('2024-01-15T10:30:00.000Z', 'en-US');

      expect(typeof result).toBe('string');
    });
  });

  describe('formatToLocaleDateString', () => {
    it('should format valid date string to local date string', () => {
      const result = DateHelper.formatToLocaleDateString('2024-01-15T10:30:00.000Z');

      expect(typeof result).toBe('string');
    });

    it('should return empty string for empty input', () => {
      const result = DateHelper.formatToLocaleDateString('');

      expect(result).toBe('');
    });

    it('should return "Invalid Date" for invalid date string', () => {
      const result = DateHelper.formatToLocaleDateString('not-a-date');

      expect(result).toBe('Invalid Date');
    });

    it('should use provided locale when specified', () => {
      const result = DateHelper.formatToLocaleDateString('2024-01-15T10:30:00.000Z', 'de-DE');

      expect(typeof result).toBe('string');
    });
  });

  describe('formatWithOptions', () => {
    it('should format date with custom options', () => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
      const result = DateHelper.formatWithOptions('2024-01-15T10:30:00.000Z', options);

      expect(typeof result).toBe('string');
    });

    it('should return empty string for empty input', () => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric' };
      const result = DateHelper.formatWithOptions('', options);

      expect(result).toBe('');
    });

    it('should return "Invalid Date" for invalid date string', () => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric' };
      const result = DateHelper.formatWithOptions('bad-date', options);

      expect(result).toBe('Invalid Date');
    });

    it('should use provided locale with options', () => {
      const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
      const result = DateHelper.formatWithOptions('2024-01-15T10:30:00.000Z', options, 'fr-FR');

      expect(typeof result).toBe('string');
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid date string', () => {
      const result = DateHelper.isValidDate('2024-01-15T10:30:00.000Z');

      expect(result).toBe(true);
    });

    it('should return false for empty string', () => {
      const result = DateHelper.isValidDate('');

      expect(result).toBe(false);
    });

    it('should return false for invalid date string', () => {
      const result = DateHelper.isValidDate('not-a-date');

      expect(result).toBe(false);
    });

    it('should return true for simple date format', () => {
      const result = DateHelper.isValidDate('2024-01-15');

      expect(result).toBe(true);
    });

    it('should return true for Date constructor compatible string', () => {
      const result = DateHelper.isValidDate('Mon Jan 15 2024');

      expect(result).toBe(true);
    });
  });
});