import { createStore } from "vuex";
import JwtService from "@/services/jwtService.js"
import { AuthService } from "@/services/apiService.js"
import recipe from "./recipe.module";

export default createStore({
  modules: {
    recipe
  },
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, token) {
      JwtService.saveToken(token)
      const user = JwtService.parseToken(token)
      state.user = user
    },

    CLEAR_USER_DATA (state) {
      state.user = {}
      JwtService.destroyToken()
      // force a refresh to clear state
      location.reload()
    }
  },
  actions: {
    register({ commit }, credentials){
      return AuthService.createUser(credentials).then(
        ({ data }) => {
          commit('SET_USER_DATA', data.accessToken)
        }
      )
    },
    login({ commit }, credentials){
      return AuthService.login(credentials).then(
        ({ data }) => {
          commit('SET_USER_DATA', data.accessToken)
        }
      )
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    loggedIn (state) {
      console.log(state)
      return !!state.user
    },
    user (state) {
      return state.user
    }
  }
});
