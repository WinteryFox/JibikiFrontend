<template>
    <div v-if="this.$store.getters.getUser === null">
        <md-button class="md-icon-button" to="" @click="bookmark" disabled>
            <md-icon v-if="!isBookmarked">
                star_border
            </md-icon>
        </md-button>
        <md-tooltip>
            Please log in to use the bookmark feature
        </md-tooltip>
    </div>
    <md-button v-else class="md-icon-button" to="" @click="bookmark">
        <md-icon v-if="isBookmarked">
            star
        </md-icon>
        <md-icon v-else>
            star_border
        </md-icon>
    </md-button>
</template>

<script>
    export default {
        name: "Bookmark",

        props: {
            id: {
                type: Number
            },
            type: {
                type: Number
            }
        },

        methods: {
            bookmark() {
                if (this.$store.getters.getUser !== null) {
                    if (this.isBookmarked)
                        this.$store.dispatch('removeBookmark', {type: this.type, bookmark: this.id});
                    else
                        this.$store.dispatch('addBookmark', {type: this.type, bookmark: this.id});
                }
            }
        },

        computed: {
            isBookmarked() {
                let bookmarks = this.$store.getters.getUser;
                if (bookmarks === null)
                    return false;

                switch (this.type) {
                    case 0:
                        return bookmarks.bookmarks.words.includes(this.id);
                    case 1:
                        return bookmarks.bookmarks.kanji.includes(this.id);
                    case 2:
                        return bookmarks.bookmarks.sentences.includes(this.id);
                    default:
                        return false;
                }
            }
        }
    }
</script>

<style scoped>

</style>