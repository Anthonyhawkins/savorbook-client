import { createStore } from "vuex";
import axios from 'axios'

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
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.accessToken
      }`
      console.log("SET THE SESSION")
    },
    CLEAR_USER_DATA () {
      localStorage.removeItem('user')
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
    }
  }
});
