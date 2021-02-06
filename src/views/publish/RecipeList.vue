<template>

    <div class="flex flex-col p-5">

        <div class="flex flex-row p-2 bg-white mb-2 shadow rounded-lg justify-between space-x-3">
          <div class="flex h-10 px-4 rounded-md border border-gray-200 justify-center items-center bg-rose-500 text-white">
            <h2 class="font-medium">RECIPES</h2>
          </div>
          <div class="flex space-x-3">
            <div @click="toggleTags()" class="flex h-10 w-10 rounded-full border border-gray-200 text-rose-500 bg-white-200 justify-center items-center hover:bg-rose-500 hover:text-white shadow cursor-pointer">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div @click="toggleFilter()" class="flex h-10 w-10 rounded-full border border-gray-200 text-rose-500 bg-white-200 justify-center items-center hover:bg-rose-500 hover:text-white shadow cursor-pointer">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <router-link :to="{ name: 'RecipeNew'}">
              <div class="flex h-10 w-10 rounded-full border border-gray-200 text-rose-500 bg-white-200 justify-center items-center hover:bg-rose-500 hover:text-white shadow">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </router-link>
          </div>
        </div>
        <div v-if="showTags" class="flex flex-col p-2 bg-white mb-2 shadow rounded-lg justify-between space-x-3">
          <div class="flex flex-row flex-wrap justify-right">
              <svg class="h-6 w-6 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            <div 
            @click="filterByTags([])"
            class="mx-2 tag">
                all
            </div>
            <div 
            @click="filterByTags([tag])"
            class="tag" v-for="tag in tags" :key="tag">
                #{{tag}}
            </div>
          </div>
        </div>
        <div v-if="showFilter" class="flex flex-row p-2 bg-white mb-2 shadow rounded-lg  space-x-3">
          <div class="flex w-10">
            <svg class="h-6 w-6  text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <div class="flex flex-col w-full justify-between">
            <TagInput 
            placeholder="filter by tags..."
            @tags-updated="filterByTags"
            :tags="tagFilters"
            />
          </div>
        </div>
        <template v-if="recipes">
          <table class="table-fixed shadow-md rounded-md">
            <thead class=" text-rose-500 bg-white">
              <th class=" rounded-tl-md font-normal py-2">Name</th>
              <th class=" w-16 font-normal">State</th>
              <th class=" w-1/2 font-normal">Tags</th>
              <th class=" rounded-tr-md w-12 font-normal">
              </th>
            </thead>
            <tbody class="bg-white">
              <RecipeListItem 
                v-for="(recipe, index) in recipes" 
                :key="index" 
                :recipeName="recipe.name"
                :recipeId="recipe.id"
                :tags="recipe.tags"
                @tag-selected="setTag"
              />
            </tbody>
          </table>
        </template>
        <template v-else>
          <div class="flex bg-white w-2/5 mx-auto mt-10 rounded-md p-5 text-rose-500">
            <p class="text-center w-full">
              No Recipes.
            </p>
          </div>
        </template>

    </div>
</template>

<script>
  import RecipeListItem from "@/components/publish/recipe/RecipeListItem.vue"
  import { RecipeService } from '@/services/apiService.js'
  import TagInput from "@/components/publish/TagInput.vue"

  export default {
      name: "RecipeList",
      components: {
        RecipeListItem,
        TagInput
      },
      data(){
        return {
          showFilter: false,
          showTags: false,
          recipes: [],
          tags: [],
          selectedTag: ""
        }
      },
    mounted() {
      RecipeService.getRecipes()
        .then(response => {
          this.recipes = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
      RecipeService.getTags()
        .then(response => {
          this.tags = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    methods: {
      filterByTags(tags){
         RecipeService.getRecipesByTags(tags)
          .then(response => {
            this.recipes = response.data.data
          })
          .catch(error => {
            console.log(error)
          }) 
      },
      toggleTags(){
        if (this.showTags) {
          this.showTags = false
        } else {
          this.showTags = true
        }
      },
      toggleFilter(){
        if (this.showFilter) {
          this.showFilter = false
        } else {
          this.showFilter = true
        }
      },
      setTag(tag){
        this.selectedTag = "#"+tag
        this.filterByTags([tag])
      }
    }
  }
</script>


<style lang="postcss" scoped>
  .tag {
      @apply mr-1 mb-1 rounded-sm  px-2  hover:bg-rose-500 hover:text-white text-rose-500 text-sm font-medium cursor-pointer
  }
</style>