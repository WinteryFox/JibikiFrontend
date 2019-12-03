<template>
    <div>
        <Search
                @search="search">
            <All :key="word.id" :sentence="word.sentence" :word="word" v-for="word in words"/>
        </Search>
    </div>
</template>

<script>
    import axios from 'axios';
    import Search from "./Search";
    import All from "./All";

    export default {
        name: "Home",

        components: {
            All,
            Search
        },

        data: () => ({
            words: []
        }),

        methods: {
            search(query) {
                axios.get(this.$hostname + '/words?query=' + encodeURIComponent(query))
                    .then(response => this.words = response.data)
            }
        }
    }
</script>

<style scoped lang="scss">
    .md-content {
        margin: 30px;
        line-height: normal;
    }

    .md-alignment-top-center {
        text-align: center
    }

    .md-icon {
        margin: 0;
    }

    .bar {
        margin: 0;
    }
</style>