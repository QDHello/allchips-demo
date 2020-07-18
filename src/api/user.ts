import request from '@/utils/request'

const getUserInfo = (data: {}) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })


const login = (data: { username: string; password: string }) =>
  request({
    url: '/users/login',
    method: 'post',
    data
  })

const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export {
  getUserInfo,
  login,
  logout
}