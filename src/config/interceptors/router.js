import Vue from 'vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

import axios from '@/plugins/axios'
import { getToken } from '@/utils/auth'

import { ROUTER_BASE_PATH, NODE_ENV } from '../index'

const whiteList = ['login']// no redirect whitelist
let curVersion

NProgress.configure({ showSpinner: false })// NProgress Configuration

const valiVersion = () => new Promise((resolve) => {
  if (NODE_ENV !== 'localdev') {
    const time = +new Date()
    axios.get(`${ROUTER_BASE_PATH}static/version.json?time=${time}`).then((res) => {
      const { version } = res
      if (!curVersion) {
        curVersion = version
        resolve()
      } else if (curVersion !== version) {
        Vue.prototype.$notify({
          title: '当前不是最新版本',
          onClick() {
            curVersion = version
            window.location.reload()
          },
          dangerouslyUseHTMLString: true,
          message: '<button>刷新一下</button>',
          duration: 0,
          showClose: false,
          type: 'success',
          position: 'bottom-right',
        })
        resolve()
      } else {
        resolve()
      }
    })
  }
})

export function routerBeforeEachFunc(to, from, next) {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.customTitle) {
    switch (to.meta.customTitle) {
      default:
        document.title = to.meta.customTitle
        break
    }
  }

  valiVersion()
  NProgress.start()

  if (getToken()) {
    /* has token */
    if (to.path === '/login') {
      next()
      NProgress.done()
    }
    next()
  } else if (whiteList.indexOf(to.name) !== -1) { // 在免登录白名单，直接进入
    next()
  } else {
    next({ name: 'login' }) // 否则全部重定向到登录页
    NProgress.done()
  }
}

export function routerAfterEachFunc() {
  NProgress.done()
}
