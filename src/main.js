import Vue from 'vue'
import App from './App.vue'

/// Import external components
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.config.productionTip = false;

Vue.use(VueMaterial);

new Vue({
    render: h => h(App),
}).$mount('#app');