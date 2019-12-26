export default {
    methods: {
        removeSpaces(input) {
            return (input) ? input.replace(/ /g, "") : input;
        },
        isMatch(value1, value2, nameValidation = '') {
            return value1 === value2 || `${nameValidation} must match`;
        }
    }
};