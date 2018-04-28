import request from '@/utils/request'

export function createOrUpdateTimeSetting(data) {
  return request({
    url: '/time',
    method: 'post',
    data
  })
}

export function fetchTimeSettings(params) {
  return request({
    url: '/time',
    method: 'get',
    params
  })
}

export function deleteTimeSetting(params) {
  return request({
    url: `/time?id=${params.id}`,
    method: 'delete'
  })
}
