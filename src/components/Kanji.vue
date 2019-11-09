<template>
    <md-content class="md-elevation-3">
        <div class="md-layout">
            <div class="md-layout-item md-size-20">
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

            <div class="md-layout-item md-size-60">
                <div class="meaning" v-for="(meaning, i) in kanji.meaning">{{i + 1}}. {{meaning}}</div>
            </div>

            <div class="md-layout-item md-size-20">
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
        margin: 15px 30px;

        .kanji {
            font-size: 36px;
        }

        .chip {
            padding-top: 10px;
        }

        .md-size-60 {
            padding-top: 15px;
        }
    }
</style>