<template>
  <div
    class="flex flex-col h-screen text-gray-400 md:px-20 px-3 lg:w-1/2 mx-auto"
  >
    <header class="py-5 text-gray-400 text-left font-bold">
      SAVORBOOK / {{ cookbook.title }}
    </header>
    <main class="flex-1">
      <CookbookCover
        v-if="page == 'cover'"
        :image="coverPhoto"
        :title="cookbook.title"
        :subTitle="cookbook.subTitle"
      />
      <CookbookContents :sections="cookbook.sections" />
    </main>
    <footer class="py-5 text-center text-white">
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import store from "@/store"
import { CookbookService } from "@/services/apiService.js"
import { GenImageLink } from "@/services/cloudStorage.js"
//import CookbookNav from "@/components/cookbook/CookbookNav.vue"
import CookbookCover from "@/components/cookbook/CookbookCover.vue"
import CookbookContents from "@/components/cookbook/CookbookContents.vue"
//import CookbookRecipe from "@/components/cookbook/CookbookRecipe.vue"

export default {
  name: "CookbookShow",
  async beforeRouteEnter(to, from, next) {
    await store.dispatch("resetCookbook")
    await store.dispatch("getCookbook", to.params.id)
    if (to.query.recipe) {
      /**
       * TODO
       * - Fetch a Single Recipe and save to state
       * - Set the Page
       */
    }
    return next()
  },
  components: {
    //CookbookNav,
    CookbookCover,
    CookbookContents
    //CookbookRecipe
  },
  data() {
    return {
      page: "cover",
      loaded: false,
      showTOC: false
    }
  },
  watch: {
    cookbook() {
      this.getSections()
    }
  },
  mounted() {
    if (this.$route.query.recipe) {
      this.page = "recipe"
    }
  },
  methods: {
    genImage(image) {
      return GenImageLink(image)
    },
    getSections() {
      this.cookbook.sections.forEach((section, index) => {
        CookbookService.getSectionRecipes(section.id)
          .then(({ data }) => {
            this.$store.dispatch("setSectionRecipes", {
              index: index,
              recipes: data.data
            })
          })
          .catch(error => {
            console.log(error)
          })
      })
      this.loaded = true
      console.log(this.cookbook)
      console.log(this.sections)
    },
    selectPage(page) {
      this.page = page
    },
    toggleTOC() {
      this.showTOC = this.showTOC ? false : true
    }
  },
  computed: {
    ...mapGetters(["cookbook", "sections"]),
    coverPhoto() {
      return GenImageLink(this.cookbook.image)
    }
  }
}
</script>

<style lang="postcss" scoped>
body {
  @apply bg-gray-500 !important;
}
</style>
