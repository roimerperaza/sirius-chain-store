import Vue from "vue";

export default Vue.extend({
    methods: {
        deleteSpaces(input: string) {
            if (input) {
                return input.replace(/ /g, "");
            }
        }
    }
});