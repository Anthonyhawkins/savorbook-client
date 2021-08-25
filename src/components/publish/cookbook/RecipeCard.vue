<template>
  <div
    class="flex flex-col bg-white border-gray-200 border border-b-2 shadow-sm p-2 mb-2 rounded hover:shadow-md"
  >
    <div class="flex flex-row justify-between">
      <div class="flex">
        <router-link
          data-testid="recipe-name"
          class="text-rose-500 block"
          :to="{ name: 'RecipeShow', params: { id: recipeId } }"
          target="_blank"
          >{{ name }}
        </router-link>
      </div>
      <div
        v-if="index != null"
        @click="removeRecipe()"
        class="flex cursor-pointer"
      >
        <svg class="h-5 text-gray-200  hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
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
    },
    index: {
      type: Number,
      default: null
    }
  },
  methods: {
    removeRecipe() {
      this.$emit("remove-recipe", this.index)
    }
  }
}
</script>

<style lang="postcss" scoped>
.tag {
  @apply mr-1 mb-1 rounded-sm  px-1  text-gray-400 text-sm;
}
</style>
