import { NODE_ENV } from '@/config'
import { asyncRouterMap, constantRouterMap } from '@/routes'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
export function hasPermission(roles, route) {
  if (route.name) {
    return roles.some(role => route.name === role)
  }
  return true
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
  },
  actions: {
    GenerateRoutes({ getters, commit }, routers) {
      return new Promise((resolve) => {
        let accessedRouters
        if (NODE_ENV !== 'production' && getters.developView) {
          accessedRouters = asyncRouterMap || []
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, routers)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    },
  },
}

export default permission
