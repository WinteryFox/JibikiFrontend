<template>
    <div>
        <md-content class="bar">
            <label>
                <md-icon>search</md-icon>
                <input
                        accept="text/plain"
                        v-model="searchField"
                        :placeholder="label"
                        @input="search"
                        autofocus/>
                <md-button class="md-icon-button" @click="clear">
                    <md-icon>clear</md-icon>
                </md-button>
            </label>
        </md-content>
        <md-empty-state
                v-if="searchField === '' && !isTyping"
                md-icon="search"
                md-label="Time to start searching!"
                md-description="Start typing above to search for anything and everything you want!"/>
        <md-empty-state
                v-if="searchField !== '' && isEmpty() && !isTyping && !searching"
                md-icon="clear"
                md-label="No results!"
                md-description="Maybe try searching for something else?"/>
        <md-progress-spinner
                v-if="searching"
                md-mode="indeterminate"/>
        <div class="content">
            <slot/>
        </div>
    </div>
</template>

<script>
    import debounce from "lodash.debounce";

    export default {
        name: "Search",

        props: {
            label: {
                type: String,
                default: "Type here to search"
            },
            searching: {
                type: Boolean,
                default: false
            }
        },

        data: () => ({
            searchField: "",
            isTyping: false
        }),

        methods: {
            clear() {
                if (this.searchField !== "") {
                    this.searchField = "";
                    this.$emit("search", "");
                }
            },

            isEmpty() {
                return this.$slots.default === undefined;
            },

            typing: debounce(function () {
                this.$emit("search", this.searchField);
                this.isTyping = false;
            }, 300),

            search() {
                this.isTyping = true;
                this.typing();
            },
        },

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

<style scoped lang="scss">
    @import '~vue-material/dist/theme/engine';

    @media screen and (max-width: 768px) {
        div.bar {
            width: 90%;
        }
    }

    .md-progress-spinner {
        z-index: 0;
        position: absolute;
        margin: 0 45%;
    }

    .bar {
        margin: 40px auto;
        width: 50%;
        border: 1px solid gray;
        border-radius: 25px;

        .md-icon {
            padding: 20px;
            vertical-align: sub;
        }

        .md-button {
            float: right;
            position: absolute;
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
            width: calc(100% - 85px);
        }
    }
</style>