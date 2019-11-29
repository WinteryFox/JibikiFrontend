<template>
    <md-card v-if="user !== null">
        <md-card-header>
            <md-avatar class="md-avatar-icon md-large">
                {{user.username[0]}}
            </md-avatar>

            <div class="md-title">
                {{user.username}} <span class="md-subhead">({{user.snowflake}})</span>
            </div>
            <div class="md-subhead">
                {{user.creation}}
            </div>
            <div class="md-subhead">
                {{user.email}}
            </div>
        </md-card-header>

        <md-card-content>
            I am cool!
        </md-card-content>

        <md-card-actions>
            <md-button @click="logout" class="logout">Logout</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Profile",

        methods: {
            logout() {
                axios.delete(
                    this.$hostname + "/users/logout",
                    {
                        withCredentials: true
                    })
                    .then(ignored => {
                        this.$store.commit('setUser', null);
                        this.$router.push('/');
                    })
            }
        },

        computed: {
            user() {
                return this.$store.getters.getUser
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~vue-material/dist/theme/engine';

    .md-card {
        margin: auto auto;
        width: 60%;

        .md-button.logout {
            color: md-get-palette-color(red, 400) !important;
        }
    }
</style>