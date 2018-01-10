// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueMaterial from 'vue-material'
import VueLazyload from 'vue-lazyload'
import App from './App'
import router from './router'
import store from './store'
// import 'vue-material/dist/vue-material.css'
import '@/common/less/index.less'
import 'swiper/dist/css/swiper.css'
import VueLazyLoad from 'vue-lazyload'
// import VueMaterial from 'vue-material'
// Vue.use(VueMaterial.MdLayout)
// Vue.use(VueMaterial.MdCore)
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('@/common/images/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

