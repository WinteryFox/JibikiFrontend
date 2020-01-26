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

        <md-field>
            <label>Minimum amount of characters</label>
            <md-input v-model="filters.minLength"/>
            <span class="md-suffix"> characters</span>
        </md-field>

        <md-field>
            <label>Maximum amount of characters</label>
            <md-input v-model="filters.maxLength"/>
            <span class="md-suffix"> characters</span>
        </md-field>
    </div>
</template>

<script>
    export default {
        name: "SentenceFilters",

        data: () => ({
            filters: {
                source: 'eng',
                minLength: 0,
                maxLength: 1000
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