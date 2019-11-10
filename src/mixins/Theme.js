import Vue from 'vue'

export default {
    name: "Theme",

    created() {
        if (!this.$cookies.isKey("isDark"))
            this.$cookies.set("isDark", false);
    },

    methods: {
        isDark() {
            return this.$cookies.get("isDark") === "true";
        },

        toggleTheme() {
            const isDark = this.isDark();

            this.$cookies.set("isDark", !isDark);
            Vue.material.theming.theme = isDark ? "default" : "dark";
        }
    }
}