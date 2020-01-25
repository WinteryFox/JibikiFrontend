<template>
    <div>
        <md-content class="bar">
            <label>
                <md-icon>search</md-icon>

                <md-field class="type">
                    <md-select @md-selected="search" id="type" name="type" v-model="settings.api.type">
                        <md-option value="all">All</md-option>
                        <md-option value="words">Words</md-option>
                        <md-option value="kanji">Kanji</md-option>
                        <md-option value="sentences">Sentences</md-option>
                    </md-select>
                </md-field>

                <input
                        class="searchbar"
                        accept="text/plain"
                        v-model="settings.api.query"
                        :placeholder="label"
                        @input="search"
                        autofocus/>

                <md-button class="md-icon-button clear" @click="clear">
                    <md-icon>clear</md-icon>
                    <md-tooltip>
                        Clear search area
                    </md-tooltip>
                </md-button>

                <md-button @click="filtersExtended = !filtersExtended" class="md-icon-button filters">
                    <md-icon v-if="filtersExtended">
                        menu_open
                    </md-icon>
                    <md-icon v-else>
                        menu
                    </md-icon>
                    <md-tooltip v-if="filtersExtended">
                        Hide filters
                    </md-tooltip>
                    <md-tooltip v-else>
                        Show filters
                    </md-tooltip>
                </md-button>
            </label>

            <div id="filters" v-if="filtersExtended">
                <md-divider/>
                <p id="filters-header">Filters</p>

                <div v-if="settings.api.type === 'words' || settings.api.type === 'all'">
                    All/Word filters are not supported yet
                </div>

                <div v-else-if="settings.api.type === 'kanji'">
                    Kanji filters coming soon lol
                </div>

                <div v-else-if="settings.api.type === 'sentences'">
                    <SentenceFilters @filtersUpdate="updateFilters"/>
                </div>
            </div>
        </md-content>

        <div>
            <md-empty-state
                    md-description="Start typing above to search for anything and everything you want!"
                    md-icon="search"
                    md-label="Time to start searching!"
                    v-if="settings.api.query === '' && !isTyping"/>
            <md-empty-state
                    md-description="Maybe try searching for something else?"
                    md-icon="clear"
                    md-label="No results!"
                    v-if="settings.api.query !== '' && !hasResults && !isTyping && !isSearching"/>
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
    import SentenceFilters from "./SentenceFilters";

    export default {
        name: "Search",
        components: {SentenceFilters},
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
                api: {
                    query: "",
                    type: "words"
                },
                filters: {}
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
                if (this.settings.api.query !== '')
                    this.$router.push({
                        name: this.$router.currentRoute.name,
                        query: this.settings.api
                    });
                else
                    this.$router.push('/').catch(() => {
                    }); // Ignore NavigationDuplicated
                this.isTyping = false;
            }, 500),

            search() {
                this.isTyping = true;
                this.typing();
            },

            emit() {
                if (this.$route.query.query !== undefined)
                    this.settings.api.query = this.$route.query.query;
                else
                    this.settings.api.query = '';

                if (this.$route.query.type !== undefined)
                    this.settings.api.type = this.$route.query.type;

                this.$emit("search", this.settings);
            },

            updateFilters(updated) {
                this.settings.filters = updated;
                this.emit();
            }
        },

        computed: {
            isDark() {
                return this.$store.getters.isDark;
            }
        },

        watch: {
            $route() {
                this.emit();
            }
        },

        mounted() {
            this.emit();
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

        #filters {
            margin: 0 5px 5px 5px;
            padding: 0 10px 10px 10px;
            border-radius: 25px;

            .md-divider {
                margin-bottom: 10px;
            }

            #filters-header {
                margin: 0 0 10px 0;
                text-align: center;
            }
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