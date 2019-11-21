import Model from 'js-model'

export const verifyCode = new Model({
  utype: '',
  user: '',
})

export const loginData = new Model({
  utype: '',
  user: '',
  ttype: '',
  ticket: '',
  mtype: '',
})

export const loginCheckData = new Model({
  mtype: 'salessystem',
  utype: 'op',
  ident: '',
})
