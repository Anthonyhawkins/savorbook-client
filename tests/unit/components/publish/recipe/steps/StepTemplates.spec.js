import StepTemplates from "@/components/publish/recipe/steps/StepTemplates.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"

describe("StepTemplates.vue", () => {
  const store = createStore({})
  store.dispatch = jest.fn()

  const wrapper = mount(StepTemplates, {
    global: {
      plugins: [store]
    }
  })

  it("Dispatches addStep when step-text template is clicked", async () => {
    wrapper.find('[data-testid="step-text"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("addStep", "text")
  })
  it("Dispatches addStep when step-tip template is clicked", async () => {
    wrapper.find('[data-testid="step-tip"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("addStep", "tipText")
  })
  it("Dispatches addStep when image-right template is clicked", async () => {
    wrapper.find('[data-testid="image-right"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("addStep", "imageRight")
  })
  it("Dispatches addStep when image-left template is clicked", async () => {
    wrapper.find('[data-testid="image-left"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("addStep", "imageLeft")
  })
  it("Dispatches addStep when image-double template is clicked", async () => {
    wrapper.find('[data-testid="image-double"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("addStep", "imageDouble")
  })
  it("Dispatches addStep when image-triple template is clicked", async () => {
    wrapper.find('[data-testid="image-triple"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("addStep", "imageTriple")
  })
})
