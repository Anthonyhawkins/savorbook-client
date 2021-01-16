<template>
    <div class=" lg:container mx-auto lg:w-4/5 text-gray-600 my-3">
        
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
                    <p class="text-lg mb-4">{{recipe.description}}</p>
                    <h1 class="text-rose-500 text-xl mb-4">Steps</h1>

                    <template v-for="step in recipe.steps" :key="step">
                        <p v-if="step.type === 'text'" class="mb-3">{{step.text}}</p>
                        <p v-if="step.type === 'tipText'" class="py-2 border-b border-t border-rose-500 mb-3">{{step.text}}</p>
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
    ...mapGetters(["recipe"])
  },
}
</script>

<style lang="postcss" scoped>

</style>