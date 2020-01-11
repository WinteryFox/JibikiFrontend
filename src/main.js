import Vue from 'vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './themes/light.scss'
import './themes/dark.scss'

import App from './App.vue'
import Home from './components/Home.vue'
import MissingPage from './components/MissingPage.vue'
import Documentation from './components/Documentation'
import Profile from "./components/Profile";
import VueRouter from "vue-router";
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import qs from 'querystring'

Vue.config.productionTip = false;

if (process.env.NODE_ENV !== 'production')
    Vue.prototype.$hostname = 'http://localhost:8080';
else
    Vue.prototype.$hostname = 'https://api.jibiki.app';

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueCookies);

VueCookies.config(-1);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', name: '/', component: Home},
        {path: '/docs', name: 'docs', component: Documentation},
        {path: '/profile', name: 'profile', component: Profile},
        {path: '*', component: MissingPage}
    ]
});

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state: {
        isDark: VueCookies.get("isDark") === "true",
        user: null,
        bookmarks: null
    },

    getters: {
        isDark: (state) => {
            return state.isDark;
        },

        getUser: (state) => {
            return state.user;
        },

        getBookmarks: (state) => {
            return state.bookmarks;
        }
    },

    mutations: {
        toggleTheme(state) {
            if (state.isDark)
                Vue.material.theming.theme = "light";
            else
                Vue.material.theming.theme = "dark";

            state.isDark = !state.isDark;
            VueCookies.set("isDark", state.isDark);
        },

        setUser(state, user) {
            state.user = user;
        },

        setBookmarks(state, bookmarks) {
            state.bookmarks = bookmarks;
        }
    },

    actions: {
        getUser(store) {
            axios.get(
                Vue.prototype.$hostname + '/users/@me',
                {
                    withCredentials: true
                })
                .then(response => {
                    store.commit('setUser', response.data);
                    store.dispatch('getBookmarks');
                })
                .catch(err => {
                })
        },

        toggleBookmark(store, payload) {
            let state = store.getters.getBookmarks;
            if (state === null)
                return;

            let bookmarks;
            if (payload.type === 0)
                bookmarks = state.words;
            else if (payload.type === 1)
                bookmarks = state.kanji;
            else
                bookmarks = state.sentences;

            if (bookmarks.includes(payload.bookmark))
                axios.delete(
                    Vue.prototype.$hostname + '/users/bookmarks?type=' + encodeURIComponent(payload.type) + '&bookmark=' + encodeURIComponent(payload.bookmark),
                    {
                        withCredentials: true
                    }
                ).then(res => {
                    if (res.status === 204)
                        store.dispatch('getBookmarks').then(ignored => {});
                });
            else
                axios.put(
                    Vue.prototype.$hostname + '/users/bookmarks?type=' + encodeURIComponent(payload.type) + '&bookmark=' + encodeURIComponent(payload.bookmark),
                    '',
                    {
                        withCredentials: true
                    }
                ).then(res => {
                    if (res.status === 204)
                        store.dispatch('getBookmarks').then(ignored => {});
                });
        },

        getBookmarks(store) {
            axios.get(
                Vue.prototype.$hostname + '/users/bookmarks',
                {
                    withCredentials: true
                })
                .then(response => {
                    store.commit('setBookmarks', response.data);
                })
                .catch(ignored => {
                })
        },

        getToken(store, form) {
            axios.post(
                Vue.prototype.$hostname + '/users/login',
                qs.stringify(form),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    withCredentials: true
                })
                .then(response => {
                    store.dispatch('getUser');
                })
                .catch(err => alert("Invalid email or password"))
        },

        register(store, form) {
            axios.post(
                Vue.prototype.$hostname + '/users/create',
                qs.stringify(form),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(() => {
                    store.dispatch(
                        'getToken',
                        {
                            email: form.email,
                            password: form.password
                        }
                    );
                })
                .catch(() => {
                    alert("An account with that email already exists")
                })
        }
    }
});

store.dispatch('getUser').then(ignored => {
});

if (store.getters.isDark)
    Vue.material.theming.theme = "dark";
else
    Vue.material.theming.theme = "light";

new Vue({
    components: {App},
    router,
    store,
    render: h => h(App)
}).$mount('#app');