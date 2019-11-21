import _pick from 'lodash/pick'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'

import { assert } from '@/utils/tools'
import { NODE_ENV, API_DEFAULT_CONFIG } from '@/config'
import API_CONFIG_LIST from '@/service/api'

import axios from './axios'

function _normoalize(options, data) {
  if (options.method.toLowerCase() === 'post') {
    options.data = data
  } else if (options.method.toLowerCase() === 'postpparams') {
    options.method = 'post'
    options.params = data
  } else if (options.method.toLowerCase() === 'get') {
    options.params = data
  }
  return options
}

class MakeApi {
  constructor(options) {
    this.api = {}
    this.apiBuilder(options)
  }

  apiBuilder({
    sep = '|',
    config = {},
    mock = false,
    debug = false,
    axiosBasePath = '',
    mockBasePath = '',
  }) {
    Object.keys(config).map(namespace => this._apiSingleBuilder({
      namespace,
      mock,
      axiosBasePath,
      mockBasePath,
      sep,
      debug,
      config: config[namespace],
    }))
  }

  _apiSingleBuilder({
    namespace,
    sep = '|',
    config = {},
    mock = false,
    debug = false,
    axiosBasePath = '',
    mockBasePath = '',
  }) {
    config.forEach((api) => {
      const {
        name, desc, params = null, formatter = null, method,
        options = {}, mockEnable = false, path, mockPath,
      } = api
      const isMock = NODE_ENV === 'production' ? false : ((mock === 'true') || mockEnable)
      const isMockSet = (isMock === true)
      const url = isMockSet ? `${mockBasePath}${mockPath}` : `${axiosBasePath}${path}`

      if (!isMockSet && debug) assert(name, `${url} :接口name属性不能为空`)
      if (!isMockSet && debug) assert(url.indexOf('/') === 0, `${url} :接口路径path，首字符应为/`)

      Object.defineProperty(this.api, `${namespace}${sep}${name}`, {
        value(outerParams, outerOptions) {
          let _data = null
          if (!params) {
            _data = outerParams
          } else {
            _data = _isEmpty(outerParams) ? params
              : _pick(_assign({}, params, outerParams), Object.keys(params))
            _data = formatter ? new Proxy(_data, formatter) : _data
          }
          const _options = {
            url, desc, method, ...options,
          }
          return axios(_normoalize(_assign(_options, outerOptions), _data))
        },
      })
    })
  }
}

export default new MakeApi({
  config: API_CONFIG_LIST,
  ...API_DEFAULT_CONFIG,
}).api
