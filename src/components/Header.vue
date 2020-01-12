<template>
    <div class="header">
        <md-content>
            <md-button class="brand" to="/">
                <img alt="branding logo and text" src="/logo_text.svg"/>
            </md-button>
            <p>BETA</p>
            <div class="icons">
                <md-button class="md-icon-button discord" href="https://discord.gg/aKTwN5c" target="_blank">
                    <md-tooltip>
                        Join Discord server
                    </md-tooltip>
                    <md-icon md-src="/discord.svg"/>
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

                <md-button class="md-icon-button discord" to="/docs">
                    <md-tooltip>
                        API documentation
                    </md-tooltip>
                    <md-icon>library_books</md-icon>
                </md-button>

                <md-button @click="changeTheme" class="md-icon-button theme">
                    <md-tooltip>
                        Switch themes
                    </md-tooltip>
                    <md-icon>invert_colors</md-icon>
                </md-button>

                <md-button @click="toggleLogin" v-if="user === undefined || user === null"
                           class="md-icon-button"
                           to="">
                    <md-tooltip>
                        Login or register
                    </md-tooltip>
                    <md-icon>account_circle</md-icon>
                </md-button>
                <md-button v-else class="md-icon-button" to="/profile">
                    <md-tooltip>
                        {{user.username}}
                    </md-tooltip>
                    <md-avatar class="md-avatar-icon">
                        {{user.username[0]}}
                    </md-avatar>
                </md-button>
            </div>
        </md-content>
        <div class="login">
            <md-dialog :md-active.sync="showLogin">
                <md-dialog-title>
                    Login
                </md-dialog-title>

                <md-dialog-content>
                    <md-field>
                        <label>Email</label>
                        <md-input ref="email" autocomplete="email" name="email" type="email" required
                                  v-model="loginForm.email"
                                  @keypress.enter="login"/>
                        <span class="md-error" v-if="loginForm.email">
                            Email is required
                        </span>
                    </md-field>
                    <md-field>
                        <label>Password</label>
                        <md-input autocomplete="current-password" name="password" required type="password"
                                  v-model="loginForm.password"
                                  @keypress.enter="login"/>
                        <span class="md-error">
                            Password is required
                        </span>
                    </md-field>
                </md-dialog-content>

                <md-dialog-actions>
                    <md-button @click="showLogin = false" class="md-primary">
                        Close
                    </md-button>
                    <md-button @click="toggleRegister" class="md-primary">
                        Register
                    </md-button>
                    <md-button @click="login" class="md-primary">
                        Login
                    </md-button>
                </md-dialog-actions>
            </md-dialog>
            <md-dialog :md-active.sync="showRegister">
                <md-dialog-title>
                    Register
                </md-dialog-title>

                <md-dialog-content>
                    <md-field>
                        <label>Username</label>
                        <md-input autocomplete="password" name="username" type="text" required v-model="registerForm.username"/>
                        <span class="md-error" v-if="registerForm.username">
                            Username is required
                        </span>
                    </md-field>
                    <md-field>
                        <label>Email</label>
                        <md-input autocomplete="email" name="email" type="email" required v-model="registerForm.email"/>
                        <span class="md-error" v-if="registerForm.email">
                            Email is required
                        </span>
                    </md-field>
                    <md-field>
                        <label>Password</label>
                        <md-input autocomplete="new-password" name="password" type="password" required v-model="registerForm.password"/>
                        <span class="md-error" v-if="registerForm.password">
                            Password is required
                        </span>
                    </md-field>
                </md-dialog-content>

                <md-dialog-actions>
                    <md-button @click="showRegister = false" class="md-primary">
                        Close
                    </md-button>
                    <md-button @click="register" class="md-primary">
                        Register
                    </md-button>
                </md-dialog-actions>
            </md-dialog>
        </div>
        <md-snackbar md-position="center" :md-active.sync="showSnackbar" md-persistent>
            <span v-if="user != null">Welcome {{user.username}}!</span>
        </md-snackbar>
    </div>
</template>

<style scoped lang="scss">
    @import '~vue-material/dist/theme/engine';

    .header {
        position: relative;

        .brand {
            img {
                display: inline-block;
                width: 200px;
                height: 100px;
            }
        }

        p {
            display: inline-block;
            padding: 0;
            margin-top: 20px;
            margin-bottom: 0;
        }

        .icons {
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            right: 10px;
        }

        @media screen and (max-width: 768px) {
            .md-button {
                margin: 1px;
            }

            h3 {
                padding: 10px 20px;
            }

            small {
                display: none;
            }
        }
    }
</style>

<style lang="scss">
    @media screen and (max-width: 768px) {
        .header {
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
    export default {
        name: "Header",

        methods: {
            changeTheme: function () {
                this.$store.commit("toggleTheme");
            },

            toggleLogin() {
                this.showLogin = !this.showLogin;
            },

            toggleRegister() {
                this.showLogin = false;
                this.showRegister = true;
            },

            login() {
                this.$store.dispatch('getToken', this.loginForm);
                this.$store.dispatch('getUser');
                this.showLogin = false;
                this.showSnackbar = true;
            },

            register() {
                this.$store.dispatch('register', this.registerForm);
                this.showRegister = false;
            }
        },

        data: () => ({
            showLogin: false,
            showRegister: false,
            showSnackbar: false,
            loginForm: {
                email: "",
                password: ""
            },
            registerForm: {
                username: "",
                email: "",
                password: ""
            }
        }),

        computed: {
            user() {
                return this.$store.getters.getUser;
            }
        }
    }
</script>