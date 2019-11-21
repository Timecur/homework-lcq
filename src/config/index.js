// 当前环境
export const NODE_ENV = process.env.NODE_ENV


// 是否所有请求访问本地mock
export const AJAX_MOCK = process.env.VUE_APP_MOCK

// 路由基础path
export const ROUTER_BASE_PATH = process.env.VUE_APP_BASE_PATH
// 路由默认配置
export const ROUTER_DEFAULT_CONFIG = {
  mode: 'history',
  base: ROUTER_BASE_PATH,
}

// 请求基础path
export const AXIOS_BASE_PATH = process.env.VUE_APP_AXIOS_BASE_PATH || ''
// mock path
export const MOCK_BASE_PATH = process.env.VUE_APP_MOCK_BASE_PATH || ''
// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  withCredentials: true,
  timeout: 300000,
}

// API 默认配置
export const API_DEFAULT_CONFIG = {
  axiosBasePath: AXIOS_BASE_PATH,
  mockBasePath: MOCK_BASE_PATH,
  mockBaseURL: '',
  mock: AJAX_MOCK,
  debug: true,
  sep: '/',
}

// 请求日志设置
export const CONSOLE_ENABLE = process.env.VUE_APP_CONSOLE === 'true' ? true : false

// vuex 默认配置
export const VUEX_DEFAULT_CONFIG = {
  // strict: process.env.NODE_ENV !== 'production',
}

// 权限关键字

// 请求日志设置
export const LOG_PATH = process.env.VUE_APP_LOG_PATH

// 路由权限
export const AUTH_ROUTER = 'all'
