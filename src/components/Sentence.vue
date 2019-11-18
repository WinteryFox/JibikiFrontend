<template>
    <md-content class="md-elevation-3">
        <div class="md-layout">
            <div class="md-layout-item">
                <div class="source">
                    {{sentence.sentence}}
                </div>
                <div class="translation" v-for="(translation, i) in sentence.translations">
                    <md-divider/>
                    {{translation.sentence}}
                </div>
            </div>
        </div>
    </md-content>
</template>

<script>
    export default {
        name: "Sentence",
        props: {
            sentence: Object
        }
    }
</script>

<style scoped lang="scss">
    @import '~vue-material/dist/theme/engine';

    .md-layout {
        margin: 15px 30px;

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

        .translation {
            font-size: 20px;
            color: md-get-palette-color(gray, 500);
        }
    }
</style>