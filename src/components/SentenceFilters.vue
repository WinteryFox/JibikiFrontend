<template>
    <div>
        <md-button @click="toggleSource">
            <md-icon v-if="filters.source === 'eng'" class="flag" md-src="/flags/eng.svg"/>
            <md-icon v-else class="flag" md-src="/flags/jpn.svg"/>
            <md-icon class="flag">
                swap_horizontal
            </md-icon>
            <md-icon v-if="filters.source === 'eng'" class="flag" md-src="/flags/jpn.svg"/>
            <md-icon v-else class="flag" md-src="/flags/eng.svg"/>
        </md-button>
    </div>
</template>

<script>
    import MultiSlider from "../MultiSlider";
    export default {
        name: "SentenceFilters",
        components: {MultiSlider},
        data: () => ({
            filters: {
                source: 'eng'
            }
        }),

        methods: {
            toggleSource() {
                if (this.filters.source === 'eng')
                    this.filters.source = 'jpn';
                else
                    this.filters.source = 'eng';
            }
        },

        watch: {
            filters: {
                handler() {
                    this.$emit('filtersUpdate', this.filters);
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    .flag {
        display: inline-block;
        padding: 0;
        margin: 0;
    }
</style>