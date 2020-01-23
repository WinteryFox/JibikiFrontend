<template>
    <md-content class="md-elevation-3">
        <div class="md-layout">
            <div class="md-layout-item md-size-90">
                <div class="source">
                    {{sentence.sentence}}
                </div>
                <div class="translation" v-for="translation in sentence.translations" v-if="isExtendedLocally">
                    <md-divider/>
                    {{translation.sentence}}
                </div>
            </div>

            <div class="md-layout-item md-size-5">
                <Bookmark :type="2" :id="sentence.id"/>
            </div>

            <div class="md-layout-item md-size-5">
                <md-button class="md-icon-button" @click="isExtendedLocally = !isExtendedLocally">
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

                <md-button v-if="hasAudio" class="md-icon-button" @click="playAudio(sentence.audio_uri)">
                    <md-icon>
                        volume_up
                    </md-icon>
                    <md-tooltip>
                        Play audio
                    </md-tooltip>
                </md-button>
                <div v-else>
                    <md-button class="md-icon-button" disabled>
                        <md-icon>
                            volume_off
                        </md-icon>
                    </md-button>
                    <md-tooltip>
                        This sentence has no audio
                    </md-tooltip>
                </div>
            </div>
        </div>
    </md-content>
</template>

<script>
    import Bookmark from "../Bookmark";

    export default {
        name: "Sentence",
        components: {Bookmark},
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
        methods: {
            playAudio(uri) {
                new Audio(uri).play();
            }
        },
        watch: {
            isExtended(to) {
                this.isExtendedLocally = to;
            }
        },
        computed: {
            hasAudio() {
                return this.sentence.audio_uri !== null
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../../node_modules/vue-material/dist/theme/engine';

    .md-layout {
        margin: 15px 30px;

        .md-layout-item {
            padding: 10px 0 !important;
        }

        .source {
            font-size: 20px;
            margin-top: 10px;
        }

        @media screen and (max-width: 768px) {
            .source {
                padding-top: 10px;
            }

            .md-icon-button {
                margin: 2px auto !important;
            }
        }

        .md-icon-button {
            margin: auto auto;
            z-index: 1;
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