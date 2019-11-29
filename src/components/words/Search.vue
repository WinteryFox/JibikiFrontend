<template>
    <div>
        <Search
                label="Search for Japanese, English or romaji"
                :searching="isSearching"
                @search="getWord">
            <Word
                    v-bind:word="word"
                    v-bind:key="word.id"
                    v-for="word in words"/>
        </Search>
    </div>
</template>

<script>
    import Search from "../Search";
    import Word from "./Word";
    import axios from "axios";

    export default {
        name: 'WordSearch',

        components: {
            Search,
            Word
        },

        data: () => ({
            words: [],
            isSearching: false
        }),

        methods: {
            getWord(word) {
                if (word !== "") {
                    this.isSearching = true;
                    axios.get(this.$hostname + '/words?query=' + encodeURIComponent(word))
                        .then(response => {
                            this.words = response.data;
                            this.isSearching = false;
                        })
                        .catch(e => alert(e)) // TODO
                } else {
                    this.words = []
                }
            }
        }
    }
</script>