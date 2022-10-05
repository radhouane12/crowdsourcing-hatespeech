import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import Annotation from '@/components/Annotation'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: LandingPage
    },
    {
      path: '/annotation',
      name: 'annotation',
      component: Annotation
    }
  ]
})
