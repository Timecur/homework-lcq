export function assert(condition, msg) {
  if (!condition) throw new Error(`[CRM Error] ${msg}`)
}

export function toDownload(data) {
  const blob = new Blob([data])
  const href = window.URL.createObjectURL(blob)
  return href
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param userRoles
 */
export function hasPermission(roles, userRoles) {
  if (userRoles) {
    return roles.some(role => userRoles.includes(role))
  }
  return false
}

/**
 * 把一个数组对象中的key的value作为新对象的key
 * 输入出新对象
 *
 * @export
 * @param {*} [array=[]]
 * @param {*} key
 * @returns
 */
export function toObj(array = [], key) {
  const result = {}
  if (!array || array.length === 0) return result
  const tmp = array[0]
  if (!key || (tmp[key] === undefined)) {
    return Error('key is notfound')
  }
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    result[item[key]] = item
  }
  return result
}

/**
 *
 *
 * @export
 * @param {*} objectA 被合并的对象
 * @param {*} objectB 待合并的对象
 * @param {*} keys 对象key列表
 * @returns
 */
export function objMergeKey(objectA, objectB, keys) {
  if (!keys || !keys.length) return objectA
  const result = objectA
  keys.forEach((key) => {
    if (result[key] !== undefined) {
      result[key] = objectB[key]
    }
  })
  return result
}

/**
 * 将后者的sources 合并到target target没有的key不会合并
 *
 * @export
 * @param {*} target
 * @param {*} sources
 * @returns
 */
export function objUpdate(target, ...sources) {
  if (target === null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }

  const to = Object(target)
  Object.keys(to).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(to, key)) {
      for (let i = sources.length - 1; i >= 0; i--) {
        if (sources[i] !== null && Object.prototype.hasOwnProperty.call(sources[i], key)) {
          to[key] = sources[i][key]
          break
        }
      }
    }
  })

  return to
}

/**
 * 获取月份
 *
 * @export
 * @param {*} date
 * @returns
 */
export function mGetDate(date) {
  const copiedDate = new Date(date.getTime())
  const result = new Date(copiedDate.getFullYear(), copiedDate.getMonth() + 1, 0)
  return result.getDate()
}

/**
 * 获取Date的当月月份
 *
 * @export
 * @param {*} date
 * @returns
 */
export function getDays(date) {
  if (date instanceof Date) {
    const tmp = date
    tmp.setMonth(tmp.getMonth() + 1)
    tmp.setDate(0)
    const days = tmp.getDate()
    return days
  }
  return null
}
