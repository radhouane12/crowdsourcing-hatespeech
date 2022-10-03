import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import Register from '@/components/Register'
import Login from '@/components/Login'
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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/annotation',
      name: 'annotation',
      component: Annotation
    }
  ]
})
