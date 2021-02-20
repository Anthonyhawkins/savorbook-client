import IngredientsToolBar from "@/components/publish/recipe/IngredientsToolBar.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"

describe("IngredientsToolBar.vue", () => {
  const store = createStore({})
  store.dispatch = jest.fn()

  it("Dispatches Add Ingredient Group When button is clicked", async () => {
    const wrapper = mount(IngredientsToolBar, {
      global: {
        plugins: [store]
      }
    })
    wrapper.find('[data-testid="add-group"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("addIngredientGroup")
  })
})
