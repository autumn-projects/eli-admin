import request from '@/utils/request'

export function getAccountList() {
  return request({
    url: '/account/list',
    method: 'get'
  })
}

export function updateAccount(data) {
  return request({
    url: '/account/update',
    method: 'post',
    data
  })
}
