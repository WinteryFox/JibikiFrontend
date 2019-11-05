<template>
    <div class="centered">
        <md-content class="md-elevation-3">
            <md-field md-inline>
                <label>
                    <md-icon>search</md-icon>
                    Search English, Japanese or Romaji
                </label>
                <md-input accept="text/plain"
                          v-model="search"
                          v-on:keyup="getWord(search)" autofocus>
                </md-input>
            </md-field>
            <div>
                <div class="word" v-if="words.length > 0">{{words.length}} results</div>
                <div class="word" v-for="word in words" v-bind:key="word.id">
                    <div class="entry">
                        <div id="furigana" v-if="word.forms[0].kanji !== null">{{word.forms[0].reading}}
                        </div>
                        <div v-else class="kanji">{{word.forms[0].reading}}</div>
                        <div class="kanji" v-if="word.forms[0].kanji !== null">{{word.forms[0].kanji}}</div>
                    </div>
                    <div class="senses">
                        <div class="sens" :key="sens" v-for="(sens, i) in word.senses">
                            <div class="tags">
                                <md-chip class="md-raised md-primary" :key="pos" v-for="(pos, pi) in sens.pos">
                                    {{pos}}
                                    <md-tooltip class="md-raised md-primary">{{sens.pos_info[pi]}}</md-tooltip>
                                </md-chip>
                                <md-chip class="md-raised md-accent" :key="fld" v-for="(fld, pi) in sens.fld">
                                    {{fld}}
                                    <md-tooltip class="md-raised md-primary">{{sens.fld_info[pi]}}</md-tooltip>
                                </md-chip>
                            </div>
                            <div>
                                <div>{{i + 1}}. {{sens.gloss.join('; ')}}</div>
                                <div class="note">{{sens.notes}}</div>
                                <div class="note">{{sens.misc}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="forms small">
                        <div v-if="word.forms.length > 1">Other forms</div>
                        <div v-for="(form, i) in word.forms" v-if="i > 0">
                            <div>
                                {{form.kanji}} <span class="note">{{form.kanji_info}}</span>
                                【{{form.reading}}】 <span class="note">{{form.reading_info}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </md-content>
    </div>
</template>

<style scoped lang="scss">
    .centered {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .small {
            font-size: 14px;
        }

        .md-content {
            z-index: 1;
            padding: 40px;
            width: 100%;
            position: relative;
        }

        .forms {
            padding-top: 6px;
        }

        .tags {
            margin-bottom: 6px;
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

        .note {
            font-size: 14px;
            color: #808080
        }

        .entry {
            float: left;
        }

        #furigana {
            font-size: 14px;
        }

        .kanji {
            font-size: 36px;
            line-height: initial;
        }

        .word {
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            align-content: center;
            align-items: flex-start;
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
            width: calc(80% - 150px);
        }
    }
</style>

<script>
    import axios from 'axios'

    export default {
        name: 'WordSearch',
        data: () => ({
            search: "",
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