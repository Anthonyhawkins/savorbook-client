import StepImageDouble from "@/components/publish/recipe/steps/StepImageDouble.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"

describe("StepImageDouble.vue", () => {
  it("Dispatches Save Step when the Textbox loses Focus.", async () => {
    const store = createStore({})
    store.dispatch = jest.fn()
    const wrapper = mount(StepImageDouble, {
      props: {
        stepIndex: 0,
        step: {
          id: 1,
          type: "imageDouble",
          text: "",
          images: [
            { src: "", original: "", text: "" },
            { src: "", original: "", text: "" },
            { src: "", original: "", text: "" }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })

    const stepText = "Do this first, then that, finally this"
    wrapper.find('textarea[name="caption-1"]').setValue(stepText)
    wrapper.find('textarea[name="caption-1"]').trigger("blur")
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("setStep", {
      index: 0,
      step: {
        id: 1,
        type: "imageDouble",
        text: "",
        images: [
          { src: "", original: "", text: stepText },
          { src: "", original: "", text: "" },
          { src: "", original: "", text: "" }
        ]
      }
    })
    wrapper.find('textarea[name="caption-2"]').setValue(stepText)
    wrapper.find('textarea[name="caption-2"]').trigger("blur")
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("setStep", {
      index: 0,
      step: {
        id: 1,
        type: "imageDouble",
        text: "",
        images: [
          { src: "", original: "", text: stepText },
          { src: "", original: "", text: stepText },
          { src: "", original: "", text: "" }
        ]
      }
    })
  })

  it("Dispatches Remove Step when the delete icon is clicked.", async () => {
    const store = createStore({})
    store.dispatch = jest.fn()
    const wrapper = mount(StepImageDouble, {
      props: {
        stepIndex: 0,
        step: {
          id: 1,
          type: "imageDouble",
          text: "",
          images: [
            { src: "", original: "", text: "" },
            { src: "", original: "", text: "" },
            { src: "", original: "", text: "" }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })

    wrapper.find('[data-testid="delete-step"]').trigger("click")

    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("removeStep", 0)
  })

  it("Flips the images when flip images icon is clicked", async () => {
    const store = createStore({})
    store.dispatch = jest.fn()
    const wrapper = mount(StepImageDouble, {
      props: {
        stepIndex: 0,
        step: {
          id: 1,
          type: "imageDouble",
          text: "",
          images: [
            { src: "a", original: "a", text: "a" },
            { src: "b", original: "b", text: "b" },
            { src: "", original: "", text: "" }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })

    wrapper.find('[data-testid="flip-button"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.images[0].text).toEqual("b")
    expect(wrapper.vm.images[1].text).toEqual("a")
  })

  it("Sets an Image when image-selected event emitted from ImageSelector", async () => {
    const store = createStore({})
    store.dispatch = jest.fn()
    const wrapper = mount(StepImageDouble, {
      props: {
        stepIndex: 0,
        step: {
          id: 1,
          type: "imageDouble",
          text: "",
          images: [
            { src: "", original: "", text: "" },
            { src: "", original: "", text: "" },
            { src: "", original: "", text: "" }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })

    wrapper.vm.setImage({
      image: "0",
      src: "1fh583699dhd.583070-22.jpg",
      original: "dummy"
    })
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("setStep", {
      index: 0,
      step: {
        id: 1,
        type: "imageDouble",
        text: "",
        images: [
          { src: "1fh583699dhd.583070-22.jpg", original: "dummy", text: "" },
          { src: "", original: "", text: "" },
          { src: "", original: "", text: "" }
        ]
      }
    })
  })
})
