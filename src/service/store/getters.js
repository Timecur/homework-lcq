const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  permissionRouters: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles,
  name: state => state.user.name,
  trcticlientStatus: state => state.user.trcticlientStatus,
}

export default getters
