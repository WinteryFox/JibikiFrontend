<template>
    <md-content class="md-elevation-3">
        <div class="md-layout">
            <div class="md-layout-item">
                <div class="source">
                    <SentencePart :sentence="sentence"/>
                </div>
                <div class="translation" v-for="translation in sentence.translations" v-if="isExtendedLocally">
                    <md-divider/>
                    <SentencePart :sentence="translation"/>
                </div>
            </div>

            <div id="buttons" class="md-layout-item">
                <md-button class="md-icon-button md-dense" @click="isExtendedLocally = !isExtendedLocally">
                    <md-tooltip v-if="!isExtendedLocally">
                        Show translation
                    </md-tooltip>
                    <md-tooltip v-else>
                        Hide translation
                    </md-tooltip>
                    <md-icon v-if="!isExtendedLocally">
                        expand_more
                    </md-icon>
                    <md-icon v-else>
                        expand_less
                    </md-icon>
                </md-button>
            </div>
        </div>
    </md-content>
</template>

<script>
    import Bookmark from "../Bookmark";
    import SentencePart from "./SentencePart";

    export default {
        name: "Sentence",

        components: {SentencePart, Bookmark},

        props: {
            sentence: Object,
            isExtended: {
                type: Boolean,
                default: true
            }
        },

        data: () => ({
            isExtendedLocally: true
        }),

        watch: {
            isExtended(to) {
                this.isExtendedLocally = to;
            }
        },
    }
</script>

<style scoped lang="scss">
    @import '../../../node_modules/vue-material/dist/theme/engine';

    .md-layout {
        margin: 15px 30px;

        .md-layout-item {
            padding: 10px 0 !important;
        }

        @media screen and (max-width: 768px) {
            .source {
                padding-top: 10px;
            }
        }

        #buttons {
            width: 32px;
            max-width: 32px;
            height: 32px;
            max-height: 32px;
            margin-top: 1px;

            button {
                margin: 0;
            }
        }

        .md-divider {
            margin: 10px 0;
        }

        .md-layout-item {
            padding: 20px 0;
        }

        .number {
            font-size: 16px;
        }
    }
</style>