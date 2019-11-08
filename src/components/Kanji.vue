<template>
    <md-content class="md-elevation-3">
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
</template>

<script>
    export default {
        name: "Kanji",
        props: {
            kanji: Object
        }
    }
</script>

<style scoped lang="scss">
    .md-layout {
        margin: 30px;

        .kanji {
            font-size: 36px;
        }

        .chip {
            padding-top: 10px;
        }
    }
</style>