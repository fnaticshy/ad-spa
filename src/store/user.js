import * as fb from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null,
    savedUserId: localStorage.getItem('user')
  },
  mutations: {
    // setters
    setUser (state, payload) {
      state.user = payload
    },
    removeSavedUserId (state) {
      state.savedUserId = null
    }
  },
  actions: {
    // requests to server
    async registerUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        localStorage.setItem('user', user.user.uid)
        commit('setUser', new User(user.user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        localStorage.setItem('user', user.user.uid)
        commit('setUser', new User(user.user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser ({ commit }, payload) {
      // передаем этот экшен в метод FB
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({ commit }) {
      localStorage.removeItem('user')
      fb.auth().signOut()
      commit('setUser', null)
      commit('removeSavedUserId')
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    savedUserId (state) {
      return state.savedUserId
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
