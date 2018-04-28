import request from '@/utils/request'

export function fetchExtByHotline(params) {
  return request({
    url: '/ext',
    method: 'get',
    params
  })
}

export function createOrUpdateExt(data) {
  return request({
    url: '/ext',
    method: 'post',
    data
  })
}

export function deleteExt(params) {
  return request({
    url: '/ext',
    method: 'delete',
    data: params
  })
}

