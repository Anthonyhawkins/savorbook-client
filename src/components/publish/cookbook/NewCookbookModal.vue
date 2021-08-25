<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-96"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div>
            <input
              name="cookbook-title"
              v-model="title"
              type="text"
              class="h-12 outline-none border-b border-rose-500 w-full text-center"
              placeholder="Cookbook Title..."
            />
            <p class="text-gray-400 text-sm text-center">
              You Can Change this later
            </p>
          </div>
        </div>
        <div
          class="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-center"
        >
          <button
            @click="create()"
            type="button"
            data-testid="crop-button"
            class="w-full inline-flex justify-center rounded border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Create
          </button>
          <button
            @click="cancel()"
            type="button"
            data-testid="crop-button"
            class="w-full inline-flex justify-center rounded border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CookbookService } from "@/services/apiService.js"

export default {
  name: "NewCookbookModal",
  data() {
    return {
      title: ""
    }
  },
  methods: {
    create() {
      CookbookService.CreateCookbook(this.title)
        .then(({ data }) => {
          //this.displayAlerts(data)
          console.log(data)
          if (data.success) {
            this.$router.push({
              name: "CookbookEdit",
              params: { id: data.data.id }
            })
          }
        })
        .catch(err => {
          console.log(err)
         // this.displayAlerts(err)
        })
    },
    cancel() {
      this.$emit("close-modal")
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>