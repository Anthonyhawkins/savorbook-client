import Login from "@/views/Login.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"

describe("Login.vue", () => {
  const store = createStore({
    getters: {
      errorMessage: jest.fn(() => "Invalid Login")
    }
  })

  it("Dispatches login when form is submited.", async () => {
    store.dispatch = jest.fn(() => Promise.resolve())

    const $router = {
      push: jest.fn()
    }

    const wrapper = mount(Login, {
      global: {
        mocks: {
          $router
        },
        plugins: [store]
      }
    })

    const email = "ab@hmail.com"
    const password = "password"

    wrapper.find('input[name="email"]').setValue(email)
    wrapper.find('input[name="password"]').setValue(password)

    wrapper.find('[data-testid="login-form"]').trigger("submit")

    await wrapper.vm.$nextTick()

    expect(store.dispatch).toHaveBeenCalledWith("login", {
      email: email,
      password: password
    })
    expect($router.push).toHaveBeenCalledWith({ name: "Home" })
  })

  it("Displays an error when login fails", async () => {
    store.dispatch = jest.fn(() => Promise.reject("Invalid Login"))

    const wrapper = mount(Login, {
      global: {
        mocks: {},
        plugins: [store]
      }
    })
    wrapper.find('[data-testid="login-form"]').trigger("submit")

    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-testid="login-error"]').exists()).toBe(true)
  })
})
