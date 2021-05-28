<template lang="">
  <nav class="nav-bar">
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start"
      >
        <a
          class="text-sm font-bold leading-relaxed inline-block mr-6 py-2 whitespace-no-wrap uppercase text-white text-xl"
          href="#pablo"
        >
          savorbook
        </a>
        <button class="nav-hamburger" type="button">
          <span class="block relative w-6 h-px rounded-sm bg-white"></span>
          <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
          <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
        </button>
      </div>
      <div
        class="lg:flex flex-grow justify-between"
        id="example-navbar-warning"
      >
        <ul class="flex flex-col lg:flex-row list-none">
          <li class="nav-item">
            <router-link class="nav-item" :to="{ name: 'About' }"
              >Library</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-item" :to="{ name: 'About' }"
              >Store</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-item" :to="{ name: 'Publish' }"
              >Publishing</router-link
            >
          </li>
        </ul>
        <ul class="flex flex-col lg:flex-row list-none">
          <li v-if="loggedIn" class="nav-item" data-testid="account-button">
            <router-link class="nav-item" :to="{ name: 'Account' }">{{
              user.username
            }}</router-link>
          </li>
          <li v-if="loggedIn" class="nav-item">
            <a
              href=""
              @click="logout"
              class="nav-item"
              data-testid="logout-button"
              >Logout</a
            >
          </li>
          <li v-if="!loggedIn" class="nav-item" data-testid="login-button">
            <router-link class="nav-item" :to="{ name: 'Login' }"
              >Login</router-link
            >
          </li>
          <li v-if="!loggedIn" class="nav-item" data-testid="signup-button">
            <router-link class="nav-item" :to="{ name: 'Signup' }"
              >Signup</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavbarTop",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["loggedIn", "user"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout")
    }
  }
}
</script>

<style lang="postcss" scoped>
a.router-link-active {
  @apply border-b-2  border-white;
}

.nav-bar {
  @apply relative flex flex-wrap items-center justify-between px-2 py-3 bg-rose-600 shadow-md border-b border-rose-700 border;
}
.nav-item {
  @apply px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75;
}

.nav-hamburger {
  @apply cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none;
}
</style>
