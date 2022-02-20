import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import EventBus from '@/plugins/event-bus'
import routes from '@/routes'

Vue.config.productionTip = false
Vue.use(EventBus)
Vue.use(VueRouter)

const router = new VueRouter({ 
  routes,
  mode: 'history' 
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
