import { createStore } from "vuex";
import axios from 'axios'
import JwtService from "@/services/jwtService.js"

import recipe from "./recipe.module";

export default createStore({
  modules: {
    recipe
  },
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      JwtService.saveToken(userData.accessToken)
      const user = JwtService.parseToken(userData.accessToken)
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
      return axios.post('//localhost:3000/users', credentials).then(
        ({ data }) => {
          commit('SET_USER_DATA', data)
        }
      )
    },
    login({ commit }, credentials){
      return axios.post('//localhost:3000/login', credentials).then(
        ({ data }) => {
          commit('SET_USER_DATA', data)
        }
      )
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    },
    user (state) {
      return state.user
    }
  }
});
