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
                        class="searchbar"
                        accept="text/plain"
                        v-model="settings.query"
                        :placeholder="label"
                        @input="search"
                        autofocus/>
                <md-button class="md-icon-button clear" @click="clear">
                    <md-icon>clear</md-icon>
                </md-button>
                <md-button @click="filtersExtended = !filtersExtended" class="md-icon-button filters">
                    <md-icon>filter_list</md-icon>
                </md-button>
            </label>
            <div v-if="filtersExtended">
                <slot name="filters"/>
            </div>
        </md-content>
        <div>
            <md-empty-state
                    md-description="Start typing above to search for anything and everything you want!"
                    md-icon="search"
                    md-label="Time to start searching!"
                    v-if="settings.query === '' && !isTyping"/>
            <md-empty-state
                    md-description="Maybe try searching for something else?"
                    md-icon="clear"
                    md-label="No results!"
                    v-if="settings.query !== '' && !hasResults && !isTyping && !isSearching"/>
            <md-progress-spinner
                    md-mode="indeterminate"
                    v-if="isSearching"/>
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
            isSearching: {
                type: Boolean,
                default: false
            },
            hasResults: {
                type: Boolean,
                default: false
            }
        },

        data: () => ({
            isTyping: false,
            filtersExtended: false,
            settings: {
                query: "",
                type: "words"
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

            typing: debounce(function () {
                if (this.settings.query !== '')
                    this.$router.push({
                        name: this.$router.currentRoute.name,
                        query: this.settings
                    });
                else
                    this.$router.push('/');
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
        position: relative;

        .md-icon {
            padding: 20px;
            vertical-align: sub;
        }

        .clear {
            position: absolute;
            right: -6px;
        }

        .filters {
            position: absolute;
            right: 34px;
        }

        .type {
            width: calc(20% - 40px);
            margin: 0;
            padding: 0;
            min-height: 0;
            display: inline-block;
        }

        .searchbar {
            color: inherit;
            outline: none;
            font-size: 20px;
            background: none;
            border: none;
            width: calc(80% - 80px);
        }

        .searchbar:focus {
            outline: none;
        }

        ::placeholder {
            color: inherit;
            font-size: 20px;
        }
    }
</style>