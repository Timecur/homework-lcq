/* eslint-disable global-require */
import setCookies from '@ipalfish/palfish_front_logger'
import { NODE_ENV } from '@/config'
import axios from './axios'
import api from './api'
import logger from './log'

export default {
  install: (Vue) => {
    // 本地开发注入cookies
    if (NODE_ENV === 'localdev') {
      import('../../env.json').then((cookies) => {
        setCookies.init(cookies.default)
      })
    }

    // 放置挂载
    Vue.prototype.$api = api
    Vue.prototype.$axios = axios
    Vue.prototype.$logger = logger
  },
}
