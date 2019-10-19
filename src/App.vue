<template>
    <div id="app">
        <Header/>
        <Search/>
    </div>
</template>

<script>
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
        background: #222222;
        color: #b9b9b9;
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
