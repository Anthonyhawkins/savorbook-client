import IngredientGroupItem from "@/components/publish/recipe/IngredientGroupItem.vue"
import { mount } from "@vue/test-utils"

describe("IngredientGroupItem.vue", () => {
  test("Ingredient Name", async () => {
    const wrapper = mount(IngredientGroupItem)
    wrapper.find('input[name="ingredient-name"]').setValue("eggs")
    wrapper.find('input[name="ingredient-name"]').trigger("blur")
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted("out-of-focus")).toBeTruthy()
    expect(wrapper.emitted("update:ingredientName")).toBeTruthy()
  })
  test("Ingredient Qty", async () => {
    const wrapper = mount(IngredientGroupItem)
    wrapper.find('input[name="ingredient-qty"]').setValue("3")
    wrapper.find('input[name="ingredient-qty"]').trigger("blur")
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted("out-of-focus")).toBeTruthy()
    expect(wrapper.emitted("update:ingredientQty")).toBeTruthy()
  })
  test("Ingredient Unit", async () => {
    const wrapper = mount(IngredientGroupItem)
    wrapper.find('input[name="ingredient-unit"]').setValue("tablespoons")
    wrapper.find('input[name="ingredient-unit"]').trigger("blur")
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted("out-of-focus")).toBeTruthy()
    expect(wrapper.emitted("update:ingredientUnit")).toBeTruthy()
  })

  it("Displays an Ingredient when passed a prop", async () => {
    const name = "This recipe is the best"
    const qty = "3"
    const unit = "tablespoons"

    const wrapper = mount(IngredientGroupItem, {
      props: {
        ingredientName: name,
        ingredientQty: qty,
        ingredientUnit: unit
      }
    })
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('input[name="ingredient-name"]').element.value).toBe(name)
    expect(wrapper.find('input[name="ingredient-qty"]').element.value).toBe(qty)
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('input[name="ingredient-unit"]').element.value).toBe(unit)
  })
})
