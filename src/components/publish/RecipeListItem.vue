<template>
    <div class="flex flex-col justify-between mx-2 border-b border-gray-50">
        <div class="flex flex-col  bg-white p-2 shadow-md hover:bg-gray-50 cursor-pointer">
            <div class="flex flex-row justify-between">
                <div class="flex place-items-center">
                    <h1 class="leading-snug align-middle">
                        <router-link  class="text-red-500" :to="{ name: 'RecipeShow', params: { id: recipeId }}">{{recipeName}}</router-link>
                    </h1>
                </div>
                <div class="flex flex-row justify-end">
                    <div class="flex justify-between text-gray-400 place-items-center">
                        <span class="px-1  uppercase text-sm font-medium text-lime-500">{{publishState}}</span>
                    </div>
                </div>
            </div>
            <div class="justify-end flex flex-wrap pt-2">
                <div class="tag" v-for="tag in recipeTags" :key="tag">
                    {{tag}}
                </div>

            </div>
        </div>
    </div> 
</template>

<script>
export default {
    name: "RecipeListItem",
    props: {
        recipeName: {
            type: [String],
            required: true
        },
        recipeId: {
            type: [Number],
            required: true
        },
        publishState: {
            type: [String],
            default: "Published"
        },
        recipeTags: {
            type: [Array],
            default(){
                return ['one', 'two', 'three']
            }
        }
    }
}
</script>

<style lang="postcss" scoped>
    .tag {
        @apply mr-1 mb-1 rounded-md py-1 px-2 bg-gray-100  text-gray-500 text-sm cursor-pointer
    }
</style>