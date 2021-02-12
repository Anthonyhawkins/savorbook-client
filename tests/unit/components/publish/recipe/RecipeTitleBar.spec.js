import RecipeTitleBar from "@/components/publish/recipe/RecipeTitleBar.vue"
import { mount } from "@vue/test-utils"

describe("RecipeTitleBar.vue", () => {
  it("Emits Update Model when Input changes", async () => {
    const wrapper = mount(RecipeTitleBar)

    const title = "Scrambled Eggs"

    wrapper.find('input[name="recipe-title"]').setValue(title)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted("update:modelValue")).toBeTruthy()
  })

  it("Displays an Existing Title when passed a value prop", async () => {
    const title = "Scrambled Eggs"

    const wrapper = mount(RecipeTitleBar, {
      props: {
        modelValue: title
      }
    })

    expect(wrapper.find('input[name="recipe-title"]').element.value).toBe(title)
  })
})
