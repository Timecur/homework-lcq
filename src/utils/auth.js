import Cookies from 'js-cookie'

const TokenKey = 'token'
const NameKey = 'user'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get(NameKey)
}

export function setName(name) {
  return Cookies.set(NameKey, name)
}

export function removeName() {
  return Cookies.remove(NameKey)
}

const list = []
export function filterRouterList(children) {
  if (children.length) {
    children.forEach((child) => {
      const { name } = child.target
      list.push(name)
      if (child.children.length) {
        filterRouterList(child.children)
      }
    })
  }

  return list
}
