<template>
    <md-content>
        <div class="md-layout md-alignment-top-center">
            <h1>Welcome to Jibiki</h1>
        </div>
        <div class="md-layout md-alignment-top-center">
            Jibiki is an open-source free-to-use Japanese - English dictionary website
            and API. To start searching millions of words, kanji and sentences click
            on one of section you'd like to search for in the navigation bar.
        </div>
    </md-content>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped lang="scss">
    .md-content {
        margin: 30px;
        line-height: normal;
    }

    .md-alignment-top-center {
        text-align: center
    }

    .md-icon {
        margin: 0;
    }
</style>