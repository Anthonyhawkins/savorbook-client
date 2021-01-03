<template>
    <div class="flex flex-col justify-between mx-2 border-b border-gray-200 space-x-9">
        <div class="flex flex-col  bg-white p-2 shadow-md">
            <div class="flex flex-row justify-between">
                <div class="flex place-items-center">
                    <h1 class="font-medium leading-snug align-middle">
                        <a class=" text-red-500 hover:text-red-300" href="">
                            {{recipeName}}
                        </a>
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
        @apply mr-1 mb-1 rounded-lg py-1 px-2 bg-red-500  text-blue-gray-50 text-sm cursor-pointer
    }
</style>