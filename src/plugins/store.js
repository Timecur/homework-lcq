import Vue from 'vue'
import Vuex from 'vuex'
import { VUEX_DEFAULT_CONFIG } from '@/config'
import commonStore from '@/service/store'

Vue.use(Vuex)

export default new Vuex.Store({
  ...commonStore,
  ...VUEX_DEFAULT_CONFIG,
})
