<template>
    <div id="app">
        <Header/>
        <Search/>
    </div>
</template>

<script>
    /// Import Jibiki components
    import Header from './components/Header.vue'
    import Search from './components/Search.vue'

    export default {
        name: 'App',
        components: {
            Header,
            Search
        }
    }
</script>

<style>
    body {
        font-size: 19px;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .center {
        text-align: center;
    }

    .container {
        display: block;
    }
</style>
