<template>
    <md-field md-inline md-clearable>
        <md-icon>search</md-icon>
        <label>{{label}}</label>
        <md-input accept="text/plain" v-model="searchField" v-on:input="search" autofocus/>
    </md-field>
</template>

<script>
    import debounce from 'lodash.debounce';

    export default {
        name: "SearchBar",

        props: {
            label: {
                type: String,
                default: "Type here to search"
            }
        },

        data: () => ({
            searchField: ""
        }),

        methods: {
            search: debounce(function() {
                this.$emit('search', this.searchField)
            }, 200)
        }
    }
</script>

<style scoped lang="scss">
    .md-field {
        margin: 0 auto;
        max-width: 50%;
    }
</style>