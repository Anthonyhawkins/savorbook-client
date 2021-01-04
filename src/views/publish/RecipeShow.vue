<template>
    <div class="container mx-auto bg-gray-50 w-4/5 text-gray-600 my-3 shadow-lg">
        <div class="flex flex-row h-full pt-4">
            <div class="flex flex-col  w-2/6 px-10">
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
            <div class="flex flex-col w-4/6 pr-10 pb-4">
                    <h1 class="text-red-400 uppercase text-xl mb-4">{{recipe.name}}</h1>
                    <p class="text-lg mb-4">{{recipe.description}}</p>
                    <h1 class="text-red-400 text-xl mb-4">Steps</h1>


                    <template v-for="step in recipe.steps" :key="step">
                        <p v-if="step.type === 'text'" class="mb-3">{{step.content.text}}</p>
                        <p v-if="step.type === 'tipText'" class="py-2 border-b border-t border-red-400 mb-3">{{step.content.text}}</p>
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