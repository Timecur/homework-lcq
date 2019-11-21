import axios from 'axios'
import { AXIOS_DEFAULT_CONFIG } from '@/config'
import {
  requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc,
} from '@/config/interceptors'

axios.defaults.withCredentials = true
const service = axios.create(AXIOS_DEFAULT_CONFIG)

// 请求拦截器
service.interceptors.request.use(requestSuccessFunc, requestFailFunc)

// 返回拦截器
service.interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default service
