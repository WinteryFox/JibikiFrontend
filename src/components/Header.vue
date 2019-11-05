<template>
    <div>
        <md-tabs md-alignment="centered" md-sync-route>
            <md-tab id="tab-words" md-label="Words" to="/words"
                    md-icon="translate"/>
            <md-tab id="tab-kanji" md-label="Kanji" to="/kanji"
                    md-icon="/kanji.svg"/>
            <md-tab id="tab-discord" md-label="Discord" href="https://discord.gg/aKTwN5c"
                    md-icon="https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg"/>
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