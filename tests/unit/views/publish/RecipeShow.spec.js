import RecipeShow from "@/views/publish/RecipeShow.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"
import router from "@/router"

import recipe from "../../responses/recipe.js"

function recipeWrapper() {
  const store = createStore({
    getters: {
      recipe: jest.fn(() => recipe)
    }
  })
  store.dispatch = jest.fn(() => Promise.resolve())

  const wrapper = mount(RecipeShow, {
    global: {
      plugins: [store, router]
    }
  })

  return wrapper
}

describe("RecipeShow", () => {
  beforeEach(async () => {
    router.push("/")
    await router.isReady()
  })

  it("Displays a Title and Description", async () => {
    const wrapper = recipeWrapper()
    expect(wrapper.find('[data-testid="recipe-title"]').exists()).toBe(true)
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('[data-testid="recipe-description"]').exists()).toBe(true)
  })

  it("Displays Tags", async () => {
    const wrapper = recipeWrapper()
    expect(wrapper.findAll('[data-testid="recipe-tag"]').length).toBe(7)
  })

  it("Displays Prep Time and Servings", async () => {
    const wrapper = recipeWrapper()
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('[data-testid="recipe-prep-servings"]').exists()).toBe(true)
  })

  it("Displays a Main Photo", async () => {
    const wrapper = recipeWrapper()
    expect(wrapper.find('[data-testid="recipe-photo"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="recipe-photo"]').attributes("src")).toBe(
      "https://storage.googleapis.com/savorbook-dev/2b3704d5-c557-4969-863f-66744fbca5bc-r-0199.jpg"
    )
  })

  it("Displays Dependent Recipes", async () => {
    const wrapper = recipeWrapper()
    expect(wrapper.findAll('[data-testid="dependent-recipe"]').length).toBe(2)
  })

  it("Displays Ingedients", async () => {
    const wrapper = recipeWrapper()
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.findAll('[data-testid="ingredient-group-name"]').length).toBe(2)
    expect(wrapper.findAll('[data-testid="ingredient"]').length).toBe(16)
  })

  it("Displays 5 Numbered Steps (Text Steps)", async () => {
    const wrapper = recipeWrapper()
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.findAll('[data-testid="text-steps"]').length).toBe(5)
  })

  it("Displays Image Steps", async () => {
    const wrapper = recipeWrapper()
    expect(wrapper.findAll('[data-testid="image-right"]').length).toBe(1)
    expect(wrapper.findAll('[data-testid="image-left"]').length).toBe(1)
    expect(wrapper.findAll('[data-testid="image-double"]').length).toBe(1)
    expect(wrapper.findAll('[data-testid="image-triple"]').length).toBe(1)
  })

  it("Displays Tip Steps", async () => {
    const wrapper = recipeWrapper()
    expect(wrapper.findAll('[data-testid="tip-step"]').length).toBe(1)
  })
})
