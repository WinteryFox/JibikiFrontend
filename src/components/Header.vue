<template>
    <header class="header">
        <h1><a class="stop" href="/">Jibiki</a></h1>
        <nav>
            <ul>
                <li>
                    <a class="stop" target="_blank" href="https://discord.gg/aKTwN5c">Discord</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
    nav {

    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .stop {
        color: #b9b9b9;
        text-decoration: none;
    }
</style>

<script>
    export default {
        name: "Header"
    }
</script>