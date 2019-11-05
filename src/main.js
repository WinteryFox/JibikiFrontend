import Vue from 'vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

import App from './App.vue'
import WordSearch from './components/WordSearch.vue'
import KanjiSearch from './components/KanjiSearch'
import VueRouter from "vue-router";

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/words', component: WordSearch},
        {path: '/kanji', component: KanjiSearch}
    ]
});

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueRouter);

new Vue({
    components: { App },
    router,
    render: h => h(App)
}).$mount('#app');