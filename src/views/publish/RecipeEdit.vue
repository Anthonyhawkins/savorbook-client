<template>
  <div class="flex flex-col mx-auto lg:w-4/5 w-7/8"> 
    <form @submit.prevent>
  
      <div class="flex flex-row p-2 bg-white mb-2 shadow rounded-lg justify-between space-x-3 m-2">
        <div class="flex h-10 justify-center w-2/3">
        <input 
            type="text" 
            class="title-input" 
            placeholder="Untitled"
            v-model="recipe.name"
        >
        </div>

        <div class="flex flex-row justify-between w-1/3">

          <div @click="saveRecipe()" class="round-button">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth=2 d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          </div>
          
          <div class="round-button">
            <svg class="h6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>    

        </div>
      </div>

      <Alert v-for="(error, index) in errors" :key="index" alertType="danger" :message="error"/>
      <Alert v-if="alertType == 'success'" :key="index" :alertType="alertType" :message="message"/>
      
      <div class="flex flex-row h-screen justify-end mx-2 mb-2 shadow rounded-lg">
        <div class="flex flex-col overflow-y-scroll bg-white w-2/3 p-5 rounded-l-lg">

          <label for="description" class="this-label">Photo</label>
          <ImageSelector 
            v-if="recipe.image" 
            :allowCrop="false" 
            :existingImage="recipe.image" 
            imageFor="recipeImage" 
            @image-selected="setRecipeImage"
          />
          <ImageSelector 
            v-else imageFor="recipeImage" 
            @image-selected="setRecipeImage"
          />

          <label for="description" class="this-label">Description</label>
          <RecipeDescription v-model="recipe.description"/>
          <IngredientsToolBar/>

          <div class="flex flex-col">
            <template
            v-for="(group, index) in recipe.ingredientGroups" 
            :key="group.id" 
            >
              <IngredientGroup
                :groupIndex="index" 
                :ingredientGroup="group"
              />
            </template>
          </div>

          <div class="flex flex-col">
            <label for="description" class="this-label">Steps</label>
            <template v-for="(step, index) in recipe.steps">
              <StepText
              v-if="step.type === 'text'"
              :stepIndex="index"
              :step="step"
              :key="index + step.text"
              draggable="true"
              @dragstart="pickupStep($event, index)"
              @dragover.prevent
              @dragenter.prevent
              @drop="moveStep($event, index)"
              />
              <StepTip
              v-if="step.type === 'tipText'"
              :stepIndex="index"
              :step="step"
              :key="index + step.text"
              draggable="true"
              @dragstart="pickupStep($event, index)"
              @dragover.prevent
              @dragenter.prevent
              @drop="moveStep($event, index)"
              />
              <StepImageSingle
              v-if="['imageLeft', 'imageRight'].includes(step.type)"
              :stepIndex="index"
              :step="step"
              :key="index + step.id"
              draggable="true"
              @dragstart="pickupStep($event, index)"
              @dragover.prevent
              @dragenter.prevent
              @drop="moveStep($event, index)"
              />
              <StepImageDouble
              v-if="step.type === 'imageDouble'"
              :stepIndex="index"
              :step="step"
              :key="index + step.id"
              draggable="true"
              @dragstart="pickupStep($event, index)"
              @dragover.prevent
              @dragenter.prevent
              @drop="moveStep($event, index)"
              />
              <StepImageTriple
              v-if="step.type === 'imageTriple'"
              :stepIndex="index"
              :step="step"
              :key="index + step.id"
              draggable="true"
              @dragstart="pickupStep($event, index)"
              @dragover.prevent
              @dragenter.prevent
              @drop="moveStep($event, index)"
              />
            </template>
            <StepHint/> 
          </div>
        </div>
        <StepTemplates/>
      </div>
    </form>
  </div>
</template>

<script>
  import store from "@/store"
  import { mapGetters } from "vuex";
  import { RecipeService } from "@/services/apiService.js"
  import ImageSelector from "@/components/ImageSelector.vue"
  import Alert from "@/components/Alert.vue"
  import {
    RecipeDescription,
    IngredientsToolBar,
    IngredientGroup
  } from "@/components/publish/recipe"

  import { 
    StepTemplates, 
    StepHint, 
    StepText, 
    StepTip, 
    StepImageSingle,
    StepImageDouble,
    StepImageTriple 
  } from "@/components/publish/recipe/steps"

  export default {
    components: {
      Alert,
      RecipeDescription,
      IngredientsToolBar,
      IngredientGroup,
      StepTemplates,
      ImageSelector,
      StepHint,
      StepText,
      StepTip,
      StepImageSingle,
      StepImageDouble,
      StepImageTriple
    },
    async beforeRouteEnter(to, from, next) {
      await store.dispatch('resetRecipe')
      if (to.name === 'RecipeEdit') {
        await store.dispatch('getRecipe', to.params.id)
      } 
      return next()
    },
    data(){
      return {
        alertType: null,
        message: "",
        errors: []
      }
    },
    computed: {
      ...mapGetters(["recipe"]),
      actionType(){
        if (this.$route.name === "RecipeEdit") {
          return "update"
        }
        return "create"
      },
    },
    methods: {
      displayAlerts(data){
        if (!data.success){
          this.message = "Recipe Unable to be Saved."
          this.errors = data.errors
        }
      },
      setRecipeImage(e){
        this.$store.dispatch('setRecipeImage', e.src)
      },
      mounted() {
        console.log(this.recipe)
      },
      saveRecipe () {
        this.errors = []
        if (this.actionType === "create") {
          RecipeService.createRecipe(this.recipe)
          .then(({ data }) => {
            this.displayAlerts(data)
            if (data.success){
              this.$router.push({ name: 'RecipeEdit', params: { id: data.data.id }})
            }  
          })
        } else {
          RecipeService.updateRecipe(this.recipe)
          .then(({ data }) => {
            this.displayAlerts(data)  
          })
        }
      },

      pickupStep(e, index){
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.dropEffect = 'move'
        e.dataTransfer.setData('from-step-index', index)
      },

      moveStep(e, toStepIndex){
        const fromStepIndex = e.dataTransfer.getData('from-step-index')
        this.$store.dispatch('moveStep', {
          fromStepIndex,
          toStepIndex
        })
      }
    } 
  }
</script>

<style lang="postcss" scoped>
  .this-label {
    @apply font-medium text-red-500 mb-2 mt-5;
  }

  .title-input {
    @apply h-full px-5 placeholder-gray-400 text-red-500 bg-white focus:outline-none focus:ring font-medium text-lg w-full;
  }

  .round-button {
    @apply flex h-10 w-10 rounded-full border border-gray-200 text-rose-500 bg-white justify-center items-center hover:bg-rose-500 hover:text-white shadow cursor-pointer
  }
</style>