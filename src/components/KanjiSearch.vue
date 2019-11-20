<template>
    <div>
        <Search
                label="Search for kanji, meaning or reading"
                :searching="isSearching"
                @search="getKanji">
            <Kanji
                    v-bind:key="k.literal"
                    v-bind:kanji="k"
                    v-for="k in kanji"/>
        </Search>
    </div>
</template>

<script>
    import Search from "./Search";
    import Kanji from "./Kanji";
    import axios from "axios";

    export default {
        name: "KanjiSearch",
        components: {
            Search,
            Kanji
        },
        data: () => ({
            kanji: [],
            isSearching: false
        }),

        methods: {
            getKanji(kanji) {
                this.kanji = [];

                if (kanji.length > 0)
                    this.isSearching = true;

                for (let i = 0; i < kanji.length; i++)
                    axios.get(this.$hostname + '/kanji?query=' + encodeURIComponent(kanji.charAt(i)))
                        .then(response => {
                            if (Array.isArray(response.data) && response.data.length) {
                                this.kanji.push(response.data[0]);
                            }
                            this.isSearching = false;
                        })
                        .catch(e => alert(e)) // TODO
            }
        },

        mounted() {
            this.$el.getElementsByTagName("input")[0].focus();
        }
    }
</script>