<template>
    <md-button class="md-icon-button" to="" @click="bookmark">
        <md-icon v-if="!isBookmarked">
            star_border
        </md-icon>
        <md-icon v-else>
            star
        </md-icon>
    </md-button>
</template>

<script>
    export default {
        name: "Bookmark",

        props: {
            isBookmarked: {
                type: Boolean
            }
        },

        methods: {
            bookmark() {
                if (this.$store.user !== null)
                    this.$store.dispatch('toggleBookmark', {type: 1, bookmark: this.kanji.id});
                else
                    this.$parent.$parent.register = true;
            }
        }
    }
</script>

<style scoped>

</style>