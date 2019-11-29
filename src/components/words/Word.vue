<template>
    <md-content class="md-elevation-3">
        <div class="md-layout">
            <div class="md-layout-item md-size-20">
                <div class="reading" v-if="word.forms[0].kanji != null">{{word.forms[0].reading}}</div>
                <div class="kanji" v-if="word.forms[0].kanji != null">{{word.forms[0].kanji}}</div>
                <div class="kanji" v-else>{{word.forms[0].reading}}</div>
                <div class="note" v-if="word.forms[0].kanji_info != null">{{word.forms[0].kanjiInfo}}</div>
                <div class="note" v-if="word.forms[0].reading_info != null">{{word.forms[0].readingInfo}}</div>
            </div>

            <div class="md-layout-item md-size-60">
                <div v-for="(sens, i) in word.senses">
                    <md-chip v-bind:key="pos.pos" class="md-primary" v-for="pos in sens.pos">
                        {{pos.pos}}
                        <md-tooltip>{{pos.posInfo}}</md-tooltip>
                    </md-chip>
                    <md-chip v-bind:key="fld.fld" class="md-accent" v-for="fld in sens.fld">
                        {{fld.fld}}
                        <md-tooltip>{{fld.fldInfo}}</md-tooltip>
                    </md-chip>

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
    @import '../../../node_modules/vue-material/dist/theme/engine';

    .md-layout {
        margin: 15px 30px;

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