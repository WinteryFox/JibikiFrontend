<template>
    <md-field md-inline md-clearable>
        <md-icon>search</md-icon>
        <label>
            Search English, Kanji or reading
        </label>
        <md-input accept="text/plain" v-model="search" autofocus/>
    </md-field>
</template>

<script>
    export default {
        name: "SearchBar",

        data: () => ({
            search: ""
        })
    }
</script>

<style scoped lang="scss">
    @import '~vue-material/dist/theme/engine';

    .md-field {
        max-width: 50%;
        margin: 0 auto;
        border: 2px md-get-palette-color(gray, 200);
    }
</style>