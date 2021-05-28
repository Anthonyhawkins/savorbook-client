import { CookbookService } from "@/services/apiService.js"
import router from "@/router"

const getDefaultState = () => {
  return {
    cookbook: {
      loaded: false,
      title: "",
      image: "",
      subTitle: "",
      blurb: "",
      sections: []
    }
  }
}

export const state = { ...getDefaultState() }

export const actions = {
  resetCookbook({ commit }) {
    commit("RESET_COOKBOOK")
  },
  getCookbook({ commit }, id) {
    CookbookService.getCookbook(id)
      .then(({ data }) => {
        commit("SET_COOKBOOK", data.data)
      })
      .catch(error => {
        if (!error.success) {
          router.push({ name: "CookbookList" })
        }
      })
  },
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
  },
  deleteSectionRecipe({ commit }, payload) {
    commit("DELETE_SECTION_RECIPE", payload)
  },
  setSectionRecipes({ commit }, payload) {
    commit("SET_SECTION_RECIPES", payload)
  }
}

/**
 * TODO - change payload params to { parm1, param2 } convention
 */
export const mutations = {
  RESET_COOKBOOK(state) {
    Object.assign(state, getDefaultState())
  },
  SET_COOKBOOK(state, payload) {
    state.cookbook = payload
    state.cookbook.loaded = true
  },
  SET_COOKBOOK_DETAILS(state, payload) {
    state.cookbook.title = payload.title
    state.cookbook.subTitle = payload.subTitle
    state.cookbook.blurb = payload.blurb
    CookbookService.UpdateCookbook(state.cookbook)
  },
  SET_COOKBOOK_IMAGE(state, image) {
    state.cookbook.image = image
    CookbookService.UpdateCookbook(state.cookbook)
  },
  ADD_COOKBOOK_SECTION(state) {
    let id = state.cookbook.sections.length + 1
    const section = {
      id: id,
      new: true,
      name: "",
      overview: "",
      recipes: []
    }
    state.cookbook.sections.push(section)
  },
  UPDATE_COOKBOOK_SECTIONS(state, sections) {
    state.cookbook.sections = sections
    CookbookService.UpdateCookbook(state.cookbook)
  },
  UPDATE_COOKBOOK_SECTION(state, payload) {
    const index = payload.index
    const section = payload.section
    state.cookbook.sections[index] = section
    CookbookService.UpdateCookbook(state.cookbook)
  },
  DELETE_COOKBOOK_SECTION(state, index) {
    state.cookbook.sections.splice(index, 1)
    CookbookService.UpdateCookbook(state.cookbook)
  },
  DELETE_SECTION_RECIPE(state, payload) {
    const sectionIndex = payload.sectionIndex
    const recipeIndex = payload.recipeIndex
    state.cookbook.sections[sectionIndex].recipes.splice(recipeIndex, 1)
    CookbookService.UpdateCookbook(state.cookbook)
  },
  SET_SECTION_RECIPES(state, payload) {
    const index = payload.index
    const recipes = payload.recipes
    state.cookbook.sections[index].recipes = recipes
  }
}

const getters = {
  cookbook(state) {
    return state.cookbook
  },
  sections(state) {
    return state.cookbook.sections
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}