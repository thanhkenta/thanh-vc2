import request from '@/utils/request'

export function bindOrUpdateForward(data) {
  return request({
    url: '/foward',
    method: 'post',
    data
  })
}

export function fetchForward(params) {
  return request({
    url: '/foward',
    method: 'get',
    params
  })
}

export function deleteForward(params) {
  return request({
    url: `/foward?id=${params.id}`,
    method: 'delete'
  })
}
