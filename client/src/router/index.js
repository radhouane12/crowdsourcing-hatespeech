import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '../components/LandingPage'
import Annotation from '../components/Tweets/Annotation'
import Test from '../components/Test/Test'
import Flags from '../components/Flags/Flags'
import About from '../components/About'
import Dictionaries from '../components/Dictionaries/Dictionaries'
import Statistics from '../components/Statistics/Statistics'
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
    },
    {
      path: '/dictionaries',
      name: 'dictionaries',
      component: Dictionaries,
    },
    {
      path: '/flags',
      name: 'flags',
      component: Flags,
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    }
  ]
})

router.beforeEach((to, from, next) => {
  if ( to.name == ('annotation' || 'dictionaries' || 'flags' || 'test' || 'statistics' ) && !store.state.auth.isUserLoggedIn) {
    next({name: 'landing'})
  }
  else if (store.state.auth.testState && to.name != 'testPage'){
    next({name: 'testPage'})
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
