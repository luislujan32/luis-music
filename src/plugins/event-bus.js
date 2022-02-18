const eventBus = {}

// Vue va a instalar el plugin en todos los camponentes
eventBus.install = function (Vue) {
  Vue.prototype.$bus = new Vue()
}

export default eventBus