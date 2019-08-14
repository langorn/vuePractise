import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import VueCookie from 'vue-cookie'
// import axios from 'axios'
import VueRouter from 'vue-router'

import UserName from './components/UserName.vue'
import login from './components/login.vue'

require('./assets/css/bootstrap.min.css')


Vue.use(VueRouter)
Vue.config.productionTip = false
// Vue.use(axios)
Vue.use(VueCookie)



const routes = [
	{ path: '/users', name:'UserName', component: UserName },
	{ path: '/login', name:'Login', component: login}
]
const router = new VueRouter({routes});


new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
