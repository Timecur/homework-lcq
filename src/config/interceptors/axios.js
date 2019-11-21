import { Message } from 'element-ui'
import { CONSOLE_ENABLE } from '../index'

export function requestSuccessFunc(requestObj) {
  // 自定义请求拦截器
  if (CONSOLE_ENABLE) console.warn('requestInterceptorFunc', `url: ${requestObj.url}`, requestObj)

  return requestObj
}

export function requestFailFunc(requestError) {
  // 自定义请求失败拦截器

  return Promise.reject(requestError)
}

export function responseSuccessFunc(responseObj) {
  if (CONSOLE_ENABLE) console.warn('responseInterceptorFunc', responseObj)
  // 相应拦截器在这里处理 状态码业务逻辑
  const { ret = -999 } = responseObj.data
  if (ret === -999) {
    return responseObj.data
  }
  if (ret !== 1) {
    const { msg = null } = responseObj.data
    if (msg) Message.error(msg)
    return Promise.reject(responseObj.data)
  }
  return responseObj.data
}

export function responseFailFunc(responseError) {
  // 响应失败拦截器
  const { response } = { ...responseError }
  const { data = '请求出错' } = response
  Message.error(data)
  return Promise.reject(responseError)
}
