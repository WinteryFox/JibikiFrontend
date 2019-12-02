<template>
    <div>
        <div class="bars">
            <Search
                    @search="search"
                    label="Type here to search words"
                    no-filters
                    no-state/>
        </div>
        <md-content>
            <div class="md-layout md-alignment-top-center">
                <h1>Welcome to Jibiki</h1>
            </div>
            <div class="md-layout md-alignment-top-center">
                Jibiki is an open-source free-to-use Japanese - English dictionary website
                and API. To start searching millions of words, kanji and sentences click
                on one of section you'd like to search for in the navigation bar.
            </div>
        </md-content>
    </div>
</template>

<script>
    import Search from "./Search";

    export default {
        name: "Home",

        components: {
            Search
        },

        methods: {
            search(input) {
                this.$router.push({
                    name: 'words',
                    query: {
                        query: input
                    }
                })
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