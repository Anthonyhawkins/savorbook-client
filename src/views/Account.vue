<template>
  <div class="container mx-auto p-5">
    <h1 class="text-xl font-medium my-3 text-rose-600">Account</h1>
    <div class="flex flex-col">
      <Alert v-if="alertMessage" alertType="danger" :message="alertMessage" />

      <div class="flex flex-row justify-between mb-3">
        <div class="flex w-1/4">
          <strong class="font-bold uppercase text-gray-500">
            Username
          </strong>
        </div>
        <div class="flex  w-1/3">
          <input
            v-if="toggles.username"
            v-model="userCopy.username"
            name="username"
            class="input"
          />
          <span v-else class="text-large">{{ user.username }}</span>
        </div>
        <div class="flex">
          <span
            v-if="toggles.username"
            class="text-cyan-600"
            @click="save('username')"
            >save</span
          >
          <span v-else class="text-cyan-600" @click="edit('username')">
            edit
          </span>
        </div>
      </div>

      <div class="flex flex-row justify-between mb-3">
        <div class="flex w-1/4">
          <strong class="font-bold uppercase text-gray-500">
            Email
          </strong>
        </div>
        <div class="flex  w-1/3">
          <input
            v-if="toggles.email"
            v-model="userCopy.email"
            name="email"
            class="input"
          />
          <span v-else class="text-large">{{ user.email }}</span>
        </div>
        <div class="flex">
          <span
            v-if="toggles.email"
            class="text-cyan-600"
            @click="save('email')"
            >save</span
          >
          <span v-else class="text-cyan-600" @click="edit('email')">edit</span>
        </div>
      </div>

      <div class="flex flex-row justify-between mb-3">
        <div class="flex w-1/4">
          <strong class="font-bold uppercase text-gray-500">
            displayName
          </strong>
        </div>
        <div class="flex  w-1/3">
          <input
            v-if="toggles.displayName"
            v-model="userCopy.displayName"
            name="displayName"
            class="input"
          />
          <span v-else class="text-large">{{ user.displayName }}</span>
        </div>
        <div class="flex">
          <span
            v-if="toggles.displayName"
            class="text-cyan-600"
            @click="save('displayName')"
          >
            save
          </span>
          <span v-else class="text-cyan-600" @click="edit('displayName')">
            edit
          </span>
        </div>
      </div>

    </div>
    <h1 class="text-xl font-medium my-3 text-rose-600">Actions</h1>
    <div class="flex flex-col">
      <div class="flex flex-row justify-between mb-3">
        <div class="flex w-1/4">
          <strong class="font-bold uppercase text-gray-500">
            Password
          </strong>
        </div>
        <div class="flex w-1/3"></div>
        <div class="flex">
          <span class="text-cyan-600">change</span>
        </div>
      </div>
      <div class="flex flex-col justify-between mb-3">
        <div class="relative w-full mt-10 mb-3">
          <button
            class="button-primary button-block bg-gray-400"
            type="submit"
            name="action"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from "@/services/apiService.js"
import { mapGetters } from "vuex"
import Alert from "@/components/Alert.vue"
export default {
  components: {
    Alert
  },
  data() {
    return {
      alertMessage: "",
      toggles: {
        username: false,
        email: false,
        displayName: false
      }
    }
  },
  created() {
    this.userCopy = Object.assign({}, this.user)
  },
  methods: {
    edit(field) {
      this.toggles[field] = this.toggles[field] ? false : true
    },
    save(field) {
      AuthService.updateUser({
        username: this.userCopy.username,
        displayName: this.userCopy.displayName,
        email: this.userCopy.email
      })
        .then(() => {
          this.$store.dispatch("updateUserField", {
            field: field,
            value: this.userCopy[field]
          })
          this.userCopy[field] = this.user[field]
          this.toggles[field] = false
          this.alertMessage = ""
        })
        .catch(error => {
          this.alertMessage = `${error.message} - ${error.errors[0]}`
        })
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
}
</script>

<style></style>
