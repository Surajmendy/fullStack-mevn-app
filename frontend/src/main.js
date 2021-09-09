import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueProgressBar from 'vue-progressbar'
import { Form } from 'vform'
import axios from 'axios'


window.Form = Form
window.axios = axios
Vue.use(VueProgressBar, {
    color: '#47B34B',
    failedColor: 'red',
    height: '50px'
})
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
