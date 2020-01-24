<template>
    <div>
        <p id="sentence">{{sentence.sentence}}</p>

        <div id="buttons">
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

            <Bookmark id="bookmark" :type="2" :id="sentence.id"/>
        </div>
    </div>
</template>

<script>
    import Bookmark from "../Bookmark";

    export default {
        name: "SentencePart",
        components: {Bookmark},
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

<style scoped lang="scss">
    #sentence {
        display: inline-flex;
        margin: 0;
        max-width: calc(100% - 80px)
    }

    button {
        margin: 0;
    }

    #buttons {
        display: inline-flex;
        height: 40px;
        max-height: 40px;
        width: 80px;
        max-width: 80px;
        float: right;
    }

    #audio-disabled {
        display: inline-flex;
    }
</style>