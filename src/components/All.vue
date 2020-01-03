<template>
    <div class="md-layout">
        <div class="md-layout-item">
            <Word :word="all.word"/>
            <Sentence :sentence="all.sentence"/>
        </div>
        <div class="md-layout-item">
            <Kanji :kanji="kanji" :key="kanji.id" v-for="kanji in all.kanji"/>
        </div>
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
            all: {
                type: Object
            }
        }
    }
</script>

<style scoped>

</style>