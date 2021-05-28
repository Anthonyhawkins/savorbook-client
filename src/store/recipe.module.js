import { RecipeService } from "@/services/apiService.js"
import router from "@/router"

const getDefaultState = () => {
  return {
    recipe: {
      name: "",
      image: "",
      description: "",
      prepTime: "",
      servings: "",
      tags: [],
      dependentRecipes: [],
      ingredientGroups: [
        {
          groupName: "",
          ingredients: [
            { name: "", qty: "", unit: "" },
            { name: "", qty: "", unit: "" },
            { name: "", qty: "", unit: "" }
          ]
        }
      ],
      steps: [
        {
          id: 1,
          type: "text",
          text: "",
          images: [
            {
              src: "",
              original: "",
              text: ""
            },
            {
              src: "",
              original: "",
              text: ""
            },
            {
              src: "",
              original: "",
              text: ""
            }
          ]
        }
      ]
    }
  }
}

export const state = { ...getDefaultState() }

export const actions = {
  getRecipe({ commit }, id) {
    RecipeService.getRecipe(id)
      .then(({ data }) => {
        commit("SET_RECIPE", data.data)
      })
      .catch(error => {
        if (!error.success) {
          router.push({ name: "RecipeList" })
        }
      })
  },
  setRecipeImage({ commit }, imageSrc) {
    commit("SET_RECIPE_IMAGE", imageSrc)
  },
  resetRecipe({ commit }) {
    commit("RESET_RECIPE")
  },
  setStep({ commit }, payload) {
    commit("SET_STEP", payload)
  },
  addStep({ commit }, payload) {
    commit("ADD_STEP", payload)
  },
  moveStep({ commit }, payload) {
    commit("MOVE_STEP", payload)
  },
  removeStep({ commit }, payload) {
    commit("REMOVE_STEP", payload)
  },
  setIngredientGroup({ commit }, payload) {
    commit("SET_INGREDIENT_GROUP", payload)
  },
  addIngredientGroup({ commit }) {
    commit("ADD_INGREDIENT_GROUP")
  },
  addDependentRecipe({ commit }, payload) {
    commit("ADD_DEPENDENT_RECIPE", payload)
  },
  removeDependentRecipe({ commit }, payload) {
    commit("REMOVE_DEPENDENT_RECIPE", payload)
  },
  setRecipeTags({ commit }, payload) {
    commit("SET_RECIPE_TAGS", payload)
  }
}

/**
 * TODO - change payload params to { parm1, param2 } convention
 */
export const mutations = {
  RESET_RECIPE(state) {
    Object.assign(state, getDefaultState())
  },
  SET_RECIPE_IMAGE(state, imageSrc) {
    state.recipe.image = imageSrc
  },
  SET_RECIPE(state, payload) {
    state.recipe = payload
  },
  SET_STEP(state, payload) {
    state.recipe.steps[payload.index] = payload.step
  },
  ADD_STEP(state, stepType) {
    let newStep = null
    let stepId = state.recipe.steps.length + 1

    newStep = {
      id: stepId,
      type: stepType,
      text: "",
      images: [
        {
          src: "",
          original: "",
          text: ""
        },
        {
          src: "",
          original: "",
          text: ""
        },
        {
          src: "",
          original: "",
          text: ""
        }
      ]
    }

    state.recipe.steps.push(newStep)
  },
  REMOVE_STEP(state, index) {
    state.recipe.steps.splice(index, 1)
  },
  MOVE_STEP(state, payload) {
    const fromStepIndex = payload.fromStepIndex
    const toStepIndex = payload.toStepIndex
    const stepToMove = state.recipe.steps.splice(fromStepIndex, 1)[0]
    state.recipe.steps.splice(toStepIndex, 0, stepToMove)
  },
  SET_INGREDIENT_GROUP(state, payload) {
    const group = {
      groupName: payload.groupName,
      ingredients: payload.ingredients
    }
    state.recipe.ingredientGroups[payload.index] = group
  },
  ADD_INGREDIENT_GROUP(state) {
    const newGroup = {
      groupName: "",
      ingredients: [
        { name: "", qty: "", unit: "" },
        { name: "", qty: "", unit: "" },
        { name: "", qty: "", unit: "" }
      ]
    }
    state.recipe.ingredientGroups.push(newGroup)
  },
  ADD_DEPENDENT_RECIPE(state, recipe) {
    state.recipe.dependentRecipes.push(recipe)
  },
  REMOVE_DEPENDENT_RECIPE(state, recipe) {
    const index = state.recipe.dependentRecipes.indexOf(recipe)
    state.recipe.dependentRecipes.splice(index, 1)
  },
  SET_RECIPE_TAGS(state, tags) {
    state.recipe.tags = tags
  }
}

const getters = {
  recipe(state) {
    return state.recipe
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
