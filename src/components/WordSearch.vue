<template>
    <div>
        <SearchBar label="Search for Japanese, English or romaji" @search="getWord"></SearchBar>
        <Word v-bind:word="word" v-bind:key="word.id" v-for="word in words"></Word>
    </div>
</template>

<script>
    import SearchBar from "./SearchBar";
    import Word from "./Word";
    import axios from 'axios'

    export default {
        name: 'WordSearch',

        components: {
            SearchBar,
            Word
        },

        data: () => ({
            words: []
        }),

        methods: {
            getWord(word) {
                if (word !== "") {
                    axios.get('http://localhost:8080/word?q=' + encodeURIComponent(word))
                        .then(response => this.words = response.data)
                        .catch(e => alert(e)) // TODO
                } else {
                    this.words = []
                }
            }
        }
    }
</script>