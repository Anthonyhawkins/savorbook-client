<template>
  <div class="flex text-gray-400 px-20 justify-between h-full">
    <div class="max-w-4xl mx-auto">
      <div class="text-sm font-bold py-3">SAVORBOOK</div>
      <div
        class="mx-auto bg-gray-200 text-gray-500 shadow-md relative"
      >
        <CookbookContents v-if="page == 'toc'" :sections="cookbook.sections" />
        <CookbookCover
          v-if="page == 'cover'"
          :image="coverPhoto"
          :title="cookbook.title"
          :subTitle="cookbook.subTitle"
        />
      </div>
      <CookbookNav @select-page="selectPage" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import store from "@/store"
import { CookbookService } from "@/services/apiService.js"
import { GenImageLink } from "@/services/cloudStorage.js"
import CookbookNav from "@/components/cookbook/CookbookNav.vue"
import CookbookCover from "@/components/cookbook/CookbookCover.vue"
import CookbookContents from "@/components/cookbook/CookbookContents.vue"

export default {
  name: "CookbookShow",
  async beforeRouteEnter(to, from, next) {
    await store.dispatch("resetCookbook")
    await store.dispatch("getCookbook", to.params.id)
    return next()
  },
  components: {
    CookbookNav,
    CookbookCover,
    CookbookContents
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
  mounted(){
    console.log(this.cookbook)
    console.log(this.sections)
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