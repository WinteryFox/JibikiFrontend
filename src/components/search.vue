<template>
    <div class="search">
        <label>
            <input accept="text/plain" placeholder="Type here to search" v-model="search"
                   v-on:keyup.enter="query(search)"/>
        </label>
        <div class="results">
            <div :key="word.id" id="word" v-for="word in words">
                <div :key="reading" id="readings" v-for="reading in word.readings">{{reading}}</div>
                <div id="kanji">{{word.kanji}}</div>
                <div :key="sens" id="sens" v-for="sens in word.senses">
                    <div :key="pos" v-for="pos in sens.pos">{{pos}}</div>
                    <div :key="fld" v-for="fld in sens.fld">{{fld}}</div>
                    <div :key="gloss" id="gloss" v-for="gloss in sens.gloss">{{gloss}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Search',
        data() {
            return {
                search: "",
                words: []
            }
        },

        methods: {
            query(text) {
                if (text !== "") {
                    axios.get('http://localhost:8080/word?q=' + text)
                        .then(response => this.words = response.data)
                } else {
                    this.words = []
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
