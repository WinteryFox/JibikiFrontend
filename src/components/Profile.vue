<template>
    <div>
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
        </md-card>

        <div>
            Bookmarks

            <div id="words">
                Words

                <Word :key="word.id" :word="word" v-for="word in bookmarks.words"/>
            </div>

            <div id="kanji">
                Kanji

                <Kanji :key="kanji.id" :kanji="kanji" v-for="kanji in bookmarks.kanji"/>
            </div>

            <div id="sentences">
                Sentences

                <Sentence :key="sentence.id" :sentence="sentence" v-for="sentence in bookmarks.sentences"/>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Word from "./cards/Word";
    import Kanji from "./cards/Kanji";
    import Sentence from "./cards/Sentence";

    export default {
        name: "Profile",
        components: {Sentence, Kanji, Word},
        data: () => ({
            bookmarks: {
                words: [],
                kanji: [],
                sentences: []
            }
        }),

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
            },

            fetchBookmarks() {
                axios
                    .get(this.$hostname + '/words?query=' + encodeURIComponent(this.user.bookmarks.words.join(',')))
                    .then(res => {
                        this.bookmarks.words = res.data;
                    });
                axios
                    .get(this.$hostname + '/kanji?query=' + encodeURIComponent(this.user.bookmarks.kanji.join(',')))
                    .then(res => {
                        this.bookmarks.kanji = res.data;
                    });
                axios
                    .get(this.$hostname + '/sentences?query=' + encodeURIComponent(this.user.bookmarks.sentences.join(',')))
                    .then(res => {
                        this.bookmarks.sentences = res.data;
                    });
            }
        },

        computed: {
            creation() {
                return new Date(Number((BigInt(this.user.snowflake) >> BigInt(22)) + BigInt(1546300800000)));
            },

            user() {
                return this.$store.getters.getUser
            }
        },

        watch: {
            user(to) {
                if (to !== null)
                    this.fetchBookmarks();
            }
        },

        mounted() {
            this.fetchBookmarks();
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