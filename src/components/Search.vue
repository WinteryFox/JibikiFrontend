<template>
    <div>
        <div class="center">
            <label>
                <input class="search" accept="text/plain" placeholder="Search for English, Japanese or Romaji"
                       v-model="search"
                       v-on:keyup="query(search)"/>
            </label>
        </div>
        <div>
            <transition-group name="word" tag="div">
                <div v-for="word in words" v-bind:key="word" class="word">
                    <div class="entry">
                        <div>
                            <div id="furigana">{{word.forms[0].reading}}</div>
                            <div id="kanji">{{word.forms[0].kanji}}</div>
                        </div>
                    </div>
                    <div class="senses">
                        <div class="sens" :key="sens" v-for="(sens, i) in word.senses">
                            <div class="posses">
                                <span v-for="pos in sens.pos" class="pos">{{pos}}</span>
                            </div>
                            <div class="flds">
                                <div v-for="fld in sens.fld" class="fld">{{fld}}</div>
                            </div>
                            <div>
                                <div>{{i + 1}}. {{sens.gloss.join('; ')}}</div>
                                <div class="note">{{sens.notes}}</div>
                                <div class="note">{{sens.misc.join('; ')}}</div>
                            </div>
                        </div>
                        <div class="forms small">
                            <div v-if="word.forms.length > 1">Other forms</div>
                            <div v-for="(form, i) in word.forms" v-if="i > 0">
                                <div>
                                    {{form.kanji}} <span class="note">{{form.kanji_info}}</span>
                                </div>
                                <div>
                                    {{form.reading}} <span class="note">{{form.reading_info}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<style scoped>
    .small {
        font-size: 14px;
    }

    .forms {
        padding-top: 6px;
    }

    .posses {
        margin-bottom: 6px;
    }

    .flds {
        margin-bottom: 6px;
    }

    .pos {
        display: inline-block;
        background-color: #ff7783;
        border-radius: 3px;
        padding: 1px 10px;
        font-size: 12px;
        color: #545454;
    }

    .fld {
        display: inline-block;
        background-color: #f666ff;
        border-radius: 3px;
        padding: 1px 10px;
        font-size: 12px;
        color: #545454;
    }

    .word-enter-active, .word-leave-active {
        transition: all .5s;
    }

    .word-enter, .word-leave-to {
        opacity: 0;
        transform: translateX(-30px);
    }

    .word-leave, .word-leave-to {
        transform: translateX(30px);
    }

    .search {
        margin: 0 auto 30px;
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

    .note {
        font-size: 14px;
        color: #808080
    }

    .entry {
        float: left;
    }

    #furigana {

    }

    #kanji {
        font-size: 36px;
    }

    .word {
        width: 80%;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        align-content: center;
        align-items: flex-start;
        justify-content: center;
        padding: 16px;
        margin: 0 auto 16px;
        border-bottom: 1px solid gray;
    }

    .word .entry {
        text-align: left;
        display: inline-block;
        width: 150px;
        max-width: 33.333%;
    }

    .word .senses {
        text-align: left;
        display: block;
        width: calc(100% - 125px);
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