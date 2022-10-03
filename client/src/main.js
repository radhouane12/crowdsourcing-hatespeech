// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' 
import {sync} from 'vuex-router-sync'
import store from './store/store'


Vue.config.productionTip = false

Vue.prototype.$store = store;
sync(store,router)



new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  components: { App },
  template: '<App/>'
})
