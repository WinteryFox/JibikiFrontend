<template>
    <div>
        <md-content class="bar">
            <label>
                <md-icon>search</md-icon>
                <md-field class="type">
                    <md-select @md-selected="search" id="type" name="type" v-model="settings.type">
                        <md-option value="all">All</md-option>
                        <md-option value="words">Words</md-option>
                        <md-option value="kanji">Kanji</md-option>
                        <md-option value="sentences">Sentences</md-option>
                    </md-select>
                </md-field>
                <input
                        accept="text/plain"
                        v-model="settings.query"
                        :placeholder="label"
                        @input="search"
                        autofocus/>
                <md-button class="md-icon-button clear" @click="clear">
                    <md-icon>clear</md-icon>
                </md-button>
                <md-button @click="filtersExtended = !filtersExtended" class="md-icon-button filters" v-if="!noFilters">
                    <md-icon>filter_list</md-icon>
                </md-button>
            </label>
            <div v-if="filtersExtended">
                <slot name="filters"/>
            </div>
        </md-content>
        <div v-if="!noState">
            <md-empty-state
                    md-description="Start typing above to search for anything and everything you want!"
                    md-icon="search"
                    md-label="Time to start searching!"
                    v-if="settings.query === '' && !isTyping"/>
            <md-empty-state
                    md-description="Maybe try searching for something else?"
                    md-icon="clear"
                    md-label="No results!"
                    v-if="settings.query !== '' && isEmpty() && !isTyping && !searching"/>
            <md-progress-spinner
                    md-mode="indeterminate"
                    v-if="searching"/>
            <div class="content">
                <slot/>
            </div>
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
            },
            noState: {
                type: Boolean,
                default: false
            },
            noFilters: {
                type: Boolean,
                default: false
            }
        },

        data: () => ({
            isTyping: false,
            filtersExtended: false,
            settings: {
                query: "",
                type: "all"
            }
        }),

        methods: {
            clear() {
                if (this.settings.query !== "") {
                    this.$router.push({
                        name: this.$router.currentRoute.name,
                        query: {}
                    });
                    this.settings.query = "";
                }
            },

            isEmpty() {
                return this.$slots.default === undefined;
            },

            typing: debounce(function () {
                this.$router.push({
                    name: this.$router.currentRoute.name,
                    query: this.settings
                });
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
            $route() {
                if (this.$route.query.query !== undefined)
                    this.settings.query = this.$route.query.query;

                if (this.$route.query.type !== undefined)
                    this.settings.type = this.$route.query.type;

                this.$emit("search", this.settings);
            }
        },

        mounted() {
            if (this.$route.query.query !== undefined)
                this.settings.query = this.$route.query.query;

            if (this.$route.query.type !== undefined)
                this.settings.type = this.$route.query.type;

            this.$emit("search", this.settings);
            this.$el.getElementsByTagName("input")[2].focus();
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
        width: 60%;
        border: 1px solid gray;
        border-radius: 25px;

        .type {
            width: 100px;
            margin: 0;
            padding: 0;
            min-height: 0;
            display: inline-block;
        }

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

        input:focus {
            outline: none;
        }

        input {
            color: inherit;
            outline: none;
            font-size: 20px;
            background: none;
            border: none;
            width: calc(80% - 105px);
        }

        ::placeholder {
            color: inherit;
            font-size: 20px;
        }
    }
</style>