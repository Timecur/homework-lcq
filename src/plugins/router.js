import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/routes'
import { ROUTER_DEFAULT_CONFIG } from '@/config'
import { routerBeforeEachFunc, routerAfterEachFunc } from '@/config/interceptors/router'

Vue.use(Router)

// 注入默认配置以及默认路由表
const routerInstance = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes: constantRouterMap,
})

// 注入路由拦截器
routerInstance.beforeEach(routerBeforeEachFunc)
routerInstance.afterEach(routerAfterEachFunc)

export default routerInstance
