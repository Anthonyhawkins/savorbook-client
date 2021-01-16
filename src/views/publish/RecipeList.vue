<template>

    <div class="flex flex-col p-5">

        <div class="flex flex-row p-2 bg-white mb-2 shadow rounded-lg justify-between space-x-3">
          <div class="flex h-10 px-4 rounded-md border border-gray-200 justify-center items-center bg-rose-500 text-white">
            <h2 class="font-medium">RECIPES</h2>
          </div>

          <router-link :to="{ name: 'RecipeNew'}">
            <div class="flex h-10 w-10 rounded-full border border-gray-200 text-rose-500 bg-white-200 justify-center items-center hover:bg-rose-500 hover:text-white shadow">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </router-link>
        </div>
        <table class="table-fixed shadow-md rounded-md mt-3">
          <thead class=" text-rose-500 bg-white">
            <th class=" rounded-tl-md font-normal py-2">Name</th>
            <th class=" w-16 font-normal">State</th>
            <th class=" w-1/3 font-normal">Tags</th>
            <th class=" rounded-tr-md w-12 font-normal">
            </th>
          </thead>
          <tbody class="bg-white">
        <RecipeListItem 
        v-for="(recipe, index) in recipes" 
        :key="index" 
        :recipeName="recipe.name"
        :recipeId="recipe.id"/>
          </tbody>
        </table>

    </div>
</template>

<script>
import RecipeListItem from "@/components/publish/recipe/RecipeListItem.vue"
import { RecipeService } from '@/services/apiService.js'

export default {
    name: "RecipeList",
    components: {
        RecipeListItem
    },
    data(){
        return {
            recipes: []
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
  }
}
</script>


<style lang="postcss" scoped>

</style>