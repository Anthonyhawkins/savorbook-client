<template>
  <div class="grid justify-items-stretch">
    <div class="flex flex-col flex-none bg-white w-96 p-4 shadow-lg justify-self-center mt-20">

      <div>
        <form @submit.prevent="register" class="container">
          <div class="relative w-full mb-3">
            <label for="username" class="label">Username</label>
            <input v-model="username" id="username" name="username" type="text" class="input">
          </div>
          <div class="relative w-full mb-3">
            <label for="email" class="label">Email</label>
            <input v-model="email" id="email" name="email" type="email" class="input">
          </div>
          <div class="relative w-full mb-3">
            <label for="displayName" class="label">Name - Optional</label>
            <input v-model="displayName" id="displayName" name="displayName" type="text" class="input">
          </div>
          <div class="relative w-full mb-3">
            <label for="password" class="label">Password</label>
            <input v-model="password" id="password" name="password" type="password" class="input">
          </div>
          <div class="relative w-full mb-3">
            <label for="password" class="label">Confirm Password</label>
            <input v-model="passwordConfirm" id="password-confirm" type="password" name="password-confirm" class="input">
          </div>
          <div class="relative w-full mb-3">
              <button class="button-primary button-block" type="submit" name="action">
              Create Account
              </button>
          </div>

        </form>
      </div>

      <div v-if="passwordsMatch" class="text-center">
        <p class="text-red-500">Password mismatch.</p>
      </div>
      <div v-for="error in errors"  :key="error" class="text-center">
        <p class="text-red-500">{{ error }}</p>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      displayName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: [],
      passwordsMatch: null,
    }
  },
  methods: {
    register() {

      if (this.password == this.passwordConfirm) {
        this.passwordsMatch = true
      } else {
        this.passwordsMatch = false
      }

      this.$store.dispatch('register', {
        username: this.username,
        displayName: this.displayName,
        email: this.email,
        password: this.password,
      })
      .then( response => {
        
        if (response.success) {
          this.$router.push({ name: 'Home'})
        } else {
          this.errors = response.errors
          throw new Error(response.errors)
        }

      })
      .catch(err => {
        console.log(err)
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
