<template>
    <div class="root">
        <SearchBar @keydown="getKanji(this.search)"></SearchBar>
        <md-content class="md-elevation-3" :key="kanji.literal" v-for="kanji in this.kanji">
            <div class="md-layout">
                <div class="md-layout-item">
                    <h1>{{kanji.literal}}</h1>
                    <div class="chip">
                        <md-chip v-if="kanji.grade != null" class="md-raised md-primary">
                            Grade {{kanji.grade}}
                        </md-chip>
                    </div>
                    <div class="chip">
                        <md-chip v-if="kanji.jlpt != null" class="md-raised md-accent">
                            JLPT N{{kanji.jlpt}}
                        </md-chip>
                    </div>
                </div>
                <div class="md-layout-item">
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
            </div>
            <md-divider/>
        </md-content>
    </div>
</template>

<style scoped lang="scss">
    .kanji {
        font-size: 36px;
    }

    .chip {
        padding-top: 10px;
    }

    .md-layout {
        margin: 30px;
    }
</style>

<script>
    import SearchBar from './SearchBar'
    import axios from 'axios'

    export default {
        name: "KanjiSearch",
        components: {
            SearchBar
        },
        data: () => ({
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