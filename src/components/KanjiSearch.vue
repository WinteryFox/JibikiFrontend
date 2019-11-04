<template>
    <md-content class="md-elevation-3">
        <md-field md-inline>
            <label>
                <md-icon>search</md-icon>
                Search English, Kanji or reading
            </label>
            <md-input accept="text/plain" v-model="this.$route.params.kanji" autofocus>
            </md-input>
        </md-field>
        <div class="md-layout" v-for="kanji in kanji">
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
                    <p>Kunyomi</p>
                    <p v-for="kunyomi in kanji.kunyomi">{{kunyomi}}</p>
                </div>
                <div>
                    <p>Onyomi</p>
                    <p v-for="onyomi in kanji.onyomi">{{onyomi}}</p>
                </div>
            </div>
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
            kanji: []
        }),

        methods: {
            getKanji(kanji) {
                axios.get('http://localhost:8080/kanji?q=' + encodeURIComponent(kanji))
                    .then(response => this.kanji = response.data)
                    .catch(e => alert(e)) // TODO
            }
        },

        watch: {
            $route(to, from) {
                this.getKanji(to)
            }
        },

        beforeMount() {
            this.getKanji(this.$route.params.kanji)
        }
    }
</script>