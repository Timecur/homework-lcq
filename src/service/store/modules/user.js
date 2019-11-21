import Cookies from 'js-cookie'

const user = {
  state: {
    name: null,
    roles: [],
    // 天润状态
    trcticlientStatus: 3,
  },

  mutations: {
    SET_ROLE: (state, role) => {
      Cookies.set('roles', role)
      state.roles = role
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_TELL_STATUS: (state, status) => {
      state.trcticlientStatus = status
    },
  },

  actions: {
    // 获取天润坐席状态
    async GetTrcticlientStatus({ commit }, { vm }) {
      const { data: { ent } } = await vm.$api['sale/trcticlientstatus/get']({})
      const { status } = ent
      commit('SET_TELL_STATUS', status)
    },
    // 设置天润坐席状态
    async SetTrcticlientStatus({ commit }, { vm, status }) {
      try {
        await vm.$api['sale/trcticlientstatus/set']({
          trcticlientop: status,
        })
      } catch (error) {
        commit('SET_TELL_STATUS', status)
      }
      commit('SET_TELL_STATUS', status)
    },
    GetUserInfo({ state, commit }) {
      return new Promise((resolve) => {
        const roles = Cookies.getJSON('roles')
        const name = Cookies.get('user')
        if (roles && roles.length) {
          commit('SET_ROLE', roles)
          commit('SET_NAME', name)
          resolve({
            roles: state.roles,
            user: state.name,
          })
        }
        commit('SET_NAME', name)
      })
    },
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit('SET_ROLE', [])
          Cookies.remove('token')
          resolve()
        } catch (error) {
          reject(reject)
        }
      })
    },
  },
}

export default user
