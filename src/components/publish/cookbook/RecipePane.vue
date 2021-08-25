<template>
  <div class="flex flex-col flex-shrink-0 h-screen w-96 bg-white p-2 space-y-2">
    <div class="flex flex-col mb-2">
      <input
        @keyup="searchRecipes()"
        name="search-field"
        v-model="searchString"
        type="text"
        class="h-12 outline-none border-b border-rose-500"
        placeholder="search by name or #tag..."
      />
    </div>

    <draggable
      :list="recipes"
      @start="drag = true"
      @end="drag = true"
      :group="{ name: 'recipes', pull: 'clone', put: false }"
      item-key="id"
      class="flex flex-col overflow-y-scroll"
    >
      <template #item="{element}">
        <RecipeCard
          :name="element.name"
          :recipeId="element.id"
          :tags="element.tags"
        />
      </template>
    </draggable>
    <button
      v-if="allowMore"
      @click="loadMore()"
      class="h-8 px-2 my-3 mx-auto rounded-md bg-gray-200 hover:bg-gray-300 font-medium text-white block"
    >
      LOAD MORE
    </button>
  </div>
</template>
<script>
import { RecipeService } from "@/services/apiService.js"
import RecipeCard from "@/components/publish/cookbook/RecipeCard.vue"
import draggable from "vuedraggable"

export default {
  name: "RecipePane",
  components: {
    RecipeCard,
    draggable
  },
  data() {
    return {
      searchString: "",
      page: 1,
      pageSize: 50,
      showFilter: false,
      showTags: false,
      recipes: [],
      tags: [],
      searchTags: [],
      selectedTag: "",
      allowMore: true
    }
  },
  mounted() {
    this.getRecipes()
    RecipeService.getTags()
      .then(response => {
        this.tags = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    searchRecipes() {
      // search on tags
      if (this.searchString.startsWith("#")) {
        this.searchTags = this.searchString.replace(/#/g, " ").split(" ")
        this.searchTags = this.searchTags.filter(function(el) {
          return el != ""
        })
        // Search on Name
      } else if (this.searchString.length % 2) {
        this.searchTags = []
      } else if (this.searchString == "") {
        this.searchTags = []
      } else {
        return null
      }
      this.recipes = []
      this.getRecipes()
      this.searchTags = []
    },
    getRecipes() {
      RecipeService.getRecipes(
        this.page,
        this.pageSize,
        this.searchTags,
        this.searchString
      )
        .then(response => {
          if (response.data.data.length == 0) {
            this.allowMore = false
          } else {
            this.recipes = this.recipes.concat(response.data.data)
            this.allowMore = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadMore() {
      this.page++
      this.getRecipes()
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
