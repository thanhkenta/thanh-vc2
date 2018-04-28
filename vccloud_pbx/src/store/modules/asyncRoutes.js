import { fetchHotlines } from '@/api/hotlines'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
import Layout from '@/views/layout/Layout'
import { handleMenuRoutes } from '@/utils/menu'

const asyncRoutes = {
  state: {
    routes: [
      {
        path: '',
        component: Layout,
        redirect: '',
        hidden: true,
        children: [{
          path: 'tong-dai-van-phong/cau-hinh/:id/:number',
          component: _import('office-number/settings'),
          name: 'cau-hinh',
          meta: { title: 'Cài đặt cấu hình', noCache: true }
        }]
      },
      {
        path: '',
        component: Layout,
        redirect: '',
        hidden: true,
        children: [{
          path: 'tong-dai-cskh/cau-hinh/:id/:number',
          component: _import('service-number/settings'),
          name: 'service-voice',
          meta: { title: 'Cài đặt cấu hình', noCache: true }
        }]
      },
      {
        path: '',
        component: Layout,
        redirect: '',
        hidden: true,
        children: [{
          path: 'report/:id/:hotline',
          component: _import('report/index'),
          name: 'report-hotline',
          meta: { title: 'Thông tin tổng đài', noCache: true }
        }]
      },
      {
        path: '/danh-sach-tong-dai',
        component: Layout,
        redirect: 'danh-sach-tong-dai',
        meta: { roles: ['admin'] }, // you can set roles in root nav
        children: [{
          path: 'index',
          component: _import('manage-list-voice/index'),
          name: 'manage-list-voice',
          meta: {
            title: 'Danh sách tổng đài',
            icon: 'far fa-list-alt fa-fw',
            roles: ['admin'] // or you can only set roles in sub nav
          }
        }]
      },
      {
        path: '/quan-ly-user',
        component: Layout,
        redirect: 'quan-ly-user',
        meta: { roles: ['admin'] }, // you can set roles in root nav
        children: [{
          path: 'index',
          component: _import('manage-user/index'),
          name: 'manage-user',
          meta: {
            title: 'Quản lý user',
            icon: 'fas fa-users fa-fw',
            roles: ['admin'] // or you can only set roles in sub nav
          }
        }]
      }
    ]
  },

  mutations: {
    SET_ASYNC_ROUTES: (state, handledAsyncRoutes) => {
      state.routes.push(
        {
          path: '/tong-dai-van-phong',
          component: Layout,
          redirect: '/',
          meta: { roles: ['admin'] }, // you can set roles in root nav
          children: [{
            path: 'them-moi',
            component: _import('office-number/add'),
            name: 'office-number',
            meta: {
              title: 'Tổng đài văn phòng',
              icon: 'far fa-address-book fa-fw',
              roles: ['admin'] // or you can only set roles in sub nav
            }
          }],
          button: {
            title: 'Đăng ký',
            redirect: '/tong-dai-van-phong/them-moi',
            name: 'register-number'
          },
          listNumber: handledAsyncRoutes.officeNumbersRoutes
        },
        {
          path: '/tong-dai-cskh',
          component: Layout,
          redirect: '/',
          meta: { roles: ['admin'] }, // you can set roles in root nav
          children: [{
            path: 'them-moi',
            component: _import('service-number/add'),
            name: 'service-number',
            meta: {
              title: 'Tổng đài CSKH',
              icon: 'fas fa-users fa-fw',
              roles: ['admin'] // or you can only set roles in sub nav
            }
          }],
          button: {
            title: 'Đăng ký',
            redirect: '/tong-dai-cskh/them-moi',
            name: 'service-number'
          },
          listNumber: handledAsyncRoutes.serviceNumbersRoutes
        },

        { path: '*', redirect: '/404', hidden: true }
      )
    }
  },

  actions: {
    GetHotlines({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        fetchHotlines().then(response => {
          const handledAsyncRoutes = handleMenuRoutes(response.data.data)
          commit('SET_ASYNC_ROUTES', handledAsyncRoutes)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default asyncRoutes
