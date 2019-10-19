<template>
    <div>
        <div class="center">
            <label>
                <input class="search" accept="text/plain" placeholder="Search for English, Japanese or Romaji"
                       v-model="search"
                       v-on:keyup="query(search)"/>
            </label>
        </div>
        <div class="container">
            <div v-bind:id="word.id" v-bind:kanj="word.kanj" class="word" v-for="word in words">
                <div class="container entry">
                    <div class="container">
                        <span class="container" id="furigana" :key="word.readings[0]">{{word.readings[0]}}</span>
                        <span class="container" id="kanji">{{word.kanji}}</span>
                    </div>
                    <div class="container" v-if="word.readings.length > 1">
                        <span>Other forms</span>
                        <span class="container" :key="reading" v-for="(reading, i) in word.readings"
                              v-if="i > 0">{{reading}}</span>
                    </div>
                </div>
                <div class="container sens" :key="sens.sens" v-for="(sens, i) in word.senses">
                    <div>
                        <span :key="pos" v-for="pos in sens.pos">{{pos}}, </span>
                    </div>
                    <div>
                        <span :key="fld" v-for="fld in sens.fld">{{fld}}, </span>
                    </div>
                    <div>
                        <span>{{i + 1}}. </span>
                        <span :key="gloss"
                              v-for="gloss in sens.gloss">{{gloss}}; </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .search {
        margin: 0 auto;
        width: 80%;
        position: relative;
        border-radius: 8px;
        padding: 12px 12px 12px 48px;
        box-sizing: border-box;
        font-size: 16px;
        line-height: 1.5;
        flex: 1;
        background: #b9b9b9 url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+") no-repeat 12px 12px;
    }

    .entry {
        float: left;
    }

    .sens {
        text-align: center;
    }

    .word {
        margin: 40px;
    }

    #furigana {

    }

    #kanji {
        font-size: 36px;
    }
</style>


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
                    axios.get('http://localhost:8080/word?q=' + encodeURIComponent(text))
                        .then(response => this.words = response.data)
                        .catch(e => alert(e)) /// TODO: Make prettier
                } else {
                    this.words = []
                }
            }
        }
    }
</script>