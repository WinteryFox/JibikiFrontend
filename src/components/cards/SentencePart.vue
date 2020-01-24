<template>
    <div>
        <p>{{sentence.sentence}}</p>

        <md-button v-if="hasAudio" class="md-icon-button md-dense" @click="playAudio">
            <md-icon>
                volume_up
            </md-icon>
            <md-tooltip>
                Play audio
            </md-tooltip>
        </md-button>
        <div id="audio-disabled" v-else>
            <md-button class="md-icon-button md-dense" disabled>
                <md-icon>
                    volume_off
                </md-icon>
            </md-button>
            <md-tooltip>
                This sentence has no audio
            </md-tooltip>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SentencePart",

        props: {
            sentence: {
                type: Object
            }
        },

        methods: {
            playAudio() {
                new Audio(this.sentence.audio_uri).play();
            }
        },

        computed: {
            hasAudio() {
                return this.sentence.audio_uri !== null
            }
        }
    }
</script>

<style scoped>
    .md-icon-button {
        float: right;
    }

    #sentence {

    }

    #audio-disabled {
        display: inline-flex;
        float: right;
    }
</style>