import StepText from "@/components/publish/recipe/steps/StepText.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"

describe("StepText.vue", () => {
  const store = createStore({})
  store.dispatch = jest.fn()

  it("Dispatches Save Step when the Textbox loses Focus.", async () => {
    const wrapper = mount(StepText, {
      props: {
        stepIndex: 0,
        step: {
          id: 1,
          type: "text",
          text: "",
          images: [
            {
              src: "",
              original: "",
              text: ""
            },
            {
              src: "",
              original: "",
              text: ""
            },
            {
              src: "",
              original: "",
              text: ""
            }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })

    const stepText = "Do this first, then that, finally this"
    wrapper.find('textarea[name="step-text"]').setValue(stepText)
    wrapper.find('textarea[name="step-text"]').trigger("blur")

    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("setStep", {
      index: 0,
      step: {
        id: 1,
        type: "text",
        text: stepText,
        images: [
          {
            src: "",
            original: "",
            text: ""
          }
        ]
      }
    })
  })

  it("Dispatches Remove Step when the delete icon is clicked.", async () => {
    const wrapper = mount(StepText, {
      props: {
        stepIndex: 0,
        step: {
          id: 1,
          type: "text",
          text: "",
          images: [
            {
              src: "",
              original: "",
              text: ""
            },
            {
              src: "",
              original: "",
              text: ""
            },
            {
              src: "",
              original: "",
              text: ""
            }
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
})
