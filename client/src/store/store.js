import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { auth } from './auth.module'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
}) 

export default new Vuex.Store({
  modules: {
    auth
  },
  plugins: [vuexLocalStorage.plugin]
})
