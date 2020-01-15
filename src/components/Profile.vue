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
                {{creation}}
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

        <div
                v-if="bookmarks !== undefined"
                v-for="word in bookmarks.words">
            {{word}}
        </div>
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
            bookmarks() {
                return this.$store.getters.getBookmarks
            },

            creation() {
                return new Date(Number((BigInt(this.user.snowflake) >> BigInt(22)) + BigInt(1546300800000)));
            },

            user() {
                return this.$store.getters.getUser
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~vue-material/dist/theme/engine';

    .md-card {
        .md-button.logout {
            color: md-get-palette-color(red, 400) !important;
        }
    }
</style>