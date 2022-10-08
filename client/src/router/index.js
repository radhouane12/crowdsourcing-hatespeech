import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '../components/LandingPage'
import Annotation from '../components/Annotation'
import Test from '../components/Test/Test'
import store from "../store/store"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/annotation',
      name: 'annotation',
      component: Annotation
    },
    {
      path: '/test',
      name: 'testPage',
      component: Test,
      //ADD a BeforeEnter where it's only allowed if from register, otherwise forward to annotation
    }
  ]
})

router.beforeEach((to, from, next) => {
  if ( to.name!== 'landing' && !store.state.auth.isUserLoggedIn) {
    next({name: 'landing', replace: true})
  }
  else next()
})

router.beforeEach((to, from, next) => {
  if (to.name == 'landing' && store.state.auth.isUserLoggedIn) {
    next({ name: 'annotation' })
  }
  else {
    next()
  }
})

export default router
