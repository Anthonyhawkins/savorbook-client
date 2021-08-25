import RecipePane from "@/components/publish/cookbook/RecipePane.vue"
import { mount } from "@vue/test-utils"
import axios from "axios"
import router from "@/router"

import recipes from "../../../responses/recipeList.js"

describe("RecipePane", () => {
  beforeEach(async () => {
    jest.mock("axios")
    axios.get = jest.fn(() => Promise.resolve(recipes))
    router.push("/")
    await router.isReady()
  })

  it("Displays a list of Recipes.", async () => {
    const wrapper = mount(RecipePane, {
      global: {
        plugins: [router]
      }
    })
    // eslint-disable-next-line prettier/prettier
    await wrapper.vm.$nextTick() // if recipes
    await wrapper.vm.$nextTick() // foreach recipe
    const recipeItems = wrapper.findAllComponents('[data-testid="recipe-card"]')
    expect(recipeItems.length).toBe(10)
  })

  it("Search by Tags", async () => {
    const wrapper = mount(RecipePane, {
      global: {
        plugins: [router]
      }
    })
    // eslint-disable-next-line prettier/prettier
    wrapper.find('input[name="search-field"]').setValue("#cookies #dessert #italain")
    // eslint-disable-next-line prettier/prettier
    wrapper.find('input[name="search-field"]').trigger("keyup")
    await wrapper.vm.$nextTick()
    expect(axios.get).toBeCalledWith(
      "/publish/recipes?tags=cookies,dessert,italain&page=1&page_size=50"
    )
  })

  it("Searches By Name", async () => {
    const wrapper = mount(RecipePane, {
      global: {
        plugins: [router]
      }
    })
    // eslint-disable-next-line prettier/prettier
    wrapper.find('input[name="search-field"]').setValue("Baked Cod")
    // eslint-disable-next-line prettier/prettier
    wrapper.find('input[name="search-field"]').trigger("keyup")
    await wrapper.vm.$nextTick()
    expect(axios.get).toBeCalledWith(
      "/publish/recipes?name=Baked Cod&page=1&page_size=50"
    )
  })
})
