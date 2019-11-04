<template>
    <div>
        <md-tabs md-alignment="centered" md-sync-route>
            <md-tab id="tab-words" md-label="Words" to="/words"/>
            <md-tab id="tab-kanji" md-label="Kanji" to="/kanji"/>
        </md-tabs>
    </div>
</template>

<style scoped lang="scss">

</style>

<script>
    export default {
        name: "Header"
    }
</script>