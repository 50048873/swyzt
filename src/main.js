import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import './assets/less/base.less'
import './assets/less/common.less'
import './assets/font/nxst/style.css'

import {handleError} from './assets/js/util'
// import store from './store'

Vue.use(ElementUI)
Vue.prototype.handleError = handleError

// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  // store,
  render: handler => handler(App)
})
