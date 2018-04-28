// import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const userMock = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: 'Lorem isump',
    avatar: 'https://image.flaticon.com/icons/svg/702/702023.svg',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: 'Lorem isump amet',
    avatar: 'https://image.flaticon.com/icons/svg/702/702023.svg',
    name: 'Normal Editor'
  }
}

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: 'https://image.flaticon.com/icons/svg/702/702023.svg',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    LoginByUsername({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      // return new Promise((resolve, reject) => {
      //   loginByUsername(username, userInfo.password).then(response => {
      //     const data = response.data
      //     commit('SET_TOKEN', data.token)
      //     setToken(response.data.token)
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })

      commit('SET_TOKEN', userMock.admin.token)
      setToken(userMock.admin.token)
    },

    // Get user information
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) {
            reject('error')
          }
          // const data = response.data
          commit('SET_ROLES', ['admin'])
          commit('SET_NAME', 'ádasd')
          commit('SET_AVATAR', 'https://image.flaticon.com/icons/svg/702/702023.svg')
          commit('SET_INTRODUCTION', 'Lorem isump')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // Third-party verification login
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // Sign out
    LogOut({ commit, state }) {
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
    },
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
