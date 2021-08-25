import DetailsPane from "@/components/publish/cookbook/DetailsPane.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"

describe("DetailsPane.vue", () => {
  const store = createStore({})
  store.dispatch = jest.fn()

  it("Sets Cookbook Details ", async () => {
    const wrapper = mount(DetailsPane, {
      global: {
        plugins: [store]
      }
    })

    wrapper.find('input[name="cookbook-title"]').setValue("Roasted Everything")
    wrapper.find('input[name="cookbook-title"]').trigger("blur")
    // eslint-disable-next-line prettier/prettier
    wrapper.find('input[name="cookbook-sub"]').setValue("100 recipes of just roasted food.")
    wrapper.find('input[name="cookbook-sub"]').trigger("blur")
    // eslint-disable-next-line prettier/prettier
    wrapper.find('textarea[name="blurb"').setValue("IF you ever wanted to roast all the things, this is the book for you!")
    wrapper.find('textarea[name="blurb"').trigger("blur")

    expect(store.dispatch).toBeCalledTimes(3)
  })
})
