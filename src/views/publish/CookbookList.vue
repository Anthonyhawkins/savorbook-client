<template>
  <div class="flex flex-col p-5">
    <div
      class="flex flex-row p-2 bg-white mb-2 shadow rounded-lg justify-between space-x-3"
    >
      <div
        class="flex h-10 px-4 rounded-md border border-gray-200 justify-center items-center bg-rose-500 text-white"
      >
        <h2 class="font-medium">Cookbooks</h2>
      </div>
      <div class="flex space-x-3">
        <div
          @click="toggleModal()"
          class="flex h-10 w-10 rounded-full border border-gray-200 text-rose-500 bg-white-200 justify-center items-center hover:bg-rose-500 hover:text-white shadow cursor-pointer"
        >
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>
    </div>

    <template v-if="cookbooks">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center mx-auto"
      >
        <CookbookListItem
          v-for="cookbook in cookbooks"
          :key="cookbook.id"
          :id="cookbook.id"
          :title="cookbook.title"
          :subTitle="cookbook.subTitle"
          :blurb="cookbook.blurb"
          :image="cookbook.image"
          :published="false"
          :sections="cookbook.sections"
        />
      </div>
    </template>

    <template v-else>
      <div
        class="flex bg-white w-2/5 mx-auto mt-10 rounded-md p-5 text-rose-500"
      >
        <p class="text-center w-full">
          No Cookbooks.
        </p>
      </div>
    </template>
  </div>

  <NewCookbookModal v-if="showModal" @close-modal="toggleModal()" />
</template>

<script>
import { CookbookService } from "@/services/apiService.js"
import NewCookbookModal from "@/components/publish/cookbook/NewCookbookModal.vue"
import CookbookListItem from "@/components/publish/cookbook/CookbookListItem.vue"

export default {
  name: "CookbookList",
  components: {
    NewCookbookModal,
    CookbookListItem
  },
  data() {
    return {
      page: 1,
      pageSize: 50,
      cookbooks: [],
      allowMore: true,
      showModal: false
    }
  },
  mounted() {
    this.getCookbooks()
  },
  methods: {
    getCookbooks() {
      CookbookService.getCookbooks(this.page, this.pageSize, this.searchTags)
        .then(response => {
          if (response.data.data.length == 0) {
            this.allowMore = false
          } else {
            this.cookbooks = this.cookbooks.concat(response.data.data)
            this.allowMore = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    toggleModal() {
      this.showModal = this.showModal ? false : true
    },
    loadMore() {
      this.page++
      this.getCookbooks()
    }
  }
}
</script>

<style lang="postcss" scoped>
.tag {
  @apply mr-1 mb-1 rounded-sm  px-2  hover:bg-rose-500 hover:text-white text-rose-500 text-sm font-medium cursor-pointer;
}

</style>
