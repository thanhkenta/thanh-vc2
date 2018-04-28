import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'Dashboard', icon: 'fas fa-chart-bar fa-fw', noCache: true }
    }]
  }
]

export default new Router({
  mode: 'history', // require service support, comment this line to use hashHistory
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// Moved asyncRouterMap to store, fetched from api

// export const asyncRouterMap = [
//   {
//     path: '',
//     component: Layout,
//     redirect: 'setting-voice/office/:number',
//     hidden: true,
//     children: [{
//       path: 'setting-voice/office/:number',
//       component: _import('office-number/settings'),
//       name: 'setting-voice',
//       meta: { title: 'Cài đặt cấu hình', noCache: true }
//     }]
//   },
//   {
//     path: '',
//     component: Layout,
//     redirect: 'setting-voice/service/:number',
//     hidden: true,
//     children: [{
//       path: 'setting-voice/service/:number',
//       component: _import('service-number/settings'),
//       name: 'service-voice',
//       meta: { title: 'Cài đặt cấu hình', noCache: true }
//     }]
//   },
//   {
//     path: '/manage-list-voice',
//     component: Layout,
//     redirect: 'manage-list-voice',
//     meta: { roles: ['admin'] }, // you can set roles in root nav
//     children: [{
//       path: 'index',
//       component: _import('manage-list-voice/index'),
//       name: 'manage-list-voice',
//       meta: {
//         title: 'Danh sách tổng đài',
//         icon: 'far fa-list-alt fa-fw',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   },
//
//   {
//     path: '/office-number',
//     component: Layout,
//     redirect: 'office-number',
//     meta: { roles: ['admin'] }, // you can set roles in root nav
//     children: [{
//       path: 'add',
//       component: _import('office-number/add'),
//       name: 'office-number',
//       meta: {
//         title: 'Tổng đài văn phòng',
//         icon: 'far fa-address-book fa-fw',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }],
//     button: {
//       title: 'Đăng ký',
//       redirect: '/office-number/add',
//       name: 'register-number'
//     },
//     listNumber: [
//       {
//         id: 1,
//         status: 'pending',
//         name: 'tong-dai-19001111',
//         redirect: '/setting-voice/office/19001111',
//         meta: { title: '19001111' }
//       },
//       {
//         id: 2,
//         status: 'pending',
//         name: 'tong-dai-123456789',
//         redirect: '/setting-voice/office/123456789',
//         meta: { title: '123456789' }
//       },
//       {
//         id: 3,
//         status: 'registered',
//         name: 'tong-dai-132123',
//         redirect: '/setting-voice/office/123456',
//         meta: { title: '123456' }
//       }
//     ]
//   },
//
//   {
//     path: '/service-number',
//     component: Layout,
//     redirect: 'service-number',
//     meta: { roles: ['admin'] }, // you can set roles in root nav
//     children: [{
//       path: 'add',
//       component: _import('service-number/add'),
//       name: 'service-number',
//       meta: {
//         title: 'Tổng đài CSKH',
//         icon: 'fas fa-users fa-fw',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }],
//     button: {
//       title: 'Đăng ký',
//       redirect: '/service-number/add',
//       name: 'service-number'
//     },
//     listNumber: [
//       {
//         id: 5,
//         status: 'pending',
//         name: 'tong-dai-19001800',
//         redirect: '/setting-voice/service/19001800',
//         meta: { title: '19001800' }
//       },
//       {
//         id: 6,
//         status: 'registered',
//         name: 'tong-dai-19001234',
//         redirect: '/setting-voice/service/19001234',
//         meta: { title: '19001234' }
//       },
//       {
//         id: 7,
//         status: 'registered',
//         name: 'tong-dai-19001877',
//         redirect: '/setting-voice/service/19001877',
//         meta: { title: '19001877' }
//       },
//       {
//         id: 8,
//         status: 'pending',
//         name: 'tong-dai-19001870',
//         redirect: '/setting-voice/service/19001870',
//         meta: { title: '19001870' }
//       },
//       {
//         id: 9,
//         status: 'pending',
//         name: 'tong-dai-19001888',
//         redirect: '/setting-voice/service/19001888',
//         meta: { title: '19001888' }
//       },
//       {
//         id: 10,
//         status: 'pending',
//         name: 'tong-dai-19001789',
//         redirect: '/setting-voice/service/19001789',
//         meta: { title: '19001789' }
//       }
//     ]
//   },
//
//   { path: '*', redirect: '/404', hidden: true }
// ]
