import request from '@/utils/request'

export function getAccountList() {
  return request({
    url: '/service-chs/account/list',
    method: 'get'
  })
}

export function updateAccount(data) {
  return request({
    url: '/service-chs/account/update',
    method: 'post',
    data
  })
}
