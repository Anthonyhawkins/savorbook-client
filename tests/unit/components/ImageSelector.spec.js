import ImageSelector from "@/components/ImageSelector.vue"
import { mount } from "@vue/test-utils"
//import { dataURItoBlob } from "@/helpers/helpers.js"

describe("ImageSelector.vue", () => {
  // eslint-disable-next-line prettier/prettier
  //const testImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIBAAAgICAQUBAAAAAAAAAAAAAQIDBAUREgAGByExCP/EABQBAQAAAAAAAAAAAAAAAAAAAAb/xAAhEQABAwQBBQAAAAAAAAAAAAABAgMEAAURMSFBUWGRsf/aAAwDAQACEQMRAD8At+Yu2aFvyfnzmBcaw1mfnbeVmfkhADrxdQoJBXiwOtp8B2U+Mo/oWHG1IcVmO75KUcEa1nijsMjRBQEKlX0Rx1oj1r51qK4TDZG32LkMhiKVq1anaGeeaujySxrYZVRmI2yhQAAfQA10ymv34JXgguzxxxsUREkYKqg6AAB9ADoXb4jyp8hK3iQCD7yfOtU4uM1lMGMUsjkfMDt13X//2Q=="

  it("Displays a centered image upload button if no image is present", async () => {
    const wrapper = mount(ImageSelector)
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('[data-testid="upload-button-primary"]').exists()).toBe(true)
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('[data-testid="image-adjustment-buttons"]').exists()).toBe(false)
  })

  it("Dynamically generates a image URL if given an existing image name.", async () => {
    const wrapper = mount(ImageSelector, {
      props: {
        existingImage: "289494930200fjfj32091-59940548f58wg57sn178.jpg"
      }
    })
    expect(wrapper.vm.imgsrc).toEqual(
      "https://storage.googleapis.com/savorbook-dev/289494930200fjfj32091-59940548f58wg57sn178.jpg"
    )
  })

  it("Displays an image upload button, but not the crop button, if image is available but not the original", async () => {
    const wrapper = mount(ImageSelector, {
      props: {
        existingImage: "289494930200fjfj32091-59940548f58wg57sn178.jpg"
      }
    })
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('[data-testid="upload-button-primary"]').exists()).toBe(false)
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('[data-testid="upload-button-secondary"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="crop-button"]').exists()).toBe(false)
  })

  it("Displays a cropper button and image upload button if original is present", async () => {
    const wrapper = mount(ImageSelector, {
      props: {
        existingImage: "289494930200fjfj32091-59940548f58wg57sn178.jpg",
        existingOriginal: "<dummy-image>"
      }
    })
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('[data-testid="upload-button-primary"]').exists()).toBe(false)
    // eslint-disable-next-line prettier/prettier
    expect(wrapper.find('[data-testid="upload-button-secondary"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="crop-button"]').exists()).toBe(true)
  })

  it("Opens the Image Cropper if crop is true", async () => {
    const wrapper = mount(ImageSelector)
    wrapper.vm.startCrop()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.crop).toBe(true)
    expect(
      wrapper.findComponent('[data-testid="image-cropper"]').exists()
    ).toBe(true)
  })

  //TODO - Mock File Blobs and File Reader
  it("Starts the Cropper when Image is Selected", async () => {})
  it("It Displays a warning if file size is too big", async () => {})
  it("Uploads an Image when set-crop is emitted, then emits imageSelected", async () => {})
})
