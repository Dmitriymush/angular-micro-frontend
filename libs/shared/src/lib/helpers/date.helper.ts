export abstract class DateHelper {
  static formatToLocaleString(dateString: string, locale?: string): string {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    return date.toLocaleString(locale);
  }

  static formatToLocaleDateString(dateString: string, locale?: string): string {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    return date.toLocaleDateString(locale);
  }

  static formatWithOptions(
    dateString: string,
    options: Intl.DateTimeFormatOptions,
    locale?: string
  ): string {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    return new Intl.DateTimeFormat(locale, options).format(date);
  }

  static isValidDate(dateString: string): boolean {
    if (!dateString) {
      return false;
    }

    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
}
