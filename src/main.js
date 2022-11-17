import Vue from 'vue'
import App from './App.vue'
import "./bootstrap"
import {router} from "./router"
import "./form"
import "./axios"
// import store from "./store"
Vue.config.productionTip = false

new Vue({
  router,
  //store,
  render: h => h(App),
}).$mount('#app')
