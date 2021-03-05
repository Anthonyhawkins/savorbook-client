<template>
  <div class="flex flex-col flex-shrink-0 h-screen w-96 bg-white p-2 space-y-2">
    <h2 class="font-medium text-rose-500">{{ cookbook.title }}</h2>
    <p class="text-gray-500 ">{{ cookbook.subTitle }}</p>
    <template v-for="section in cookbook.sections" :key="section.id">
      <h3 class="font-medium">{{ section.name }}</h3>
      <ul>
        <li
          v-for="recipe in section.recipes"
          :key="recipe.id"
          class="text-rose-500 ml-3"
        >
          {{ recipe.name }}
        </li>
      </ul>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name: "TableOfContents",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["cookbook"])
  }
}
</script>
<style lang="postcss" scoped>
</style>
