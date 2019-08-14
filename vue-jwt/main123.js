// import Vue from 'vue'
import VueCookie from 'vue-cookie'
import axios from 'axios'
// Vue.use(axios)
Vue.prototype.$http = axios;
Vue.use(VueCookie)