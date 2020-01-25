<template>
    <div>
        <md-field>
            <label>Language</label>

            <md-select v-model="filters.source" name="language" id="language">
                <md-option value="eng">
                    English (英語)
                </md-option>
                <md-option value="jpn">
                    Japanese (日本語)
                </md-option>
            </md-select>

            <MultiSlider/>
        </md-field>
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

</style>