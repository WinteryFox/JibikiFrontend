<template>
    <div class="header">
        <md-content>
            <span>
                <img alt="jibiki logo" class="logo" src="/icons/fox.svg">
                <img alt="jibiki text" class="text" src="/icons/jibiki.svg">
                <small>BETA</small>
            </span>
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
                <md-button @click="changeTheme" class="md-icon-button theme">
                    <md-tooltip>
                        Switch themes
                    </md-tooltip>
                    <md-icon>invert_colors</md-icon>
                </md-button>
                <md-button @click="showLogin = true" class="md-icon-button">
                    <md-tooltip>
                        Login
                    </md-tooltip>
                    <md-avatar class="md-avatar-icon">
                        A
                    </md-avatar>
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
        <div class="login">
            <md-dialog :md-active.sync="showLogin">
                <md-dialog-title>
                    Login
                </md-dialog-title>

                <md-dialog-content>
                    <md-field>
                        <label>Email</label>
                        <md-input name="username" required v-model="form.email"/>
                        <span class="md-error" v-if="form.email">
                            Email is required
                        </span>
                    </md-field>
                    <md-field>
                        <label>Password</label>
                        <md-input name="password" required type="password" v-model="form.password"/>
                        <span class="md-error" v-if="form.password">
                            Password is required
                        </span>
                    </md-field>
                </md-dialog-content>

                <md-dialog-actions>
                    <md-button @click="showLogin = false" class="md-primary">
                        Close
                    </md-button>
                    <md-button @click="login" class="md-primary">
                        Login
                    </md-button>
                </md-dialog-actions>
            </md-dialog>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '~vue-material/dist/theme/engine';

    .login {

    }

    .header {
        position: relative;

        .logo {
            width: 30px;
            top: 20px;
            margin-right: 10px;
        }

        .text {
            top: 10px;
            width: 100px;
        }

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
    }
</style>

<style lang="scss">
    .header {
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
    }
</style>

<script>
    import axios from 'axios'
    import qs from 'querystring'

    export default {
        name: "Header",

        methods: {
            changeTheme: function () {
                this.$store.commit("toggleTheme");
            },

            login() {
                const body = {
                    email: this.form.email,
                    password: this.form.password
                };

                const headers = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    withCredentials: true
                };

                axios.post(this.$hostname + '/users/login', qs.stringify(body), headers)
                    .then(ignored => {
                        axios.get(this.$hostname + '/users/@me')
                    });
            }
        },

        data: () => ({
            showLogin: false,
            form: {
                email: "",
                password: ""
            },
            user: null
        })
    }
</script>