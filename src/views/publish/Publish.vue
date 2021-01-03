<template>
    <div class="flex flex-row">
        <div class="flex flex-col w-1/4 bg-cool-gray-600  shadow-2xl">
        
            <div class="flex flex-col w-full mt-4 ">
                <div class="h-10 flex flex-row border-b-2 border-cyan-600">
                    <h2 class="text-white font-bold leading-snug pl-2 pt-2">Recipes</h2>
                </div>
                <div class="flex flex-row">
                    <p class="shadow-inner p-2 text-sm text-cool-gray-400">Recipes demonstrate the steps needed to bla bla h blah</p>
                </div>

                <div class="flex flex-row py-1 justify-between bg-cyan-600">
                    <div class="flex pl-4">
                        <svg 
                        class="w-7 h-7 text-white"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg> 
                    </div>
                    <div class="flex items-center w-full">
                        <span class="ml-2 text-white">All Recipes</span>
                    </div>
                </div>

                <div class="flex flex-row py-1 justify-between text-cool-gray-400">
                    <div class="flex pl-4">
                        <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div class="flex items-center w-full">
                        <span class="ml-2"><router-link class="nav-item" to="/publish/recipe/new">New Recipe</router-link></span>
                    </div>
                </div>
            </div>

            <div class="flex flex-col w-full mt-4 ">
                <div class="h-10 flex flex-row border-b-2 border-cool-gray-400">
                    <h2 class="text-cool-gray-400 font-bold leading-snug pl-2 pt-2">Cookbooks</h2>
                </div>
                <div class="flex-flex-row">
                    <p class="shadow-inner p-2 text-sm text-cool-gray-400">Recipes demonstrate the steps needed to bla bla h blah</p>
                </div>
            </div>
   
        
        </div>
    
        <div class="flex flex-col h-screen w-full justify-start">

            <div class="flex flex-row h-10 mb-2 bg-gray-50  justify-center space-x-10 items-center">
                <a class="sub-nav" href="">All</a>
                <a class="sub-nav" href="">Published</a>
                <a class="sub-nav" href="">UnPublished</a>
                <a class="sub-nav" href="">In Draft</a>
                <a class="sub-nav" href="">Archived</a>
                <a class="sub-nav" href="">Metrics</a>
            </div>

            <RecipeList />

        </div>
    </div>



</template>

<script>
import RecipeList from "@/views/publish/RecipeList.vue"

export default {
    components: {
        RecipeList
    },
}
</script>


<style lang="postcss" scoped>
    .sub-nav {
        @apply text-gray-600 hover:text-gray-400 p-2;
    }

</style>