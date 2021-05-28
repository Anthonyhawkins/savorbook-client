<template>
  <div class="flex flex-row h-full">
    <div class="flex flex-col h-full bg-white text-gray-500 shadow-lg z-0">
      <div class="flex flex-row justify-start bg-gray-200">
        <div
          @click="setTab('title')"
          :class="{ active: isTab('title') }"
          class="flex p-2 select-none cursor-pointer"
        >
          <h2 class="font-medium">Title and Cover</h2> 
        </div>
        <div
          @click="setTab('toc')"
          :class="{ active: isTab('toc') }"
          class="flex p-2 select-none cursor-pointer"
        >
          <h2 class="font-medium">Outline</h2>
        </div>
        <div
          @click="setTab('recipes')"
          :class="{ active: isTab('recipes') }"
          class="flex p-2 select-none cursor-pointer"
        >
          <h2 class="font-medium">Recipe Box</h2>
        </div>
      </div>
      <template v-if="cookbook.loaded">
        <RecipePane v-show="isTab('recipes')" />
        <DetailsPane
          v-show="isTab('title')"
          :title="cookbook.title"
          :subTitle="cookbook.subTitle"
          :blurb="cookbook.blurb"
          :image="cookbook.image"
        />
        <TableOfContents v-show="isTab('toc')" />
      </template>
    </div>
    <div class="flex flex-col w-full bg-white p-2 space-y-4 overflow-x-scroll">
      <div class="flex">
        <h2 class="font-medium text-rose-500 ml-3">Sections</h2>
      </div>
      <div class="flex flex-row flex-grow-0 h-full">
        <draggable
          :list="cookbookSections"
          @start="drag = true"
          @end="drag = false"
          :onUpdate="updateSections"
          group="cookbookSections"
          item-key="id"
          class="flex flex-row flex-grow-0"
        >
          <template #item="{element, index}">
            <CookbookSection :section="element" :index="index" />
          </template>
        </draggable>
        <div
          @click="newSection()"
          class="flex flex-col flex-shrink-0 h-12 w-80 bg-gray-200 p-2 rounded-sm hover:bg-gray-100 cursor-pointer"
        >
          <h2 class="font-medium text-gray-500 select-none">
            New Section +
          </h2>
        </div>
        <!-- This div is used as a spacer as padding or margin seem not to work on the right edge -->
        <div class="flex flex-col flex-shrink-0 w-5"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import store from "@/store"
import draggable from "vuedraggable"
import RecipePane from "@/components/publish/cookbook/RecipePane.vue"
import DetailsPane from "@/components/publish/cookbook/DetailsPane.vue"
import TableOfContents from "@/components/publish/cookbook/TableOfContents.vue"

import CookbookSection from "@/components/publish/cookbook/CookbookSection.vue"

export default {
  name: "CookbookEdit",
  components: {
    draggable,
    RecipePane,
    DetailsPane,
    TableOfContents,
    CookbookSection
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch("resetCookbook")
    await store.dispatch("getCookbook", to.params.id)
    return next()
  },
  data() {
    return {
      tab: "title",
      cookbookSections: []
    }
  },
  mounted() {
    this.cookbookSections = this.cookbook.sections
  },
  watch: {
    sections: {
      deep: true,
      handler() {
        this.cookbookSections = this.sections
      }
    }
  },
  computed: {
    ...mapGetters(["cookbook", "sections"])
  },
  /**
   * It may be tempting to use a watcher for the list but the watcher
   * will ultimately cause 2 API calls.
   * - when something leaves a list
   * - and when something is added to another list
   * We only want to call the API to update when something is added because
   * sortable will always remove before add.
   * To do this use the sortable props such as :onAdd and :onUpdate
   */
  methods: {
    setTab(tab) {
      this.tab = tab
    },
    isTab(tab) {
      if (this.tab == tab) return true
      return false
    },
    newSection() {
      this.$store.dispatch("addCookbookSection")
    },
    updateSections() {
      this.$store.dispatch("updateCookbookSections", this.sections)
    }
  }
}
</script>

<style lang="postcss" scoped>
.tag {
  @apply mr-1 mb-1 rounded-sm  px-1  hover:bg-rose-500 hover:text-white text-rose-500 text-sm font-medium cursor-pointer;
}

.active {
  @apply bg-white text-rose-500;
}
</style> 