<template>
    <template v-for="parentRecipe in recipe.parentRecipes" :key="parentRecipe.id">
      <router-link :to="{ name: 'RecipeShow', params: { id: parentRecipe.id }}">
        <div @click="navigate" class="flex flex-col text-sm rounded-md bg-gray-50 text-gray-400 hover:bg-rose-300 hover:text-white font-serif px-3 py-1 mb-1 justify-between">
          <div class="flex justify-center">
            <p>Required to make:  
              <span class="text-center font-bold">{{parentRecipe.name}}</span>
            </p>
          </div>
        </div>
      </router-link>
    </template>
  <div class="flex flex-col">
    <div class="flex mb-3">
      <p class="text-sm text-gray-400">Great for more complex recipes. A good exmaple is if this was a Lasagna Recipe, 
        Dependent Recipes would be a Bolognese Sauce, Fresh Pasta, and Bachemal Sauce. 
      </p>
    </div>

    <div v-for="dependentRecipe in recipe.dependentRecipes" :key="dependentRecipe.id" class="flex flex-row rounded-sm shadow-sm bg-rose-500 text-white px-3 py-1 mb-1 justify-between">
      <div class="flex">
        <span class="font-medium w-3 text-right">{{dependentRecipe.qty}}</span>
        <span v-if="dependentRecipe.qty > 1" class="text-rose-100 mx-2">batches of</span>
        <span v-else class="text-rose-100 mx-2 mr-6">batch of</span>  
        <span class="font-medium">{{dependentRecipe.name}}</span>
      </div>
      <div @click="removeDependentRecipe(dependentRecipe)" class="flex">
        <svg class="h-6 w-6 hover:text-rose-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
    <Alert v-for="(error, index) in errors" :key="index" alertType="danger" :message="error"/>
    <div class="relative">
      <div class="flex mt-2 space-x-1">
        <input @keyup="getSuggestions(recipeName)" v-model="recipeName" class="w-8/12 text-gray-500 h-8 border-b border-gray-200 focus:outline-none focus:ring px-2" type="text" placeholder="recipe name...">
        <input v-model="recipeQty" class="w-3/12 text-gray-500 h-8 border-b border-gray-200 focus:outline-none focus:ring px-2 text-center" type="text" placeholder="batch qty">
        <button @click="addDependentRecipe()" class="w-1/12  text-rose-500 rounded-md pl-2 hover:text-rose-600">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <div v-if="displaySuggestions" class="flex flex-row w-8/12 bg-red-200 rounded-b-md shadow-lg absolute top-10 overflow-auto h-auto max-h-32">
        <ul class="rounded-b-md w-full">
          <li 
            v-for="suggestion in suggestions" :key="suggestion.id"
            @click="selectSuggestion(suggestion)" 
            class="bg-white border-t border-gray-200 pl-2 py-1 text-rose-500 font-medium hover:bg-rose-500 hover:text-white select-none" 
          >
            {{suggestion.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import { RecipeService } from "@/services/apiService.js"
  import Alert from "@/components/Alert.vue"

  export default {
    name: "DependentRecipes",
    components :{
      Alert,
    },
    data() {
      return {
        recipeName: "",
        recipeQty: "",
        recipeId: 0,
        suggestions: [],
        errors: []
      }
    },
    methods: {
      getSuggestions(input){

        /**
         * Help reduce DB calls by only searching every 
         * other key press after 2
         */
        if (input.length > 2 && input.length % 2){
          RecipeService.getRecipesLike(input)
          .then(response => {
            console.log(response.data)
            if (response.data.success) {
              this.suggestions = response.data.data
              console.log(this.suggestions)
            }
          })
          .catch(error => {
            console.log(error)
          })
        }
        
      },
      selectSuggestion(suggestion){
        this.recipeName = suggestion.name
        this.recipeId = suggestion.id
        this.suggestions = []
      },
      addDependentRecipe(){

        for (const dependent of this.recipe.dependentRecipes){
          if (this.recipeName === dependent.name){
            this.errors.push("That recipe is already listed as a dependency.")
            return false
          }
        }

        if (this.recipeQty < 1){
          this.errors.push("You must specify how many batches of this recipe are needed.")
          return false
        }

        if (this.recipeId == this.$route.params.id){
          this.errors.push("A recipe cannot be dependent upon itself.")
          return false
        }

        const dependency = {
          id: this.recipeId,
          name: this.recipeName,
          qty: this.recipeQty
        }
        this.$store.dispatch('addDependentRecipe', dependency)
        this.recipeId = 0
        this.recipeName = ""
        this.recipeQty = ""
        console.log(this.recipe)
      },
      removeDependentRecipe(dependency){
        this.$store.dispatch('removeDependentRecipe', dependency)
      }
    },
    computed: {
      ...mapGetters(["recipe"]),
      displaySuggestions(){
        if (this.suggestions.length > 0) {
          return true
        }
        return false
      }
    },
  }
</script>

<style lang="postcss" scoped>

</style>