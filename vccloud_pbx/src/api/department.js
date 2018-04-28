import request from '@/utils/request'

export function fetchDepartment(params) {
  return request({
    url: '/department',
    method: 'get',
    params
  })
}

export function createOrEditDepartment(data) {
  return request({
    url: '/department',
    method: 'post',
    data
  })
}

export function deleteDepartment(params) {
  return request({
    url: 'department',
    method: 'delete',
    data: params
  })
}

