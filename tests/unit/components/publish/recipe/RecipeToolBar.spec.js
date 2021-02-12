import RecipeToolBar from "@/components/publish/recipe/RecipeToolBar.vue"
import { mount } from "@vue/test-utils"

describe("RecipeToolBar.vue", () => {
  it("Emits Save Recipe Event when Save Recipe Button is Clicked", async () => {
    const wrapper = mount(RecipeToolBar)
    wrapper.find('[data-testid="save-recipe"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted("save-recipe")).toBeTruthy()
  })
})