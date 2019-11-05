<template>
    <div>
        <span>Jibiki</span>
        <md-tabs md-alignment="centered" md-sync-route>
            <md-tab id="tab-home" md-label="Home" to="/" md-icon="home" exact/>
            <md-tab id="tab-words" md-label="Words" to="/words" md-icon="translate"/>
            <md-tab id="tab-kanji" md-label="Kanji" to="/kanji" md-icon="/kanji.svg"/>
            <md-tab id="tab-documentation" md-label="API Docs" to="/docs" md-icon="library_books"/>
            <md-tab id="tab-discord" md-label="Discord" href="https://discord.gg/aKTwN5c"
                    md-icon="https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg"/>
        </md-tabs>
    </div>
</template>

<style scoped lang="scss">
    div {
        position: relative;
    }

    span {
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 25px;
        transform: translate(0, -50%);
        font-size: 40px;
    }
</style>

<script>
    export default {
        name: "Header"
    }
</script>