<template>
  <div class="flex flex-col shadow rounded-sm hover:shadow-lg">
    <router-link 
      :to="{ name: 'CookbookShow', params: { id: id } }"
      class="flex bg-gray-50 h-72 w-72 relative"
    >
      <img
        v-if="image"
        class="object-contain h-full w-full rounded-sm shadow-md mb-1"
        :src="coverPhoto"
        alt=""
      />
      <div
        v-if="published"
        class="bg-lime-600 bg-opacity-60 absolute top-0 right-0 text-white p-1"
      >
        Published
      </div>
      <div
        v-else
        class="bg-amber-600 bg-opacity-60 absolute top-0 right-0 text-white p-1"
      >
        Unpublished
      </div>
      <div class="bg-gray-800 bg-opacity-60 absolute bottom-0 w-full p-3">
        <h2 class="text-white text-center font-medium text-xl">
          <!-- TODO - Go to Preview Page -->
          <router-link :to="{ name: 'CookbookEdit', params: { id: id } }">
            {{ cookbookTitle }}
          </router-link>
        </h2>
        <p class="text-white text-center">
          {{ subTitle }}
        </p>
      </div>
    </router-link>
    <div class="flex flex-row bg-white p-2 justify-between">
      <div class="flex">
        <router-link :to="{ name: 'CookbookShow', params: { id: id } }">
          <svg class="h-6 text-gray-400 hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </router-link>
      </div>
      <div class="flex text-sm text-gray-500">
        <template v-if="numRecipes > 1">{{ numRecipes }} Recipes </template>
        <template v-else-if="numRecipes === 1"
          >{{ numRecipes }} Recipe
        </template>
        <template v-else> No Recipes </template>
      </div>
      <div class="flex">
        <router-link :to="{ name: 'CookbookEdit', params: { id: id } }">
          <svg class="h-6 text-gray-400 hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { GenImageLink } from "@/services/cloudStorage.js"

export default {
  name: "CookbookListItem",
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: true
    },
    blurb: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    published: {
      type: Boolean,
      required: true
    },
    sections: {
      type: Array,
      required: true
    }
  },
  computed: {
    numRecipes() {
      let numRecipes = 0
      this.sections.forEach(section => {
        if (section.recipes) {
          numRecipes += section.recipes.length
        }
      })
      return numRecipes
    },
    cookbookTitle() {
      if (this.title.length === 0) {
        return "Untitled"
      }
      return this.title
    },
    coverPhoto() {
      return GenImageLink(this.image)
    }
  }
}
</script>

<style scoped>

</style>