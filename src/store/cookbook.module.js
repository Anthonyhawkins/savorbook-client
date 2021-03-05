import { CookbookService } from "@/services/apiService.js"
//import router from "@/router"

const getDefaultState = () => {
  return {
    cookbook: {
      title: "",
      subTitle: "",
      blurb: "",
      sections: []
    }
  }
}

export const state = { ...getDefaultState() }

export const actions = {
  setCookbookDetails({ commit }, payload) {
    commit("SET_COOKBOOK_DETAILS", payload)
  },
  setCookbookImage({ commit }, payload) {
    commit("SET_COOKBOOK_IMAGE", payload)
  },
  addCookbookSection({ commit }) {
    commit("ADD_COOKBOOK_SECTION")
  },
  updateCookbookSections({ commit }, payload) {
    commit("UPDATE_COOKBOOK_SECTIONS", payload)
  },
  updateCookbookSection({ commit }, payload) {
    commit("UPDATE_COOKBOOK_SECTION", payload)
  },
  deleteCookbookSection({ commit }, payload) {
    commit("DELETE_COOKBOOK_SECTION", payload)
  }
}

/**
 * TODO - change payload params to { parm1, param2 } convention
 */
export const mutations = {
  RESET_COOKBOOK(state) {
    Object.assign(state, getDefaultState())
  },
  SET_COOKBOOK_DETAILS(state, payload) {
    state.cookbook.title = payload.title
    state.cookbook.subTitle = payload.subTitle
    state.cookbook.blurb = payload.blurb
    CookbookService.createOrUpdateCookbook(state.cookbook)
  },
  SET_COOKBOOK_IMAGE(state, image) {
    state.cookbook.image = image
    CookbookService.createOrUpdateCookbook(state.cookbook)
  },
  ADD_COOKBOOK_SECTION(state) {
    let id = state.cookbook.sections.length + 1
    const section = {
      id: id,
      name: "",
      overview: "",
      recipes: []
    }
    state.cookbook.sections.push(section)
  },
  UPDATE_COOKBOOK_SECTIONS(state, sections) {
    state.cookbook.sections = sections
    CookbookService.createOrUpdateCookbook(state.cookbook)
  },
  UPDATE_COOKBOOK_SECTION(state, payload) {
    const index = payload.index
    const section = payload.section
    state.cookbook.sections[index] = section
    CookbookService.createOrUpdateCookbook(state.cookbook)
  },
  DELETE_COOKBOOK_SECTION(state, index) {
    state.cookbook.sections.splice(index, 1)
    CookbookService.createOrUpdateCookbook(state.cookbook)
  }
}

const getters = {
  cookbook(state) {
    return state.cookbook
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}