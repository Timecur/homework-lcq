import axios from 'axios'
import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'
import LogManager from '@ipalfish/palfish_front_log_manager'

import { LOG_PATH } from '@/config'

const types = []

const func = async (logs) => {
  try {
    await axios.get(`${LOG_PATH}/stat/wechat/wechatcourse/event/count`, { params: logs })
    return true
  } catch (error) {
    return false
  }
}

const preuid = Cookies.get('id')
let uid = 0
if (preuid) {
  uid = Base64.decode(preuid)
}
const defaultData = {
  uid,
}
const logger = new LogManager({ configs: types, defaultData, commitFunc: func })

export default logger
