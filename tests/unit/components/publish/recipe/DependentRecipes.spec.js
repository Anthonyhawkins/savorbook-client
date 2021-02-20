import DependentRecipes from "@/components/publish/recipe/DependentRecipes.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"
import router from "@/router"
import axios from "axios"

describe("DependentRecipes.vue", () => {
  const store = createStore({
    getters: {
      recipe: jest.fn(() => {
        return {
          name: "Roasted Vegetables",
          image: "",
          description: "",
          prepTime: "",
          servings: "",
          tags: [],
          dependentRecipes: [
            { id: 3, dependentRecipe: 2, qty: 4, name: "Roasted Chicken" },
            { id: 2, dependentRecipe: 1, qty: 2, name: "Tomato Sauce" },
            { id: 1, dependentRecipe: 3, qty: 1, name: "Meat Sauce" }
          ],
          ingredientGroups: [],
          steps: []
        }
      })
    }
  })
  store.dispatch = jest.fn()

  beforeEach(async () => {
    router.push("/")
    await router.isReady()
  })

  it("Displays a List of Dependent Recipes.", async () => {
    const wrapper = mount(DependentRecipes, {
      global: {
        plugins: [store, router]
      }
    })
    const dependentRecipes = wrapper.findAll('[data-testid="dependent-recipe"]')
    expect(dependentRecipes.length).toEqual(3)
  })

  it("Removes a Dependent Recipe when user clicks the X icon.", async () => {
    const wrapper = mount(DependentRecipes, {
      global: {
        plugins: [store, router]
      }
    })
    const dependentRecipes = wrapper.findAll('[data-testid="dependent-recipe"]')
    dependentRecipes[0].find('[data-testid="remove-button"]').trigger("click")
    expect(store.dispatch).toHaveBeenCalledWith("removeDependentRecipe", {
      id: 3,
      dependentRecipe: 2,
      qty: 4,
      name: "Roasted Chicken"
    })
  })
  it("Displays a list of suggestions when user types at least 3 characters.", async () => {
    const response = {
      data: {
        success: true,
        data: [
          { id: 6, name: "Roasted Vegetables" },
          { id: 7, name: "Tomato Sauce" },
          { id: 8, name: "Meat Sauce" }
        ],
        message: ""
      }
    }
    jest.mock("axios")
    axios.get = jest.fn(() => Promise.resolve(response))
    //axios.get.mockResolvedValue(response)
    const wrapper = mount(DependentRecipes, {
      global: {
        plugins: [store, router]
      }
    })
    wrapper.find('input[name="recipe-name"]').setValue("Roasted")
    wrapper.find('input[name="recipe-name"]').trigger("keyup")
    await wrapper.vm.$nextTick() //set suggestions
    await wrapper.vm.$nextTick() //compute property
    const suggestions = wrapper.findAll('[data-testid="suggestion"]')
    expect(suggestions.length).toEqual(3)
  })
  it("Adds a Recipe and Qty as a Dependencywhen user clicks the plus icon.", async () => {
    const mockRoute = {
      params: {
        id: 1
      }
    }
    const wrapper = mount(DependentRecipes, {
      global: {
        mocks: { $route: mockRoute },
        plugins: [store, router]
      }
    })
    wrapper.setData({
      recipeName: "Roasted Vegetables",
      recipeQty: "3",
      recipeId: 2,
      suggestions: [],
      errors: []
    })
    wrapper.find('[data-testid="add-dependent-recipe"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("addDependentRecipe", {
      id: 2,
      qty: "3",
      name: "Roasted Vegetables"
    })
  })

  it("Won't Allow a Recipe to add itself.", async () => {
    const mockRoute = {
      params: {
        id: 1
      }
    }
    const wrapper = mount(DependentRecipes, {
      global: {
        mocks: { $route: mockRoute },
        plugins: [store, router]
      }
    })
    wrapper.setData({
      recipeName: "Roasted Vegetables",
      recipeQty: "3",
      recipeId: 1,
      suggestions: [],
      errors: []
    })
    wrapper.find('[data-testid="add-dependent-recipe"]').trigger("click")
    await wrapper.vm.$nextTick()
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.vm.errors[0]).toEqual("A recipe cannot be dependent upon itself.")
  })
  it("Won't add the same dependency twice.", async () => {
    const mockRoute = {
      params: {
        id: 1
      }
    }
    const wrapper = mount(DependentRecipes, {
      global: {
        mocks: { $route: mockRoute },
        plugins: [store, router]
      }
    })
    wrapper.setData({
      recipeName: "Roasted Chicken",
      recipeQty: "3",
      recipeId: 1,
      suggestions: [],
      errors: []
    })
    wrapper.find('[data-testid="add-dependent-recipe"]').trigger("click")
    await wrapper.vm.$nextTick()
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.vm.errors[0]).toEqual("That recipe is already listed as a dependency.")
  })
  it("Won't add a dependency without a qty", async () => {
    const mockRoute = {
      params: {
        id: 1
      }
    }
    const wrapper = mount(DependentRecipes, {
      global: {
        mocks: { $route: mockRoute },
        plugins: [store, router]
      }
    })
    wrapper.setData({
      recipeName: "Roast beef",
      recipeQty: "0",
      recipeId: 5,
      suggestions: [],
      errors: []
    })
    wrapper.find('[data-testid="add-dependent-recipe"]').trigger("click")
    await wrapper.vm.$nextTick()
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.vm.errors[0]).toEqual("You must specify how many batches of this recipe are needed.")
  })
})
