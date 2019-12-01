<template>
    <md-content class="md-elevation-3 word">
        <div class="md-layout">
            <div class="md-layout-item md-size-20">
                <div class="reading" v-if="word.forms[0].kanji != null">{{word.forms[0].reading}}</div>
                <div class="kanji" v-if="word.forms[0].kanji != null">{{word.forms[0].kanji}}</div>
                <div class="kanji" v-else>{{word.forms[0].reading}}</div>
                <div class="note" v-if="word.forms[0].kanji_info != null">{{word.forms[0].kanjiInfo}}</div>
                <div class="note" v-if="word.forms[0].reading_info != null">{{word.forms[0].readingInfo}}</div>

                <div class="buttons">
                    <md-button
                            v-if="word.forms[0].kanji != null"
                            :to="'/sentences?query=' + encodeURIComponent(word.forms[0].kanji)">
                        View sentences
                    </md-button>
                    <md-button
                            v-else
                            :to="'/sentences?query=' + encodeURIComponent(word.forms[0].reading)">
                        View sentences
                    </md-button>
                </div>
            </div>

            <div class="md-layout-item md-size-60">
                <div v-for="(sens, i) in word.senses">
                    <div class="chips">
                        <md-chip class="md-primary" v-bind:key="pos.pos" v-for="pos in sens.pos">
                            {{pos.pos}}
                            <md-tooltip>{{pos.posInfo}}</md-tooltip>
                        </md-chip>
                        <md-chip class="md-accent" v-bind:key="fld.fld" v-for="fld in sens.fld">
                            {{fld.fld}}
                            <md-tooltip>{{fld.fldInfo}}</md-tooltip>
                        </md-chip>
                    </div>

                    <div>
                        {{i + 1}}. {{sens.gloss.join('; ')}}
                        <div class="note">{{sens.notes}}</div>
                        <div class="note">{{sens.misc}}</div>
                    </div>
                </div>
            </div>

            <div class="md-layout-item md-size-20">
                <div v-if="word.forms.length > 1">Other forms</div>
                <div v-for="(form, i) in word.forms" v-if="i > 0">
                    <div>
                        {{form.kanji}} <span class="note">{{form.kanji_info}}</span>
                        【{{form.reading}}】 <span class="note">{{form.reading_info}}</span>
                    </div>
                </div>
            </div>
        </div>
    </md-content>
</template>

<style scoped lang="scss">
    @import '~vue-material/dist/theme/engine';

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