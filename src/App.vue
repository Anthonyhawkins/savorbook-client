<template>
  <div class="flex flex-col h-screen justify-between">
    <header><NavbarTop/></header>
    <main class="mb-auto"><router-view /></main>
    <footer><NavbarBottom/></footer>
  </div>
</template>


<script>
import axios from "axios"
import NavbarTop from "@/components/NavbarTop.vue";
import NavbarBottom from "@/components/NavbarBottom.vue";

export default {
  components: {
    NavbarTop,
    NavbarBottom
  },
  created(){
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }

    //handle malicious attempts to view protected routes
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401 ) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
    
  },
};


</script>

<style scoped>

</style>
