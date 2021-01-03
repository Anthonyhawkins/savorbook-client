<template>
  <div class="grid justify-items-stretch">
    <div class="flex flex-col flex-none bg-white w-96 p-4 shadow-lg justify-self-center mt-20">

      <div>
        <form @submit.prevent="register" class="container">
          <div class="relative w-full mb-3">
            <label for="email" class="label">Email</label>
            <input v-model="email" id="email" name="email" type="email" class="input">
          </div>
          <div class="relative w-full mb-3">
            <label for="password" class="label">Password</label>
            <input v-model="password" id="password" name="password" type="password" class="input">
          </div>
          <div class="relative w-full mb-3">
            <label for="password" class="label">Confirm Password</label>
            <input id="password-confirm" type="password" name="password-confirm" class="input">
          </div>
          <div class="relative w-full mb-3">
              <button class="button" type="submit" name="action">
              Create Account
              </button>
          </div>

        </form>
      </div>

      <div v-if="error" class="text-center">
        <p class="text-red-500">{{ error }}</p>
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
    register() {
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password
      })
      .then( () => {
        this.$router.push({ name: 'Home'})
      })
      .catch(err=> {
        this.error = err.response.data
      })
    }
  }
};
</script>

<style scoped>
.login-card {
  margin-top: 60px;
}
</style>
