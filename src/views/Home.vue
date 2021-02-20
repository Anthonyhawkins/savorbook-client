<template>
  <div class="container mx-auto">
    <div class="flex flex-row justify-center mb-5">
      <div class="flex-none w-3/5  p-5 ">
        <h1 class="font-bold leading-snug">Cookbooks for the Modern Age</h1>
        <p class="text-gray-700">
          Savorbook is a platform for cookbook lovers, both reader and authors.
          Publish and purchase premium digital cookbooks.
        </p>
      </div>
    </div>

    <div class="flex flex-row space-x-4 px-4 mb-5 justify-between">
      <div
        class="flex-none w-44 h-56 bg-cyan-600 p-5 mb-5 shadow-md text-white"
      >
        <h1 class="font-bold leading-snug">title</h1>
        <p>
          A cool cookbook
        </p>
      </div>

      <div
        class="flex-none w-44 h-56 bg-cyan-600 p-5 mb-5 shadow-md text-white"
      >
        <h1 class="font-bold leading-snug">title</h1>
        <p>
          A cool cookbook
        </p>
      </div>

      <div
        class="flex-none w-44 h-56 bg-cyan-600 p-5 mb-5 shadow-md text-white"
      >
        <h1 class="font-bold leading-snug">title</h1>
        <p>
          A cool cookbook
        </p>
      </div>

      <div
        class="flex-none w-44 h-56 bg-cyan-600 p-5 mb-5 shadow-md text-white"
      >
        <h1 class="font-bold leading-snug">title</h1>
        <p>
          A cool cookbook
        </p>
      </div>

      <div
        class="flex-none w-44 h-56 bg-cyan-600 p-5 mb-5 shadow-md text-white"
      >
        <h1 class="font-bold leading-snug">title</h1>
        <p>
          A cool cookbook
        </p>
      </div>
    </div>
    <div class="flex flex-row space-x-4 px-4 mb-5">
      <div class="bg-white p-5 mb-5 shadow-md">
        <h1 class="font-bold leading-snug">Read</h1>
        <p class="text-gray-700">
          Savorbook is a platform for cookbook lovers, both reader and authors.
          Publish and Purchase Premium Digital Cookbooks.
        </p>
      </div>
      <div class="bg-white p-5 mb-5 shadow-md">
        <h1 class="font-bold leading-snug">Shop</h1>
        <p class="text-gray-700">
          Savorbook is a platform for cookbook lovers, both reader and authors.
          Publish and Purchase Premium Digital Cookbooks.
        </p>
      </div>
      <div class="bg-white p-5 mb-5 shadow-md">
        <h1 class="font-bold leading-snug">Publish</h1>
        <p class="text-gray-700">
          Savorbook is a platform for cookbook lovers, both reader and authors.
          Publish and Purchase Premium Digital Cookbooks.
        </p>
      </div>
    </div>

    <!-- Default -->

    <div class="flex flex-col bg-white w-1/3 p-5 rounded-l-lg mx-auto">
      <ImageSelector imageFor="imageOne" @image-selected="setImage" />
    </div>
    <div class="flex flex-col bg-white w-1/3 p-5 rounded-l-lg mx-auto">
      <ImageSelector />
    </div>
    <div
      class="bg-white px-6 py-4 my-3 w-3/4 mx-auto shadow rounded-md flex items-center"
    >
      <div class="w-full text-center mx-auto">
        <button type="button" class="button button-clear">
          Info
        </button>
        <button type="button" class="button button-success">
          Dark
        </button>
        <button type="button" class="button button-primary">
          Light
        </button>
      </div>
    </div>
    <!-- End Default -->
  </div>
</template>

<script>
import ImageSelector from "@/components/ImageSelector.vue"

export default {
  name: "Home",
  components: {
    ImageSelector
  },
  data() {
    return {
      images: {
        imageOne: "",
        imageTwo: ""
      }
    }
  },
  methods: {
    setImage(e) {
      this.images[e.image] = e.src
    }
  }
}
</script>
