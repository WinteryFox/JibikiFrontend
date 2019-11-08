<template>
    <md-field md-inline md-clearable>
        <md-icon>search</md-icon>
        <label>{{label}}</label>
        <md-input accept="text/plain" v-model="searchField" v-on:input="search" autofocus/>
    </md-field>
</template>

<script>
    import debounce from 'lodash.debounce'

    export default {
        name: "SearchBar",

        props: {
            label: String
        },

        data: () => ({
            searchField: ""
        }),

        methods: {
            search() {
                console.log('Im not gay');
                debounce(() => {
                    console.log('arent you gay');
                    this.$emit('search', this.searchField)
                }, 2000)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~vue-material/dist/theme/engine';

    .md-field {
        margin: 0 auto;
        max-width: 50%;
    }
</style>