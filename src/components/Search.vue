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
                <md-button class="md-icon-button clear" @click="clear">
                    <md-icon>clear</md-icon>
                </md-button>
                <md-button class="md-icon-button filters" @click="filtersExtended = !filtersExtended">
                    <md-icon>filter_list</md-icon>
                </md-button>
            </label>
            <div v-if="filtersExtended">
                <slot name="filters"/>
            </div>
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
            isTyping: false,
            filtersExtended: false
        }),

        methods: {
            clear() {
                if (this.searchField !== "") {
                    this.$router.push({
                        name: this.$router.currentRoute.name,
                        query: {}
                    });
                    this.searchField = "";
                }
            },

            isEmpty() {
                return this.$slots.default === undefined;
            },

            typing: debounce(function () {
                if (this.searchField !== "") {
                    this.$router.push({
                        name: this.$router.currentRoute.name,
                        query: {query: this.searchField}
                    });
                } else {
                    this.$router.push({
                        name: this.$router.currentRoute.name,
                        query: {}
                    });
                }
                this.isTyping = false;
            }, 500),

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
            },

            $route(to) {
                if (this.$route.query.query !== undefined && this.$route.query.query !== null) {
                    this.searchField = to.query.query;
                } else {
                    this.searchField = ""
                }
                this.$emit("search", this.searchField);
            }
        },

        mounted() {
            if (this.$route.query.query !== undefined && this.$route.query.query !== null) {
                this.searchField = this.$route.query.query;
                this.$emit("search", this.searchField);
            }

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
        margin: 0 calc(50% - 25px);
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

        .clear {
            float: right;
            position: absolute;
            margin-left: 40px;
        }

        .filters {
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

        input:focus {
            outline: none;
        }

        input {
            outline: none;
            font-size: 20px;
            background: none;
            border: none;
            width: calc(100% - 120px);
        }
    }
</style>