<template>
    <md-content class="md-elevation-3">
        <div class="md-layout">
            <div class="md-layout-item">
                <div class="source">
                    {{sentence.sentence}}
                </div>
                <div class="translation" v-for="translation in sentence.translations" v-if="isExtended">
                    <md-divider/>
                    {{translation.sentence}}
                </div>
            </div>
            <md-button class="md-icon-button" @click="isExtended = !isExtended">
                <md-tooltip v-if="!isExtended">
                    Show translation
                </md-tooltip>
                <md-tooltip v-else>
                    Hide translation
                </md-tooltip>
                <md-icon v-if="!isExtended">
                    expand_more
                </md-icon>
                <md-icon v-else>
                    expand_less
                </md-icon>
            </md-button>
        </div>
    </md-content>
</template>

<script>
    export default {
        name: "Sentence",
        props: {
            sentence: Object,
            isExtended: true
        }
    }
</script>

<style scoped lang="scss">
    @import '~vue-material/dist/theme/engine';

    .md-layout {
        margin: 15px 30px;

        @media screen and (max-width: 768px) {
            .source {
                padding-top: 10px;
            }

            .md-icon-button {
                margin: 2px auto !important;
            }
        }

        .md-icon-button {
            margin: 15px auto;
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

        .source {
            font-size: 20px;
            margin-bottom: 10px;
        }
    }
</style>