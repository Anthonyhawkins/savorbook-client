<template>
  <div class="grid justify-items-stretch">
    <div
      class="flex flex-col flex-none bg-white w-96 p-4 shadow-lg justify-self-center mt-20"
    >
      <div>
        <form
          @submit.prevent="register"
          class="container"
          data-testid="signup-form"
        >
          <div class="relative w-full mb-3">
            <label for="username" class="label">Username</label>
            <input
              v-model="username"
              id="username"
              name="username"
              type="text"
              class="input"
            />
          </div>
          <div class="relative w-full mb-3">
            <label for="email" class="label">Email</label>
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              class="input"
            />
          </div>
          <div class="relative w-full mb-3">
            <label for="display-name" class="label">Name - Optional</label>
            <input
              v-model="displayName"
              id="display-name"
              name="display-name"
              type="text"
              class="input"
            />
          </div>
          <div class="relative w-full mb-3">
            <label for="password" class="label">Password</label>
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              class="input"
            />
          </div>
          <div class="relative w-full mb-3">
            <label for="password-confirm" class="label">Confirm Password</label>
            <input
              v-model="passwordConfirm"
              id="password-confirm"
              type="password"
              name="password-confirm"
              class="input"
            />
          </div>
          <div class="relative w-full mb-3">
            <button
              class="button-primary button-block"
              type="submit"
              name="action"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>

      <div
        v-if="passwordMismatch"
        class="text-center"
        data-testid="password-error"
      >
        <p class="text-red-500">Password mismatch.</p>
      </div>
      <div
        v-for="error in errors"
        :key="error"
        class="text-center"
        data-testid="register-error"
      >
        <p class="text-red-500">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      errors: [],
      passwordMismatch: null
    }
  },
  methods: {
    register() {
      if (this.password != this.passwordConfirm) {
        this.passwordMismatch = true
        return false
      } else {
        this.passwordMismatch = false
      }

      this.$store
        .dispatch("register", {
          username: this.username,
          displayName: this.displayName,
          email: this.email,
          password: this.password
        })
        .then(response => {
          if (response.success) {
            this.$router.push({ name: "Home" })
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
}
</script>

<style scoped>
.login-card {
  margin-top: 60px;
}
</style>
