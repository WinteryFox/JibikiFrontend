<template>
    <div class="centered">
        <md-content class="md-elevation-3">
            <div class="center">
                <md-field md-inline>
                    <label>
                        <md-icon>search</md-icon>
                        Search English, Japanese or Romaji
                    </label>
                    <md-input accept="text/plain"
                              v-model="search"
                              v-on:keyup="query(search)" autofocus>
                    </md-input>
                </md-field>
            </div>
            <div>
                <transition name="word" tag="div">
                    <div>
                        <div class="word" v-if="words.length > 0">{{words.length}} results</div>
                        <div class="word" v-for="word in words" v-bind:key="word">
                            <div class="entry">
                                <div>
                                    <div id="furigana" v-if="word.forms[0].kanji !== null">{{word.forms[0].reading}}
                                    </div>
                                    <div v-else class="kanji">{{word.forms[0].reading}}</div>
                                    <div class="kanji" v-if="word.forms[0].kanji !== null">{{word.forms[0].kanji}}</div>
                                </div>
                            </div>
                            <div class="senses">
                                <div class="sens" :key="sens" v-for="(sens, i) in word.senses">
                                    <div class="posses">
                                        <md-chip class="md-raised md-primary" :key="pos" v-for="(pos, pi) in sens.pos">
                                            {{pos}}
                                            <md-tooltip class="md-raised md-primary">{{sens.pos_info[pi]}}</md-tooltip>
                                        </md-chip>
                                    </div>
                                    <div class="flds">
                                        <md-chip class="md-raised md-primary" :key="fld" v-for="fld in sens.fld">{{fld}}</md-chip>
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
                </transition>
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

        .posses {
            margin-bottom: 6px;
        }

        .flds {
            margin-bottom: 6px;
        }

        .pos {
            display: inline-block;
            background-color: #b9b9b9;
            border-radius: 3px;
            padding: 1px 10px;
            margin: 2px;
            font-size: 12px;
            color: #212121;
        }

        .fld {
            display: inline-block;
            background-color: #b9b9b9;
            border-radius: 3px;
            padding: 1px 10px;
            font-size: 12px;
            color: #212121;
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
            },

            arrayEquals(a1, a2) {
                if (a1.length !== a2.length)
                    return false;

                for (var i = 0; i < a1.length; i++) {
                    if (a1[i] !== a2[i])
                        return false;
                }
                return true;
            }
        }
    }
</script>