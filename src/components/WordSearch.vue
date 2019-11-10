<template>
    <div>
        <Search
                label="Search for Japanese, English or romaji"
                @search="getWord"/>
        <Word
                v-bind:word="word"
                v-bind:key="word.id"
                v-for="word in words"/>
    </div>
</template>

<script>
    import Search from "./Search";
    import Word from "./Word";
    import debounce from "lodash.debounce";
    import axios from "axios";

    export default {
        name: 'WordSearch',

        components: {
            Search,
            Word
        },

        data: () => ({
            words: []
        }),

        methods: {
            getWord: debounce(function(word) {
                if (word !== "") {
                    axios.get('http://localhost:8080/word?q=' + encodeURIComponent(word))
                        .then(response => this.words = response.data)
                        .catch(e => alert(e)) // TODO
                } else {
                    this.words = []
                }
            }, 200)
        }
    }
</script>