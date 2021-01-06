import { RecipeService } from "@/services/apiService.js"

const initialState = {
  recipe: {
    name: "",
    description: "",
    
    ingredientGroups: [
      {
        groupName: '',
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
        content: { text: "" }
      }
    ]
  }
}

export const state = { ...initialState };

export const actions = {
  getRecipe({ commit }, id){
    RecipeService.getRecipe(id).then(
      ({ data }) => {
        commit('SET_RECIPE', data)
      }
    )
  },

  resetRecipe({ commit }){
    commit('RESET_RECIPE')
  },
  setStep({ commit }, payload){
    commit('SET_STEP', payload)
  },
  addStep({ commit }, payload){
    commit('ADD_STEP', payload)
  },
  moveStep({ commit}, payload){
    commit('MOVE_STEP', payload)
  },
  removeStep({ commit }, payload){
    commit('REMOVE_STEP', payload)
  },
  setIngredientGroup({ commit }, payload){
    commit('SET_INGREDIENT_GROUP', payload)
  },
  addIngredientGroup({ commit }){
    commit('ADD_INGREDIENT_GROUP')
  }
}

/**
 * TODO - change payload params to { parm1, param2 } convention
 */
export const mutations= {
  RESET_RECIPE(state){
    state.recipe = initialState
  },
  SET_RECIPE(state, payload){
    state.recipe = payload
  },

  SET_STEP(state, payload){
    state.recipe.steps[payload.index] = payload.step
  },
  ADD_STEP(state, stepType){
    let newStep = null
  
    let stepId = state.recipe.steps.length + 1
    switch(stepType) {
      case "text":
        newStep = { id: stepId, type: "text", content: { text: "" }}
        break;
      case "tipText":
        newStep = { id: stepId, type: "tipText", content: { text: "" }}
        break;
    }
    state.recipe.steps.push(newStep)    
  },
  REMOVE_STEP(state, index){
    state.recipe.steps.splice(index, 1)
  },
  MOVE_STEP (state, payload) {
    const fromStepIndex = payload.fromStepIndex
    const toStepIndex = payload.toStepIndex
    const stepToMove = state.recipe.steps.splice(fromStepIndex, 1)[0]
    state.recipe.steps.splice(toStepIndex, 0, stepToMove)
  },
  SET_INGREDIENT_GROUP(state, payload){
    const group = {
      groupName: payload.groupName, 
      ingredients: payload.ingredients
    }
    state.recipe.ingredientGroups[payload.index] = group
  },
  ADD_INGREDIENT_GROUP(state){
    const newGroup = {
      groupName: '',
      ingredients: [
        { name: "", qty: "", unit: "" },
        { name: "", qty: "", unit: "" },
        { name: "", qty: "", unit: "" }
      ]
    }
    state.recipe.ingredientGroups.push(newGroup)
  },  
}

const getters = {
  recipe(state) {
    return state.recipe;
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};