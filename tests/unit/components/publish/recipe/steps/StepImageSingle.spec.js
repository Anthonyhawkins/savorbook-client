import StepImageSingle from "@/components/publish/recipe/steps/StepImageSingle.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"

describe("StepImageSingle.vue", () => {
  it("Dispatches Save Step when the Textbox loses Focus.", async () => {
    const store = createStore({})
    store.dispatch = jest.fn()
    const wrapper = mount(StepImageSingle, {
      props: {
        stepIndex: 0,
        step: {
          id: 1,
          type: "imageLeft",
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
        type: "imageLeft",
        text: "",
        images: [{ src: "", original: "", text: stepText }]
      }
    })
  })

  it("Flips the images when flip images icon is clicked", async () => {
    const store = createStore({})
    store.dispatch = jest.fn()
    const wrapper = mount(StepImageSingle, {
      props: {
        stepIndex: 0,
        step: {
          id: 1,
          type: "imageRight",
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

    wrapper.find('[data-testid="flip-button"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.type).toEqual("imageLeft")
  })

  it("Dispatches Remove Step when the delete icon is clicked.", async () => {
    const store = createStore({})
    store.dispatch = jest.fn()
    const wrapper = mount(StepImageSingle, {
      props: {
        stepIndex: 0,
        step: {
          id: 1,
          type: "imageSingle",
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

  it("Sets an Image when image-selected event emitted from ImageSelector", async () => {
    const store = createStore({})
    store.dispatch = jest.fn()
    const wrapper = mount(StepImageSingle, {
      props: {
        stepIndex: 0,
        step: {
          id: 1,
          type: "imageSingle",
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
        type: "imageSingle",
        text: "",
        images: [
          { src: "1fh583699dhd.583070-22.jpg", original: "dummy", text: "" }
        ]
      }
    })
  })
})
