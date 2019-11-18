<template>
    <div>
        <Search
                label="Search for Japanese or English"
                :searching="isSearching"
                @search="getSentence">
            <Sentence
                    v-bind:sentence="sentence"
                    v-bind:key="sentence.id"
                    v-for="sentence in sentences"/>
        </Search>
    </div>
</template>

<script>
    import Search from "./Search";
    import Sentence from "./Sentence";
    import axios from "axios";

    export default {
        name: 'SentenceSearch',

        components: {
            Search,
            Sentence
        },

        data: () => ({
            sentences: [],
            isSearching: false
        }),

        methods: {
            getSentence(query) {
                if (query !== "") {
                    this.isSearching = true;
                    axios.get('http://localhost:8080/sentences?query=' + encodeURIComponent(query))
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