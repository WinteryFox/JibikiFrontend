<template>
    <div>
        <span>Jibiki</span>
        <md-tabs md-alignment="centered" md-sync-route>
            <md-tab id="tab-home" md-label="Home" to="/" md-icon="home" exact/>
            <md-tab id="tab-words" md-label="Words" to="/words" md-icon="translate"/>
            <md-tab id="tab-kanji" md-label="Kanji" to="/kanji" md-icon="/kanji.svg"/>
            <md-tab id="tab-documentation" md-label="API Docs" to="/docs" md-icon="library_books"/>
        </md-tabs>
        <md-button class="md-icon-button discord" href="https://discord.gg/aKTwN5c" target="_blank">
            <md-icon md-src="https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg"/>
        </md-button>
        <md-button class="md-icon-button patreon" href="https://patreon.com/Jibiki" target="_blank">
            <md-icon md-src="/patreon.svg"/>
        </md-button>
        <md-button class="md-icon-button github" href="https://github.com/WinteryFox" target="_blank">
            <md-icon md-src="/github.svg"/>
        </md-button>
        <md-button class="md-icon-button theme" v-on:click="changeTheme">
            <md-icon>invert_colors</md-icon>
        </md-button>
    </div>
</template>

<style scoped lang="scss">
    @import '~vue-material/dist/theme/engine';

    span {
        color: md-get-palette-color(pink, 200);
    }

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

    .theme {
        right: 10px;
    }

    .github {
        right: 50px;
    }

    .patreon {
        right: 90px;
    }

    .discord {
        right: 130px;
    }

    .md-button {
        position: absolute;
        z-index: 2;
        top: 50%;
        transform: translate(0, -50%);
    }
</style>

<script>
    export default {
        name: "Header",

        methods: {
            changeTheme: function () {
                this.$store.commit("toggleTheme");
            }
        }
    }
</script>