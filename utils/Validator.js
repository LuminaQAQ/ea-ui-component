export const Validator = {
    required(value) {
        return value !== '';
    },
    min(value, min) {
        return value.length >= min;
    },
    max(value, max) {
        return value.length <= max;
    },
};