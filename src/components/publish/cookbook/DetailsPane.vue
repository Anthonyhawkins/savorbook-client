<template>
  <div
    class="flex flex-col flex-shrink-0 h-screen w-96 bg-white p-2 space-y-2 z-0"
  >
    <div class="flex flex-col mb-2">
      <label class="this-label">Title</label>
      <input
        name="cookbook-title"
        v-model="cookbookTitle"
        type="text"
        class="h-12 outline-none border-b border-rose-500"
        placeholder="Title..."
        @blur="setDetails()"
      />
      <input
        name="cookbook-sub"
        v-model="cookbookSubTitle"
        type="text"
        class="h-12 outline-none border-b border-rose-500"
        placeholder="Sub Heading..."
        @blur="setDetails()"
      />
      <label class="this-label">Cover Photo</label>
      <ImageSelector
        imageFor="cookbookImage"
        @image-selected="setImage"
        :existingImage="cookbookImage"
      />
      <label class="this-label">Blurb</label>
      <textarea
        name="blurb"
        placeholder="Why will people love this cookbook?"
        class="blurb"
        cols="30"
        rows="10"
        v-model="cookbookBlurb"
        @blur="setDetails()"
      ></textarea>
    </div>
  </div>
</template>
<script>
import ImageSelector from "@/components/ImageSelector.vue"
export default {
  name: "DetailsPane",
  components: {
    ImageSelector
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    blurb: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      cookbookTitle: this.title,
      cookbookSubTitle: this.subTitle,
      cookbookBlurb: this.blurb,
      cookbookImage: this.image
    }
  },
  methods: {
    setDetails() {
      this.$store.dispatch("setCookbookDetails", {
        title: this.cookbookTitle,
        subTitle: this.cookbookSubTitle,
        blurb: this.cookbookBlurb
      })
    },
    setImage(e) {
      this.$store.dispatch("setCookbookImage", e.src)
    }
  }
}
</script>
<style lang="postcss" scoped>
.this-label {
  @apply font-medium text-rose-500 mb-2 mt-5;
}
.blurb {
  @apply w-full h-24 focus:outline-none focus:ring  text-gray-600;
}
</style>
