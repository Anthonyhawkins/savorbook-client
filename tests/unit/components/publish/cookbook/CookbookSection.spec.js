import CookbookSection from "@/components/publish/cookbook/CookbookSection.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"

describe("CookbookSection.vue", () => {
  const store = createStore({})
  store.dispatch = jest.fn()

  it("Toggles additional inputs.", async () => {
    const wrapper = mount(CookbookSection, {
      props: {
        index: 1,
        section: {
          name: "",
          overview: "",
          recipes: []
        }
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.find('textarea[name="overview"').isVisible()).toBe(false)
    await wrapper.find('[data-testid="details-toggle"]').trigger("click")
    expect(wrapper.find('textarea[name="overview"').isVisible()).toBe(true)
    await wrapper.find('[data-testid="details-toggle"]').trigger("click")
    expect(wrapper.find('textarea[name="overview"').isVisible()).toBe(false)
  })

  it("updates name and overview on blur.", async () => {
    const wrapper = mount(CookbookSection, {
      props: {
        index: 1,
        section: {
          name: "",
          overview: "",
          recipes: []
        }
      },
      global: {
        plugins: [store]
      }
    })

    wrapper.find('input[name="section-name"').setValue("Desserts")
    wrapper.find('input[name="section-name"').trigger("blur")
    // eslint-disable-next-line prettier/prettier
    wrapper.find('textarea[name="overview"').setValue("All The Dessert recipes are here!")
    wrapper.find('textarea[name="overview"').trigger("blur")

    expect(store.dispatch).toBeCalledTimes(2)
  })

  it("Deletes itself when delete button is clicked", async () => {
    const wrapper = mount(CookbookSection, {
      props: {
        index: 1,
        section: {
          name: "",
          overview: "",
          recipes: []
        }
      },
      global: {
        plugins: [store]
      }
    })
    await wrapper.find('[data-testid="delete-button"]').trigger("click")
    expect(store.dispatch).toBeCalledWith("deleteCookbookSection", 1)
  })
})
