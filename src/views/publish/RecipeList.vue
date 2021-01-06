<template>

    <div class="flex flex-col">
        <RecipeListItem 
        v-for="(recipe, index) in recipes" 
        :key="index" 
        :recipeName="recipe.name"
        :recipeId="recipe.id"/>


    </div>
</template>

<script>
import RecipeListItem from "@/components/publish/RecipeListItem.vue"
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