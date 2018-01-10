import Vue from 'vue'
import Router from 'vue-router'
import Carrousel from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'carrousel',
      component: Carrousel
    }
  ]
})
