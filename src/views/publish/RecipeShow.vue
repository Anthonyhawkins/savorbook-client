<template>
    <div class="mx-auto lg:w-4/5 max-w-screen-lg text-gray-600 my-3">
        
        <div class="flex flex-row p-2 bg-gray-50 mb-2 shadow rounded-lg justify-center space-x-3">
          <router-link :to="{ name: 'RecipeEdit', params: { id: recipe.id }}">
            <div class="flex h-10 w-10 rounded-full border border-gray-200 text-rose-500 bg-white-200 justify-center items-center hover:bg-rose-500 hover:text-white shadow">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </router-link>
        </div>
        
        <div class="flex flex-col bg-gray-50 lg:flex-row h-full pt-4 shadow rounded-lg">
            <div class="flex flex-col lg:w-2/6 px-16">
                <h2 class="text-xl uppercase mb-4">Ingredients</h2>
                <template v-for="group in recipe.ingredientGroups" :key="group">
                    <h3 class="font-medium">{{group.groupName}}</h3>
                    <ul class="font-serif mb-3">
                        <li 
                        class="mt-2"
                        v-for="item in group.ingredients" :key="item">{{item.qty}} {{item.unit}} {{item.name}}</li>
                    </ul>
                </template>
            </div>
            <div class="flex flex-col lg:w-4/6 px-10 lg:pr-10 pb-4">
              <h1 class="text-rose-500 uppercase text-2xl mb-4">{{recipe.name}}</h1>
              
              <img class="rounded-sm shadow-md" :src="recipe.image" alt="">
              <p class="my-4 has-dropcap text-justify">{{recipe.description}}</p>
              <h1 class="text-rose-500 text-xl mb-4">Steps</h1>

              <template v-for="(step, index) in recipe.steps" :key="step">
                <div>
                  
                  
                  <template v-if="step.type === 'text'">

                    <div :tabindex="index" class="step-focus flex flex-row">
                      <div class="flex ">
                        <div class="step w-3">{{stepMap[step.id]}}</div>
                      </div>
                      <div class="flex">
                        <p class="mb-3 text-justify">{{step.text}}</p>
                      </div>                            
                    </div>
                    
                  </template>
                  
                  
                  <p v-if="step.type === 'tipText'" :tabindex="index" class="ml-4 text-justify step-focus py-2 border-b border-t border-rose-500 mb-3 font-medium">{{step.text}}</p>

                  <template v-if="step.type === 'imageLeft'">
                    <div :tabindex="index" class="flex step-focus my-12">                            
                      <img class="object-contain w-1/2 float-left rounded-sm shadow-md ml-4 mr-3" :src="step.images[0].src" alt="">                              
                      <p v-if="step.images[0].text" class="py-3 border-b border-t border-rose-500 font-medium text-xs text-rose-500 place-self-center">{{step.images[0].text}}</p>
                    </div>
                  </template>

                  <template v-if="step.type === 'imageRight'">
                    <div :tabindex="index" class="flex step-focus my-12">
                      <p v-if="step.images[0].text" class="py-3 border-b border-t border-rose-500 text-right font-medium text-xs text-rose-500 ml-4 place-self-center">{{step.images[0].text}}</p>
                      <img class="object-contain w-1/2 float-left rounded-sm shadow-md ml-3" :src="step.images[0].src" alt="">                              
                    </div>
                  </template>

                  <template v-if="step.type === 'imageDouble'">
                    <div :tabindex="index" class="flex flex-row space-x-2 step-focus ml-4  my-12">
                      <div class="flex flex-col w-1/2">
                        <img class="object-contain rounded-sm shadow-md mb-1" :src="step.images[0].src" alt="">                              
                        <p v-if="step.images[0].text" class="w-full text-center py-3 border-b border-rose-500 font-medium text-xs text-rose-500 ml-4 place-self-center">{{step.images[0].text}}</p>
                      </div>
                      <div class="flex flex-col w-1/2">
                        <img class="object-contain rounded-sm shadow-md mb-1" :src="step.images[1].src" alt="">                              
                        <p v-if="step.images[1].text" class="w-full text-center py-3 border-b border-rose-500 font-medium text-xs text-rose-500 ml-4 place-self-center">{{step.images[1].text}}</p>
                      </div>
                    </div>

                  </template>

                </div>
              </template>
          </div>
        </div>  
  </div>  
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store"
export default {
  beforeRouteEnter(to, from, next) {
    Promise.all([
        store.dispatch('getRecipe', to.params.id),
    ]).then(() => {
        next();
    });
  },
  computed: {
    ...mapGetters(["recipe"]),
    stepMap(){
      let stepMap = {}
      let stepNum = 1
      this.recipe.steps.forEach(step => {
        if (step.type === 'text'){
          stepMap[step.id] = stepNum
          stepNum++
        }
      })
    return stepMap
    }
  },
}
</script>

<style lang="postcss" scoped>
.has-dropcap:first-letter {
  font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
  float: left;
  font-size: 6rem;
  line-height: 0.65;
  margin: 0.1em 0.1em 0.2em 0;
  @apply text-rose-500;
}

.step {
  font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
  float: left;
  font-size: 1.5rem;
  line-height: 0.95;
  margin: 0.2em 0.2em 0.2em 0;
  @apply text-rose-500;
}

.step-focus:focus {
  @apply bg-rose-50 border-0 outline-none
}

</style>