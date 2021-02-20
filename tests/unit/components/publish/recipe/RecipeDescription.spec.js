import RecipeDescription from "@/components/publish/recipe/RecipeDescription.vue"
import { mount } from "@vue/test-utils"

describe("RecipeDescription.vue", () => {
  it("Emits Update Model when Input changes", async () => {
    const wrapper = mount(RecipeDescription)
    wrapper
      .find('textarea[name="description"]')
      .setValue("This recipe is the best.")
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted("update:modelValue")).toBeTruthy()
  })

  it("Displays an Existing Description when passed a value prop", async () => {
    const description = "This recipe is the best"

    const wrapper = mount(RecipeDescription, {
      props: {
        modelValue: description
      }
    })

    expect(wrapper.find('textarea[name="description"]').element.value).toBe(
      description
    )
  })
})
