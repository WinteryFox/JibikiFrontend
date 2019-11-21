<template>
    <div>
        <md-content>
            <span>Jibiki <small>BETA</small></span>
            <div class="icons">
                <md-button class="md-icon-button discord" href="https://discord.gg/aKTwN5c" target="_blank">
                    <md-tooltip>
                        Join Discord server
                    </md-tooltip>
                    <md-icon md-src="https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg"/>
                </md-button>
                <md-button class="md-icon-button patreon" href="https://patreon.com/Jibiki" target="_blank">
                    <md-tooltip>
                        Become a Patron
                    </md-tooltip>
                    <md-icon md-src="/patreon.svg"/>
                </md-button>
                <md-button class="md-icon-button github" href="https://github.com/WinteryFox/JibikiAPI" target="_blank">
                    <md-tooltip>
                        GitHub
                    </md-tooltip>
                    <md-icon md-src="/github.svg"/>
                </md-button>
                <md-button class="md-icon-button theme" v-on:click="changeTheme">
                    <md-tooltip>
                        Switch themes
                    </md-tooltip>
                    <md-icon>invert_colors</md-icon>
                </md-button>
            </div>
        </md-content>
        <md-tabs md-alignment="centered" md-sync-route>
            <md-tab id="tab-home" md-label="Home" to="/" md-icon="home" exact/>
            <md-tab id="tab-words" md-label="Words" to="/words" md-icon="translate"/>
            <md-tab id="tab-kanji" md-label="Kanji" to="/kanji" md-icon="/kanji.svg"/>
            <md-tab id="tab-sentences" md-label="Sentences" to="/sentences" md-icon="translate"/>
            <md-tab id="tab-documentation" md-label="Developer" to="/docs" md-icon="library_books"/>
        </md-tabs>
    </div>
</template>

<style lang="scss">
    @media screen and (max-width: 768px) {
        .content {
            min-height: 50%;
            max-height: 50%;
        }

        .md-tabs-navigation .md-button {
            font-size: 10px;
        }

        .md-layout .md-layout-item {
            .md-chip {
                margin: 0 0 5px 0;
            }

            padding: 0 !important;
            min-width: 100%;
            max-width: 100%;
        }
    }
</style>

<style scoped lang="scss">
    @import '~vue-material/dist/theme/engine';

    .md-content {
        top: 35px;
    }

    @media screen and (max-width: 768px) {
        .md-button {
            margin: 1px;
        }

        .md-content {
            top: 0;
            height: 55px;
        }

        .md-tabs {
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 2;
        }
    }

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
        padding-left: 25px;
        transform: translate(0, -50%);
        font-size: 40px;
    }

    .icons {
        position: absolute;
        z-index: 2;
        top: 50%;
        transform: translate(0, -50%);
        right: 0;
    }

    small {
        font-size: 20px;
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