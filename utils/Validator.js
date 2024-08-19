export const Validator = {
    required(value) {
        if (typeof value === 'string') return value !== '';
        else if (Array.isArray(value)) return value.length > 0;
        else return false;
    },
    min(value, min) {
        return value.length >= min;
    },
    max(value, max) {
        return value.length <= max;
    },
};