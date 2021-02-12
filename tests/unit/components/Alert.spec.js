import Alert from "@/components/Alert.vue"
import { mount } from "@vue/test-utils"

describe("Alert.vue", () => {
  test("If Alert Type is Danger - Display Danger", async () => {
    const wrapper = mount(Alert, {
      props: {
        message: "This is only a Test.",
        alertType: "danger"
      }
    })

    expect(wrapper.find('[data-testid="alert"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="alert-message"]').text()).toEqual(
      "This is only a Test."
    )
  })

  test("When Alert is closed, the alert is no longer visible.", async () => {
    const wrapper = mount(Alert, {
      props: {
        message: "This is only a Test.",
        alertType: "danger"
      }
    })
    await wrapper.find('[data-testid="alert-close"]').trigger("click")
    expect(wrapper.find('[data-testid="alert"]').exists()).toBe(false)
  })
})
