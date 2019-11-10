import Vue from 'vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './themes/light.scss'
import './themes/dark.scss'

import App from './App.vue'
import Home from './components/Home.vue'
import MissingPage from './components/MissingPage.vue'
import WordSearch from './components/WordSearch.vue'
import KanjiSearch from './components/KanjiSearch'
import Documentation from './components/Documentation'
import VueRouter from "vue-router";
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueCookies);

VueCookies.config(-1);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/words', component: WordSearch},
        {path: '/kanji', component: KanjiSearch},
        {path: '/docs', component: Documentation},
        {path: '*', component: MissingPage}
    ]
});

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state: {

    },

    getters: {
        isDark: () => {
            return VueCookies.get("isDark") === "true";
        }
    },

    mutations: {
        toggleTheme() {
            VueCookies.set("isDark", !(VueCookies.get("isDark") === "true"));
        }
    },

    actions: {
        toggleTheme() {
            this.commit('toggleTheme')
        }
    }
});

new Vue({
    components: {App},
    router,
    store,
    render: h => h(App)
}).$mount('#app');