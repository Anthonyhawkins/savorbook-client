<template>

    <div class="flex flex-col p-5">

        <h2 class="font-medium text-rose-500">RECIPES</h2>

        <table class="table-fixed shadow-md rounded-md mt-3">
          <thead class=" text-rose-500 bg-white">
            <th class=" rounded-tl-md font-normal py-2">Name</th>
            <th class=" w-16 font-normal">State</th>
            <th class=" w-1/3 font-normal">Tags</th>
            <th class=" rounded-tr-md w-12 font-normal">
              <div class="flex flex-row justify-center">
                <router-link :to="{name: 'RecipeNew'}">
                <div class="px-2 shadow-sm rounded-md bg-lime-500 text-white border-white hover:bg-lime-600">
                  New
                </div>
                </router-link>
              </div>
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
        this.recipes = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>


<style lang="postcss" scoped>

</style>