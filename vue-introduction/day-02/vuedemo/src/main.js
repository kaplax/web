// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App';
import './theme/theme.scss';
import router from './router'
import VueMDCButton from 'vue-mdc-adapter/index';
import 'vue-mdc-adapter/index.min.css'
// import store from './components/vuex'
Vue.config.productionTip = false
Vue.use(VueMDCButton)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
