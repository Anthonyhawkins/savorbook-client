import { createStore } from "vuex"
import JwtService from "@/services/jwtService.js"
import { AuthService } from "@/services/apiService.js"
import recipe from "./recipe.module"
import cookbook from "./cookbook.module"

export default createStore({
  modules: {
    recipe,
    cookbook
  },
  state: {
    user: null,
    error: null
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error
    },

    SET_USER_DATA(state, token) {
      JwtService.saveToken(token)
      const user = JwtService.parseToken(token)
      state.user = user
    },

    CLEAR_USER_DATA(state) {
      state.user = {}
      JwtService.destroyToken()
      // force a refresh to clear state
      location.reload()
    },
    UPDATE_USER_FIELD(state, { field, value }) {
      state.user[field] = value
    }
  },
  actions: {
    setError({ commit }, error) {
      commit("SET_ERROR", error)
    },
    register({ commit }, { username, displayName, email, password }) {
      return AuthService.createUser({
        username,
        displayName,
        email,
        password
      }).then(({ data }) => {
        if (data.success) {
          commit("SET_USER_DATA", data.data.accessToken)
          return data
        } else {
          //return errors back to component
          return data
        }
      })
    },
    login({ commit }, { email, password }) {
      return AuthService.login({ email, password }).then(({ data }) => {
        if (data.success) {
          commit("SET_USER_DATA", data.data.accessToken)
        } else {
          //return errors back to component
          return data
        }
      })
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA")
    },
    setUser({ commit }, token) {
      commit("SET_USER_DATA", token)
    },
    updateUserField({ commit }, { field, value }) {
      commit("UPDATE_USER_FIELD", { field, value })
    }
  },
  getters: {
    errorMessage(state) {
      return state.error
    },
    loggedIn(state) {
      return !!state.user
    },
    user(state) {
      return state.user
    }
  }
})
