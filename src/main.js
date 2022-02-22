import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import blur from '@/directives/blur'
import msToMm from '@/filters/ms-to-mm'
import EventBus from '@/plugins/event-bus'
import routes from '@/routes'
import store from '@/store'

Vue.config.productionTip = false
Vue.use(EventBus)
Vue.use(VueRouter)
Vue.use(msToMm)
Vue.use(blur)

const router = new VueRouter({ 
  routes,
  mode: 'history' // Evitar caracteres raros en la URL como el /#/
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
