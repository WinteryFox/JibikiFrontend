<template>
    <div>
        <Search
                @search="search">
            <div v-if="settings.type === 'all'">
                <All
                        :all="all"
                        :key="all.id"
                        v-for="all in all"/>
            </div>
            <div v-if="settings.type === 'words'">
                <Word
                        :key="word.id"
                        :word="word"
                        v-for="word in words"/>
            </div>
            <div v-if="settings.type === 'kanji'">
                <Kanji
                        :key="kanji.id"
                        :kanji="kanji"
                        v-for="kanji in kanji"/>
            </div>
            <div v-if="settings.type === 'sentences'">
                <Sentence
                        :key="sentence.id"
                        :sentence="sentence"
                        v-for="sentence in sentences"/>
            </div>
        </Search>
    </div>
</template>

<script>
    import axios from 'axios';
    import Search from "./Search";
    import All from "./All";
    import Word from "./Word";
    import Kanji from "./Kanji";
    import Sentence from "./Sentence";

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
            all: [],
            words: [],
            kanji: [],
            sentences: []
        }),

        methods: {
            search(settings) {
                this.settings = {};
                this.all = [];
                this.words = [];
                this.kanji = [];
                this.sentences = [];

                if (settings.type === 'all')
                    axios.get(this.$hostname + '/all?query=' + encodeURIComponent(settings.query))
                        .then(response => {
                            this.settings = settings;
                            this.all = response.data;
                        });
                else if (settings.type === 'words')
                    axios.get(this.$hostname + '/words?query=' + encodeURIComponent(settings.query))
                        .then(response => {
                            this.settings = settings;
                            this.words = response.data;
                        });
                else if (settings.type === 'kanji')
                    axios.get(this.$hostname + '/kanji?query=' + encodeURIComponent(settings.query))
                        .then(response => {
                            this.settings = settings;
                            this.kanji = response.data;
                        });
                else if (settings.type === 'sentences')
                    axios.get(this.$hostname + '/sentences?query=' + encodeURIComponent(settings.query))
                        .then(response => {
                            this.settings = settings;
                            this.sentences = response.data;
                        });
            }
        }
    }
</script>

<style scoped lang="scss">

</style>