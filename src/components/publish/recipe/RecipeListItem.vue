<template>

  <tr class="border-t border-gray-200 hover:bg-warm-gray-100">
    <td class="recipe-cell tx-sm">
      <router-link  v-if="recipeName" class="text-gray-500 block" :to="{ name: 'RecipeShow', params: { id: recipeId }}">{{recipeName}}</router-link>
      <router-link  v-else class="text-gray-500 block" :to="{ name: 'RecipeShow', params: { id: recipeId }}">Untitled</router-link>

    </td>
    <td class="recipe-cell px-1 text-sm font-normal text-lime-500">
      {{publishState}}
    </td>
    <td class="recipe-cell">
      <div class="flex flex-row flex-wrap justify-right">
        <div 
          @click="setTag(tag)"
          class="tag" v-for="tag in tags" :key="tag">
            #{{tag}}
        </div>
      </div>
    </td>
    <td class="recipe-cell text-sm font-medium text-light-blue-500 hover:text-blue-gray-500 items-center">
      <router-link :to="{ name: 'RecipeEdit', params: { id: recipeId }}">
        Edit
      </router-link>
    </td>
  </tr>
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
      default: "published"
    },
    tags: {
      type: [Array],
      default(){
        return []
      }
    }
  },
  methods: {
    setTag(tag){
      this.$emit('tag-selected', tag)
    }
  }
}
</script>

<style lang="postcss" scoped>
  .tag {
      @apply mr-1 mb-1 rounded-sm  px-1  hover:bg-rose-500 hover:text-white text-rose-500 text-sm font-medium cursor-pointer
  }
  .recipe-cell {
    @apply px-5 py-2 
  }

</style>