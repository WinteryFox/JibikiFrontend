<template>
    <div class="md-layout">
        <Word :word="word"/>
        <Sentence :sentence="sentence"/>
    </div>
</template>

<script>
    import Word from "./Word";
    import Kanji from "./Kanji";
    import Sentence from "./Sentence";

    export default {
        name: "All",

        components: {
            Sentence,
            Kanji,
            Word
        },

        props: {
            word: {
                type: Object
            },
            sentence: {
                type: Object
            }
        }
    }
</script>

<style scoped>

</style>