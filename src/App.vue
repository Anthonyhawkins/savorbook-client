<template>
  <div class="flex flex-col justify-between">
    <header v-if="showNav"><NavbarTop /></header>
    <main class="mb-auto"><router-view /></main>
  </div>
</template>

<script>
import axios from "axios"
import NavbarTop from "@/components/NavbarTop.vue"
//import NavbarBottom from "@/components/NavbarBottom.vue"

export default {
  components: {
    NavbarTop,
    //NavbarBottom
  },
  computed: {
    showNav() {
      const noNavRoutes = ["CookbookShow"]
      if (
        noNavRoutes.includes(this.$route.name) ||
        this.$route.query.readerMode
      ) {
        return false
      }
      return true
    }
  },
  created() {
    const userString = localStorage.getItem("user")
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit("SET_USER_DATA", userData)
    }

    //handle malicious attempts to view protected routes
    axios.interceptors.response.use(
      response => response,
      error => {
        //TODO 404 catch
        if (error.response.status === 401) {
          if (this.$route.name === "Login") {
            this.$store.dispatch("setError", error.response.data.message)
          } else {
            this.$store.dispatch("logout")
          }
        }
        return Promise.reject(error.response.data)
      }
    )
  }
}
</script>
