import Mock from 'mockjs'
import loginAPI from './modules/login'

Mock.mock(/\/login\/login/, 'post', loginAPI.login)

export default Mock
