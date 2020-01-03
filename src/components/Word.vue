<template>
    <md-content class="md-elevation-3 word">
        <div class="md-layout">
            <div class="md-layout-item md-size-20">
                <div class="reading" v-if="word.forms[0].kanji.literal != null">{{word.forms[0].reading.literal}}</div>
                <div class="kanji" v-if="word.forms[0].kanji.literal != null">{{word.forms[0].kanji.literal}}</div>
                <div class="kanji" v-else>{{word.forms[0].reading.literal}}</div>
                <div class="note" v-if="word.forms[0].kanji.info != null">{{word.forms[0].kanji.info}}</div>
                <div class="note" v-if="word.forms[0].reading.info != null">{{word.forms[0].reading.info}}</div>

                <div class="buttons">
                    <md-button
                            :to="'/?query=' + encodeURIComponent(word.forms[0].reading.literal) + '&type=sentences'"
                            v-if="word.forms[0].kanji.literal == null || word.forms[0].kanji.info === 'word usually written using kana alone'">
                        View sentences
                    </md-button>
                    <md-button
                            v-else
                            :to="'/?query=' + encodeURIComponent(word.forms[0].kanji.literal) + '&type=sentences'">
                        View sentences
                    </md-button>
                </div>
            </div>

            <div class="md-layout-item md-size-60">
                <div v-for="(sens, i) in word.senses">
                    <div class="chips">
                        <md-chip class="md-primary" v-bind:key="pos.short" v-for="pos in sens.part_of_speech">
                            {{pos.short}}
                            <md-tooltip>{{pos.long}}</md-tooltip>
                        </md-chip>
                        <md-chip class="md-accent" v-bind:key="fld.short" v-for="fld in sens.field_of_use">
                            {{fld.short}}
                            <md-tooltip>{{fld.long}}</md-tooltip>
                        </md-chip>
                    </div>

                    <div>
                        {{i + 1}}. {{sens.definitions.join('; ')}}
                        <div class="note">{{sens.miscellaneous.join('. ')}}</div>
                    </div>
                </div>
            </div>

            <div class="md-layout-item md-size-20">
                <div v-if="word.forms.length > 1">Other forms</div>
                <div v-for="(form, i) in word.forms" v-if="i > 0">
                    <div>
                        {{form.kanji.literal}} <span class="note">{{form.kanji.info}}</span>
                        【{{form.reading.literal}}】 <span class="note">{{form.reading.info}}</span>
                    </div>
                </div>
            </div>
        </div>
    </md-content>
</template>

<style scoped lang="scss">
    @import '../../node_modules/vue-material/dist/theme/engine';

    .md-layout {
        margin: 15px 30px;

        @media screen and (max-width: 768px) {
            div {
                padding: 0 !important;
                text-align: center;
                min-width: 100%;
                max-width: 100%;
            }

            .chips {
                // TODO
            }
        }

        .buttons .md-button {
            margin-left: 0;
            background-color: rgba(white, 0.1);
            z-index: 1;
        }

        .md-layout-item {
            padding: 20px 0;
        }

        .md-chip {
            margin: 10px 3px;
        }

        .note {
            color: md-get-palette-color(gray, 500);
            font-size: 14px;
        }

        .reading {
            color: md-get-palette-color(gray, 500);
            font-size: 16px;
        }

        .kanji {
            font-size: 36px;
            line-height: normal;
        }
    }
</style>

<script>
    export default {
        name: "Word",
        props: {
            word: Object
        }
    }
</script>