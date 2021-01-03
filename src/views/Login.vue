<template>
  <div class="grid justify-items-stretch">
    <div class="flex flex-col flex-none bg-white w-96 p-4 shadow-lg justify-self-center mt-20">

      <div>
        <form @submit.prevent="login" class="container">

          <div class="relative w-full mb-3">
            <label class="label" for="email">Email</label>
            <input v-model="email" name="email" id="email" type="email" class="input">
          </div>
          
          <div class="relative w-full mb-3">
            <label class="label" for="password">Password</label>
            <input v-model="password" name="password" id="password" type="password" class="input">
          </div>

          <div class="relative w-full mb-3">
            <button class="button" type="submit" name="action">
              Login
            </button>
          </div>

        </form>
      </div>

      <div v-if="error" class="text-center">
        <p class="text-red-500">Invalid Login</p>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    login(){
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      .then( () => {
        this.$router.push({"name": "Home"})
      })
      .catch(err=> {
        this.error = err.response.data
      })
    }
  }
};
</script>

<style scoped>

</style>
