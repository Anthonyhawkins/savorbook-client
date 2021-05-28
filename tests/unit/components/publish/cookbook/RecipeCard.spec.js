import RecipeCard from "@/components/publish/cookbook/RecipeCard.vue"
import { mount } from "@vue/test-utils"
import router from "@/router"

describe("RecipeCard.vue", () => {
  beforeEach(async () => {
    router.push("/")
    await router.isReady()
  })

  it("Displays a Recipe Name", async () => {
    const wrapper = mount(RecipeCard, {
      props: {
        name: "Roasted Potatos",
        tags: ["one", "two", "three"],
        recipeId: 4
      },
      global: {
        plugins: [router]
      }
    })
    const name = wrapper.get('[data-testid="recipe-name"]')
    expect(name.text()).toBe("Roasted Potatos")
  })

  it("Displays a Tags", async () => {
    const wrapper = mount(RecipeCard, {
      props: {
        name: "Roasted Potatos",
        tags: ["one", "two", "three"],
        recipeId: 4
      },
      global: {
        plugins: [router]
      }
    })
    const tags = wrapper.findAll('[data-testid="recipe-tag"]')
    expect(tags.length).toBe(3)
  })
})
