import Signup from "@/views/Signup.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"

describe("Signup.vue", () => {
  const username = "ab"
  const displayName = "Ayyy Bee"
  const email = "ab@hmail.com"
  const password = "password"
  const passwordConfirm = "password"
  const store = createStore({
    getters: {
      errorMessage: jest.fn(() => "Invalid Login")
    }
  })

  const $router = {
    push: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("Dispatches register when form is submited and succeeds", async () => {
    store.dispatch = jest.fn(() =>
      Promise.resolve({
        success: true
      })
    )

    const wrapper = mount(Signup, {
      global: {
        mocks: {
          $router
        },
        plugins: [store]
      }
    })

    wrapper.find('input[name="username"]').setValue(username)
    wrapper.find('input[name="display-name"]').setValue(displayName)
    wrapper.find('input[name="email"]').setValue(email)
    wrapper.find('input[name="password"]').setValue(password)
    wrapper.find('input[name="password-confirm"]').setValue(passwordConfirm)

    wrapper.find('[data-testid="signup-form"]').trigger("submit")

    await wrapper.vm.$nextTick()

    expect(store.dispatch).toHaveBeenCalledWith("register", {
      username: username,
      displayName: displayName,
      email: email,
      password: password
    })
    expect($router.push).toHaveBeenCalledWith({ name: "Home" })
  })

  it("Dispatches register when form is submited and fails with errors", async () => {
    const errorMessage = "Username and or email already exists."
    store.dispatch = jest.fn(() =>
      Promise.resolve({
        success: false,
        errors: [errorMessage]
      })
    )

    const wrapper = mount(Signup, {
      global: {
        mocks: {
          $router
        },
        plugins: [store]
      }
    })

    wrapper.find('input[name="username"]').setValue(username)
    wrapper.find('input[name="display-name"]').setValue(displayName)
    wrapper.find('input[name="email"]').setValue(email)
    wrapper.find('input[name="password"]').setValue(password)
    wrapper.find('input[name="password-confirm"]').setValue(passwordConfirm)

    wrapper.find('[data-testid="signup-form"]').trigger("submit")

    await wrapper.vm.$nextTick()

    expect(store.dispatch).toHaveBeenCalledWith("register", {
      username,
      displayName,
      email,
      password
    })

    expect(wrapper.vm.errors[0]).toEqual(errorMessage)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('[data-testid="register-error"]').length).toBe(1)
  })

  it("Displays an error and does not submit the form if passwords do not match.", async () => {
    const wrapper = mount(Signup, {
      global: {
        mocks: {
          $router
        },
        plugins: [store]
      }
    })

    wrapper.find('input[name="username"]').setValue(username)
    wrapper.find('input[name="display-name"]').setValue(displayName)
    wrapper.find('input[name="email"]').setValue(email)
    wrapper.find('input[name="password"]').setValue(password)
    wrapper.find('input[name="password-confirm"]').setValue("doesnotmatch")

    wrapper.find('[data-testid="signup-form"]').trigger("submit")

    await wrapper.vm.$nextTick()
    expect(store.dispatch).toBeCalledTimes(0)
    expect(wrapper.vm.passwordMismatch).toEqual(true)
    expect(wrapper.find('[data-testid="password-error"]').exists()).toBe(true)
  })
})
