import IngredientGroup from "@/components/publish/recipe/IngredientGroup.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"

describe("IngredientGroup.vue", () => {
  const initialState = {
    groupName: "",
    ingredients: [
      { name: "", qty: "", unit: "" },
      { name: "", qty: "", unit: "" },
      { name: "", qty: "", unit: "" }
    ]
  }

  const store = createStore({})
  store.dispatch = jest.fn()

  test("Group Name", async () => {
    const wrapper = mount(IngredientGroup, {
      props: {
        groupIndex: 1,
        ingredientGroup: initialState
      },
      global: {
        plugins: [store]
      }
    })
    const groupName = "For the Glaze"
    wrapper.find('input[name="group-name"]').setValue(groupName)
    wrapper.find('input[name="group-name"]').trigger("blur")
    await wrapper.vm.$nextTick()
    const payload = {
      index: wrapper.props().groupIndex,
      groupName: groupName,
      ingredients: initialState.ingredients
    }
    expect(store.dispatch).toHaveBeenCalledWith("setIngredientGroup", payload)
  })

  // eslint-disable-next-line prettier/prettier
  it("Saves the group when any field from IngredientGroupItem is no longer in focus", async () => {
    const wrapper = mount(IngredientGroup, {
      props: {
        groupIndex: 1,
        ingredientGroup: initialState
      },
      global: {
        plugins: [store]
      }
    })

    const groupItems = wrapper.findAllComponents(
      '[data-testid="ingredient-group-item"]'
    )

    groupItems[0].vm.$emit("out-of-focus")
    await wrapper.vm.$nextTick()

    const payload = {
      index: wrapper.props().groupIndex,
      groupName: initialState.groupName,
      ingredients: initialState.ingredients
    }
    expect(store.dispatch).toHaveBeenCalledWith("setIngredientGroup", payload)
  })

  it("Ensures there is one IngredientGroupItem if num ingredients are zero", async () => {
    const wrapper = mount(IngredientGroup, {
      props: {
        groupIndex: 1,
        ingredientGroup: {
          groupName: "",
          ingredients: []
        }
      },
      global: {
        plugins: [store]
      }
    })
    await wrapper.vm.$nextTick()
    const groupItems = wrapper.findAllComponents(
      '[data-testid="ingredient-group-item"]'
    )
    expect(groupItems.length).toBe(1)
  })

  it("Offers a new IngredientGroupItem if 3 Items are filled", async () => {
    const wrapper = mount(IngredientGroup, {
      props: {
        groupIndex: 1,
        ingredientGroup: {
          groupName: "",
          ingredients: [
            { name: "onions", qty: "3", unit: "cups" },
            { name: "carrots", qty: "1", unit: "" },
            { name: "garlic", qty: "2", unit: "cloves" }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })
    await wrapper.vm.$nextTick()
    const groupItems = wrapper.findAllComponents(
      '[data-testid="ingredient-group-item"]'
    )
    expect(groupItems.length).toBe(4)
  })

  it("Will remove IngredientGroupItem if it becomes empty", async () => {
    const wrapper = mount(IngredientGroup, {
      props: {
        groupIndex: 1,
        ingredientGroup: {
          groupName: "",
          ingredients: [
            { name: "onions", qty: "3", unit: "cups" },
            { name: "carrots", qty: "1", unit: "" },
            { name: "garlic", qty: "2", unit: "cloves" }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })
    await wrapper.vm.$nextTick()
    let groupItems = wrapper.findAllComponents(
      '[data-testid="ingredient-group-item"]'
    )
    groupItems[0].find('input[name="ingredient-name"]').setValue("")
    groupItems[0].trigger("blur")
    await wrapper.vm.$nextTick()
    groupItems = wrapper.findAllComponents(
      '[data-testid="ingredient-group-item"]'
    )
    expect(groupItems.length).toBe(3)
  })
})
