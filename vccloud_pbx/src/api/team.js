import request from '@/utils/request'

export function createOrUpdateTeam(data) {
  return request({
    url: '/team',
    method: 'post',
    data
  })
}
export function fetchTeam(params) {
  return request({
    url: '/team',
    method: 'get',
    params
  })
}

export function deleteTeam(params) {
  return request({
    url: '/team',
    method: 'delete',
    data: params
  })
}
