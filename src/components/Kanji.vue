<template>
    <md-content class="md-elevation-3">
        <div class="md-layout">
            <div class="md-layout-item md-size-20">
                <h1 class="kanji">{{kanji.literal}}</h1>
                <div class="buttons">
                    <md-button
                            :to="'/?query=' + encodeURIComponent(kanji.literal + '*') + '&type=words'">
                        View words
                    </md-button>
                </div>
                <div class="chip">
                    <md-chip class="md-raised md-primary" v-if="kanji.miscellaneous.radicalName != null">
                        {{kanji.miscellaneous.radicalName}}
                        <md-tooltip>
                            The name of this kanji as radical
                        </md-tooltip>
                    </md-chip>
                </div>
                <div class="chip">
                    <md-chip class="md-raised md-primary" v-if="kanji.miscellaneous.grade != null">
                        Grade {{kanji.miscellaneous.grade}}
                        <md-tooltip>
                            The grade in which the kanji is taught in school
                        </md-tooltip>
                    </md-chip>
                </div>
                <div class="chip">
                    <md-chip class="md-raised md-primary" v-if="kanji.miscellaneous.jlpt != null">
                        JLPT N{{kanji.miscellaneous.jlpt}}
                        <md-tooltip>
                            The JLPT level this kanji is in
                        </md-tooltip>
                    </md-chip>
                </div>
                <div class="chip">
                    <md-chip class="md-raised md-primary" v-if="kanji.miscellaneous.strokeCount != null">
                        {{kanji.miscellaneous.strokeCount}} strokes
                        <md-tooltip>
                            The amount of strokes this kanji contains
                        </md-tooltip>
                    </md-chip>
                </div>
                <div class="chip">
                    <md-chip class="md-raised md-primary" v-if="kanji.miscellaneous.frequency != null">
                        #{{kanji.miscellaneous.frequency}}
                        <md-tooltip>
                            The frequency of this kanji
                        </md-tooltip>
                    </md-chip>
                </div>
            </div>

            <div class="md-layout-item md-size-60">
                <div class="meaning" v-for="(definition, i) in kanji.definitions">{{i + 1}}. {{definition}}</div>
            </div>

            <div class="md-layout-item md-size-20">
                <div>
                    <p v-if="kanji.readings.onyomi.length > 0">Onyomi</p>
                    <p>{{kanji.readings.onyomi.join(', ')}}</p>
                </div>
                <div>
                    <p v-if="kanji.readings.kunyomi.length > 0">Kunyomi</p>
                    <p>{{kanji.readings.kunyomi.join(', ')}}</p>
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

        @media screen and (max-width: 768px) {
            div {
                padding: 0 !important;
                text-align: center;
                min-width: 100%;
                max-width: 100%;
            }

            .chip {
                margin-bottom: 5px;
            }
        }

        .buttons .md-button {
            margin-left: 0;
            background-color: rgba(white, 0.1);
            z-index: 1;
        }

        .kanji {
            margin: 10px 0 0;
            line-height: normal;
            font-size: 36px;
        }

        .chip {
            padding-top: 5px;
        }

        .md-size-60 {
            padding-top: 15px;
        }
    }
</style>