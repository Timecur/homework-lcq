import getters from './getters'

import user from './modules/user'
import app from './modules/app'
import permission from './modules/permission'

export default {
  modules: {
    permission,
    user,
    app,
  },
  getters,
}
