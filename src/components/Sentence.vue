<template>
    <md-content class="md-elevation-3">
        <div class="md-layout">
            <div class="md-layout-item">
                <div class="source">
                    {{sentence.sentence}}
                </div>
                <div class="translation" v-for="(translation, i) in sentence.translations">
                    {{i + 1}}. {{translation.sentence}}
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

        .md-layout-item {
            padding: 20px 0;
        }

        .source {

        }

        .translation {

        }
    }
</style>