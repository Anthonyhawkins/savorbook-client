import RecipeListItem from "@/components/publish/recipe/RecipeListItem.vue"
import { mount } from "@vue/test-utils"
import router from "@/router"

describe("RecipeListItem.vue", () => {
  it("Dispatches tag-selected when a tag is clicked on within that lsit", async () => {
    router.push("/")
    await router.isReady()

    const wrapper = mount(RecipeListItem, {
      props: {
        recipeName: "Baked Ziti",
        recipeId: 3,
        tags: ["italain", "pasta"]
      },
      global: {
        plugins: [router]
      }
    })
    await wrapper.vm.$nextTick()

    const recipeTags = wrapper.findAll('[data-testid="recipe-tag"]')
    recipeTags[0].trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted("tag-selected")).toBeTruthy()
  })
})
