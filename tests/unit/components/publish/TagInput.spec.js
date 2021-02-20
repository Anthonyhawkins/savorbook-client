import TagInput from "@/components/publish/TagInput.vue"
import { mount } from "@vue/test-utils"

describe("TagInput.vue", () => {
  it("Adds a tag when the enter key is hit.", async () => {
    const wrapper = mount(TagInput)

    wrapper.find('input[name="tag-input"]').setValue("Italian")
    wrapper.find('input[name="tag-input"]').trigger("keyup", { key: "Enter" })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('[data-testid="tag"]').length).toBe(1)
    expect(wrapper.emitted("tags-updated")).toBeTruthy()
  })

  it("Wont add the same tag twice", async () => {
    const wrapper = mount(TagInput)

    wrapper.find('input[name="tag-input"]').setValue("Italian")
    wrapper.find('input[name="tag-input"]').trigger("keyup", { key: "Enter" })
    await wrapper.vm.$nextTick()
    wrapper.find('input[name="tag-input"]').setValue("Italian")
    wrapper.find('input[name="tag-input"]').trigger("keyup", { key: "Enter" })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('[data-testid="tag"]').length).toBe(1)
  })

  it("Removes a tag when the X is clicked on a tag.", async () => {
    const wrapper = mount(TagInput)

    wrapper.find('input[name="tag-input"]').setValue("Italian")
    wrapper.find('input[name="tag-input"]').trigger("keyup", { key: "Enter" })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('[data-testid="tag"]').length).toBe(1)
    wrapper.find('[data-testid="tag-close"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('[data-testid="tag"]').length).toBe(0)
    expect(wrapper.emitted("tags-updated")).toBeTruthy()
  })

  it("Displays tags when provided existing tags.", async () => {
    const wrapper = mount(TagInput)
    wrapper.setProps({ tags: ["Italian", "Veg", "Quick"] })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('[data-testid="tag"]').length).toBe(3)
  })
})
