import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/service-auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: `/service-auth/info/${token}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/service-auth/logout',
    method: 'post'
  })
}
