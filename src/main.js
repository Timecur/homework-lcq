/* eslint-disable */
import Vue from 'vue'
import App from './App'

// 重置css
import 'normalize.css/normalize.css'
// 载入css
import '@/styles/index.scss'
// 载入icon
import '@/icons'

// 插件引入
import inject from '@/plugins/inject'
import router from '@/plugins/router'
import store from '@/plugins/store'
import '@/plugins/mock'

// 组件库引入
import './plugins/element'

/* eslint-enable */

// 插件注入
Vue.use(inject)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
