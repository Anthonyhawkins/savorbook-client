import RecipeList from "@/views/publish/RecipeList.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"
import router from "@/router"
import axios from "axios"

import recipes from "../../responses/recipeList.js"

describe("RecipeList.vue", () => {
  beforeEach(async () => {
    jest.mock("axios")
    axios.get = jest.fn(() => Promise.resolve(recipes))
  })

  it("Displays a list of Recipes.", async () => {
    const wrapper = mount(RecipeList, {
      global: {
        plugins: [router]
      }
    })
    // eslint-disable-next-line prettier/prettier
    await wrapper.vm.$nextTick() // if recipes
    await wrapper.vm.$nextTick() // foreach recipe
    const recipeItems = wrapper.findAllComponents('[data-testid="recipe-item"]')
    expect(recipeItems.length).toBe(10)
  })

  it("Toggles a Filter Bar", async () => {
    const wrapper = mount(RecipeList, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.find('[data-testid="filter"]').exists()).toBe(false)
    wrapper.find('[data-testid="toggle-filter"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-testid="filter"]').exists()).toBe(true)
  })

  it("Toggles a Tag Bar", async () => {
    const wrapper = mount(RecipeList, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.find('[data-testid="tags"]').exists()).toBe(false)
    wrapper.find('[data-testid="toggle-tags"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-testid="tags"]').exists()).toBe(true)
  })
})
