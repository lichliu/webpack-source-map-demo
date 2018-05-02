import Vue from 'vue'
import App from './App.vue'

/* eslint-disable no-new */
let app = new Vue({
    render:h=>h(App)
});
app.$mount('#app');
