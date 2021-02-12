<template>
  <div class="flex flex-row justify-between">
    <div class="flex">
      <label for="description" class="this-label">Ingredients</label>
    </div>
    <div class="flex flex-col justify-end">
      <button
        class="w-full text-gray-700 bg-white border border-solid border-gray-700 hover:bg-gray-700 hover:text-white font-bold uppercase text-xs px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
        @click="addGroup()"
      >
        Add Grouping
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "IngredientsToolBar",
  methods: {
    addGroup() {
      this.$store.dispatch("addIngredientGroup")
    }
  }
}
</script>

<style lang="postcss" scoped>
.this-label {
  @apply font-medium text-red-500 mb-2 mt-5;
}
</style>
