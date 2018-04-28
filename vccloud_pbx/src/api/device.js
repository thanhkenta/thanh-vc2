import request from '@/utils/request'

export function fetchDevice(params) {
  return request({
    url: '/device',
    method: 'get',
    params
  })
}
