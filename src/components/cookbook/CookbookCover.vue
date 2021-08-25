<template>
  <div class="bg-gray-50 relative bg-blue-200">
    <img
      v-if="image"
      class="rounded-sm shadow-md mb-1 object-fill w-full"
      :src="image"
      alt=""
    />
    <div class="bg-gray-800 bg-opacity-60 absolute bottom-0 w-full p-3">
      <h2 class="text-white text-center font-medium text-2xl">
        {{ title }}
      </h2>
      <p class="text-white text-center">
        {{ subTitle }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CookbookCover",
  props: {
    image: {
      type: String,
      default: null
    },
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: true
    }
  }
}
</script>