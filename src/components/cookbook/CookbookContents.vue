<template>
  <div class="flex flex-col bg-gray-50 text-gray-500 w-full p-10">
    <template v-for="section in sections" :key="section.id">
      <h3 class="font-medium border-b-2 border-rose-500 mb-2">
        {{ section.name }}
      </h3>
      <div class="flex flex-col">
        <router-link
          v-for="recipe in section.recipes"
          :key="recipe.id"
          class="flex flex-row justify-start hover:shadow-md cursor-pointer my-2"
          :to="{
            name: 'RecipeShow',
            params: { id: recipe.id },
            query: { readerMode: true }
          }"
        >
          <div class="flex w-1/4 flex-shrink-0">
            <img
              v-if="recipe.image"
              class="rounded-sm shadow-md mb-1 object-fill"
              :src="genImage(recipe.image)"
              alt=""
            />
          </div>
          <div class="flex flex-col items-center ml-3 w-auto justify-center">
            <div class="flex text-left w-full text-rose-500">
              {{ recipe.name }}
            </div>
            <div class="flex text-left w-full">
              <p class="line-clamp-3">{{ recipe.description }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </template>
  </div>
</template>
<script>
import { GenImageLink } from "@/services/cloudStorage.js"

export default {
  name: "CookbookContents",
  props: {
    sections: {
      type: Array,
      required: true
    }
  },
  methods: {
    genImage(image) {
      return GenImageLink(image)
    }
  }
}
</script>

<style lang="postcss" scoped>
.blah {
  height: 900px;
}
</style>