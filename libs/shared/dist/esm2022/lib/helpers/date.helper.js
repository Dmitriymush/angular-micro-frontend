export class DateHelper {
    static formatToLocaleString(dateString, locale) {
        if (!dateString) {
            return '';
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleString(locale);
    }
    static formatToLocaleDateString(dateString, locale) {
        if (!dateString) {
            return '';
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleDateString(locale);
    }
    static formatWithOptions(dateString, options, locale) {
        if (!dateString) {
            return '';
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return new Intl.DateTimeFormat(locale, options).format(date);
    }
    static isValidDate(dateString) {
        if (!dateString) {
            return false;
        }
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }
}
//# sourceMappingURL=date.helper.js.map