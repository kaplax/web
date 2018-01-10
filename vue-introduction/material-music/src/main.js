import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import './public/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import store from './store'
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('public/images/default.png')
})
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
