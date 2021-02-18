import ImageCropper from "@/components/ImageCropper.vue"
import { mount } from "@vue/test-utils"

describe("ImageCropper.vue", () => {
  it("Emits set-crop when the crop button is clicked.", async () => {
    const wrapper = mount(ImageCropper, {
      props: {
        //TODO - This path doesn't work. Figure out how to use local image
        // in component.
        src: "../../tests/unit/assets/pasta.jpg"
      }
    })
    wrapper.find('[data-testid="crop-button"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted("set-crop")).toBeTruthy()
  })
})
