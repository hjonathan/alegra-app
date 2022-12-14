import Vue from 'vue'
import App from './App.vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import vuetify from './plugins/vuetify'

Vue.use(PiniaVuePlugin)
const pinia = createPinia();
Vue.config.productionTip = false

new Vue({
  vuetify,
  pinia,
  render: h => h(App)
}).$mount('#app')
