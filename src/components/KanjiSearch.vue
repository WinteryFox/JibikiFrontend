<template>
    <md-content class="md-elevation-3">
        <md-field md-inline>
            <label>
                <md-icon>search</md-icon>
                Search English, Kanji or reading
            </label>
            <md-input accept="text/plain"
                      v-model="search"
                      v-on:keyup="getKanji(search)" autofocus>
            </md-input>
        </md-field>
        <div class="md-layout" v-for="kanji in this.kanji">
            <div class="md-layout-item kanji">
                {{kanji.literal}}
            </div>
            <div class="md-layout-item">
                <div>
                    <md-chip v-if="kanji.grade != null" class="md-raised md-primary">
                        Grade {{kanji.grade}}
                    </md-chip>
                    <md-chip v-if="kanji.jlpt != null" class="md-raised md-accent">
                        JLPT {{kanji.jlpt}}
                    </md-chip>
                </div>
                <p v-for="(meaning, i) in kanji.meaning">{{i + 1}}. {{meaning}}</p>
            </div>
            <div class="md-layout-item">
                <div>
                    <p v-if="kanji.kunyomi.length > 0">Kunyomi</p>
                    <p>{{kanji.kunyomi.join(', ')}}</p>
                </div>
                <div>
                    <p v-if="kanji.onyomi.length > 0">Onyomi</p>
                    <p>{{kanji.onyomi.join(', ')}}</p>
                </div>
            </div>
            <md-divider/>
        </div>
    </md-content>
</template>

<style scoped lang="scss">
    .kanji {
        font-size: 36px;
    }
</style>

<script>
    import axios from 'axios'

    export default {
        name: "KanjiSearch",
        data: () => ({
            search: "",
            kanji: []
        }),

        methods: {
            getKanji(kanji) {
                this.kanji = [];

                for (let i = 0; i < kanji.length; i++)
                    axios.get('http://localhost:8080/kanji?q=' + encodeURIComponent(kanji.charAt(i)))
                        .then(response => {
                            if (Array.isArray(response.data) && response.data.length) {
                                this.kanji.push(response.data[0])
                            }
                        })
                        .catch(e => alert(e)) // TODO
            }
        }
    }
</script>