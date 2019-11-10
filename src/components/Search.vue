<template>
    <md-content>
        <label>
            <md-icon>search</md-icon>
            <input
                    accept="text/plain"
                    v-model="searchField"
                    :placeholder="label"
                    @input="$emit('search', searchField)"
                    autofocus/>
        </label>
    </md-content>
</template>

<style scoped lang="scss">
    @import '~vue-material/dist/theme/engine';

    div {
        margin: 40px auto;
        width: 50%;
        border: 1px solid gray;
        border-radius: 25px;

        .md-icon {
            padding: 20px;
            vertical-align: sub;
        }

        ::placeholder {
            font-size: 14px;
        }

        .dark {
            color: md-get-color-by-theme(dark, text-primary);
        }

        .light {
            color: md-get-color-by-theme(light, text-primary);
        }

        input {
            font-size: 20px;
            background: none;
            border: none;
            width: 90%;
        }
    }
</style>

<script>
    export default {
        name: "Search",

        props: {
            label: {
                type: String,
                default: "Type here to search"
            }
        },

        data: () => ({
            searchField: ""
        }),

        computed: {
            isDark() {
                return this.$store.getters.isDark;
            }
        },

        watch: {
            isDark: function () {
                const input = this.$el.getElementsByTagName("input")[0];

                if (input.classList.contains("dark")) {
                    input.classList.remove("dark");
                    input.classList.add("light");
                } else {
                    input.classList.remove("light");
                    input.classList.add("dark");
                }
            }
        },

        mounted() {
            const input = this.$el.getElementsByTagName("input")[0];

            if (this.isDark)
                input.classList.add("dark");
            else
                input.classList.remove("light");

            input.focus();
        }
    }
</script>