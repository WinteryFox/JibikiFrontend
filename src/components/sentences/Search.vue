<template>
    <div>
        <md-button class="md-icon-button" @click="isExtended = !isExtended">
            <md-tooltip v-if="!isExtended">
                Show all translations
            </md-tooltip>
            <md-tooltip v-else>
                Hide all translations
            </md-tooltip>
            <md-icon v-if="!isExtended">
                expand_more
            </md-icon>
            <md-icon v-else>
                expand_less
            </md-icon>
        </md-button>
        <Search
                label="Search for Japanese or English"
                :searching="isSearching"
                @search="getSentence">
            <Filters #filters/>
            <Sentence
                    :is-extended="isExtended"
                    v-bind:sentence="sentence"
                    v-bind:key="sentence.id"
                    v-for="sentence in sentences"/>
        </Search>
    </div>
</template>

<script>
    import Search from "../Search";
    import Sentence from "./Sentence";
    import Filters from './Filters';
    import axios from "axios";

    export default {
        name: 'SentenceSearch',

        components: {
            Search,
            Sentence,
            Filters
        },

        data: () => ({
            sentences: [],
            isSearching: false,
            isExtended: true
        }),

        methods: {
            getSentence(query) {
                if (query !== "") {
                    this.isSearching = true;
                    axios.get(this.$hostname + '/sentences?query=' + encodeURIComponent(query))
                        .then(response => {
                            this.sentences = response.data;
                            this.isSearching = false;
                        })
                        .catch(e => alert(e)) // TODO
                } else {
                    this.sentences = []
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @media screen and (max-width: 768px) {
        .md-icon-button {
            position: static;
            right: calc(50% - 25px) !important;
            top: 137px;
        }
    }

    .md-icon-button {
        position: absolute;
        right: 25px;
    }
</style>