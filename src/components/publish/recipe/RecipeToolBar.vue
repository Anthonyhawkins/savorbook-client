<template>
    <div class="flex flex-row w-1/3 justify-between">
        <button class="button save-button" type="submit" @click="$emit('save-recipe')">
            Save
        </button>
        <button class="button discard-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: "RecipeToolBar"
}
</script>

<style lang="postcss" scoped>
    .save-button {
        @apply  m-1 w-20
    }

    .discard-button {
        @apply  text-red-600 border-0 m-1 w-20 hover:bg-red-400 hover:text-white
    }
</style>