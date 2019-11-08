<template>
    <div>
        <SearchBar label="Search for kanji, meaning or reading" v-on:search="getKanji"/>
        <Kanji v-bind:key="k.literal" v-bind:kanji="k" v-for="k in this.kanji"></Kanji>
    </div>
</template>

<script>
    import SearchBar from '@/components/SearchBar'
    import Kanji from "@/components/Kanji";
    import axios from 'axios'

    export default {
        name: "KanjiSearch",
        components: {
            SearchBar,
            Kanji
        },
        data: () => ({
            kanji: []
        }),

        methods: {
            getKanji(kanji) {
                this.kanji = [];

                for (let i = 0; i < kanji.length; i++)
                    axios.get('http://localhost:8080/kanji?q=' + encodeURIComponent(kanji.charAt(i)))
                        .then(response => {
                            if (Array.isArray(response.data) && response.data.length) {
                                this.kanji.push(response.data[0])
                            }
                        })
                        .catch(e => alert(e)) // TODO
            }
        }
    }
</script>