<template>
    <div class=" lg:container mx-auto bg-gray-50 lg:w-4/5 text-gray-600 my-3 shadow-md rounded-lg">
        <div class="flex flex-col lg:flex-row h-full pt-4">
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