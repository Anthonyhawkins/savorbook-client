import NavbarTop from "@/components/NavbarTop.vue"
import { mount } from "@vue/test-utils"
import { createStore } from "vuex"
import router from "@/router"


describe("NavbarTop.vue", () => {
  it("Displays Account and Logout when user is Logged in.", async () => {
    const store = createStore({
      getters: {
        loggedIn: jest.fn(() => true),
        user: jest.fn(() => {
          return { username: "someUser" }
        })
      }
    })

    const wrapper = mount(NavbarTop, {
      global: {
        plugins: [store, router]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-testid="account-button"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="logout-button"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="signup-button"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="login-button"]').exists()).toBe(false)
  })

  it("Displays Login and Signup when user is not logged in.", async () => {
    const store = createStore({
      getters: {
        loggedIn: jest.fn(() => false),
        user: jest.fn(() => {
          return { username: "someUser" }
        })
      }
    })

    const wrapper = mount(NavbarTop, {
      global: {
        plugins: [store, router]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-testid="account-button"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="logout-button"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="signup-button"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="login-button"]').exists()).toBe(true)
  })

  it("Dispatches logout when user clicks Logout", async () => {
    const store = createStore({
      getters: {
        loggedIn: jest.fn(() => true),
        user: jest.fn(() => {
          return { username: "someUser" }
        })
      }
    })

    store.dispatch = jest.fn()

    const wrapper = mount(NavbarTop, {
      global: {
        plugins: [store, router]
      }
    })

    await wrapper.vm.$nextTick()
    wrapper.find('[data-testid="logout-button"]').trigger("click")
    await wrapper.vm.$nextTick()
    expect(store.dispatch).toHaveBeenCalledWith("logout")
  })
})