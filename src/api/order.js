import request from '@/utils/request'

export function getOrderList(query) {
  return request({
    url: '/order/list',
    method: 'get',
    params: query
  })
}

export function getOrderReport(query) {
  return request({
    url: '/order/report',
    method: 'get',
    params: query
  })
}
