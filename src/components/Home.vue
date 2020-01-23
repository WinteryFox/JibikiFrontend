<template>
    <div>
        <Search
                :has-results="data.length > 0"
                :is-searching="isSearching"
                @search="search">
            <md-button class="md-icon-button" v-if="settings.type === 'sentences'" @click="isExtended = !isExtended">
                <md-icon v-if="isExtended">
                    expand_less
                </md-icon>
                <md-icon v-else>
                    expand_more
                </md-icon>
                <md-tooltip v-if="isExtended">
                    Collapse all translations
                </md-tooltip>
                <md-tooltip v-else>
                    Expand all translations
                </md-tooltip>
            </md-button>

            <div v-if="settings.type === 'all'">
                <All
                        :all="all"
                        :key="all.id"
                        v-for="all in data"/>
            </div>
            <div v-else-if="settings.type === 'words'">
                <Word
                        :key="word.id"
                        :word="word"
                        v-for="word in data"/>
            </div>
            <div v-else-if="settings.type === 'kanji'">
                <Kanji
                        :key="kanji.id"
                        :kanji="kanji"
                        v-for="kanji in data"/>
            </div>
            <div v-else-if="settings.type === 'sentences'">
                <Sentence
                        :is-extended="isExtended"
                        :key="sentence.id"
                        :sentence="sentence"
                        v-for="sentence in data"/>
            </div>
        </Search>
    </div>
</template>

<script>
    import axios from 'axios';
    import Search from "./Search";
    import All from "./cards/All";
    import Word from "./cards/Word";
    import Kanji from "./cards/Kanji";
    import Sentence from "./cards/Sentence";

    export default {
        name: "Home",

        components: {
            Search,
            All,
            Sentence,
            Kanji,
            Word
        },

        data: () => ({
            settings: {},
            data: [],
            isExtended: true,
            isSearching: false
        }),

        methods: {
            async search(settings) {
                this.isSearching = true;
                this.data = [];
                this.settings = JSON.parse(JSON.stringify(settings));

                if (settings.query !== '')
                    await axios.get(this.$hostname + '/' + settings.type + '?query=' + encodeURIComponent(settings.query))
                        .then(response => {
                            this.data = response.data;
                        })
                        .catch(e => {
                            alert(e.message);
                        });
                else
                    this.data = [];

                this.isSearching = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .md-icon-button {
        position: absolute;
        right: calc(5% - 20px);
        top: 90px;
    }

    @media screen and (max-width: 768px) {
        .md-icon-button {
            position: relative;
            left: calc(50% - 20px);
            top: -20px;
        }
    }
</style>