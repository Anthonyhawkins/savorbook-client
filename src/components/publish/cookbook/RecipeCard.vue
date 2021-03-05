<template>
  <div
    class="flex flex-col bg-white border-gray-200 border border-b-2 shadow-sm p-2 mb-2 rounded hover:shadow-md"
  >
    <div class="flex">
      <router-link
        data-testid="recipe-name"
        class="text-rose-500 block"
        :to="{ name: 'RecipeShow', params: { id: recipeId } }"
        target="_blank"
        >{{ name }}
      </router-link>
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(tag, index) in tags"
        :key="tag + index"
        data-testid="recipe-tag"
        class="tag"
      >
        #{{ tag }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeCard",
  props: {
    name: {
      type: String,
      required: true
    },
    recipeId: {
      type: Number,
      required: true
    },
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.tag {
  @apply mr-1 mb-1 rounded-sm  px-1  text-gray-400 text-sm;
}
</style>
