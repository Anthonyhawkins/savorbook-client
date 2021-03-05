/* eslint-disable prettier/prettier */
<template>
  <div
    class="flex flex-col mr-3 flex-shrink-0 h-full max-h-screen w-80 shadow-sm p-2 rounded-sm bg-gray-100 space-y-2"
  >
    <div class="flex flex-row justify-between">
      <input
        name="cookbook-title"
        v-model="name"
        type="text"
        class="h-9 outline-none font-medium bg-gray-100 text-rose-500"
        placeholder="Section Name..."
        @blur="updateSection()"
      />
      <div
        @click="toggleSectionDetails()"
        class="text-lg font-bold text-rose-500 cursor-pointer select-none"
      >
        ...
      </div>
    </div>
    <div v-if="displayDetails">
      <label class="this-label">Overview</label>
      <textarea
        name="overview"
        placeholder="About this section..."
        class="blurb"
        v-model="overview"
        @blur="updateSection()"
      ></textarea>
    </div>
    <draggable
      :list="recipes"
      @start="drag = true"
      @end="drag = false"
      :onAdd="updateSection"
      :onUpdate="updateSection"
      group="recipes"
      item-key="id"
      class="flex flex-col h-full overflow-auto"
    >
      <template #item="{element}">
        <RecipeCard
          :name="element.name"
          :recipeId="element.id"
          :tags="element.tags"
        />
      </template>
    </draggable>
    <button
      class="block w-full place-self-center font-medium text-gray-500 hover:text-rose-500 hover:bg-gray-200 p-4 rounded-lg focus:outline-none"
      @click="deleteSection()"
    >
      Delete Section
    </button>
  </div>
</template>

<script>
import RecipeCard from "@/components/publish/cookbook/RecipeCard.vue"
import draggable from "vuedraggable"

export default {
  name: "CookbookSection",
  components: {
    RecipeCard,
    draggable
  },
  props: {
    section: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      displayDetails: false,
      name: this.section.name,
      overview: this.section.overview,
      recipes: this.section.recipes
    }
  },
  methods: {
    toggleSectionDetails() {
      this.displayDetails = this.displayDetails ? false : true
    },
    updateSection() {
      const section = {
        id: this.section.id,
        name: this.name,
        overview: this.overview,
        recipes: this.recipes
      }
      this.$store.dispatch("updateCookbookSection", {
        section,
        index: this.index
      })
    },
    deleteSection() {
      this.$store.dispatch("deleteCookbookSection", this.index)
    }
  }
}
</script>

<style lang="postcss" scoped>
.this-label {
  @apply font-medium text-gray-500 mb-2 mt-5;
}
.blurb {
  @apply w-full h-96 focus:outline-none focus:ring  text-gray-600 p-1 rounded;
}
</style>