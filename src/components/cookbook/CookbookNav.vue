<template>
  <div
    class="flex flex-row  bg-gray-50 p-2 rounded-lg shadow-md  text-gray-600 justify-center"
  >
    <div class="flex flex-row">
      <div
        @click="select('cover')"
        class="flex border-r border-gray-400 px-3 cursor-pointer"
      >
        Cover
      </div>
      <div
        @click="select('toc')"
        class="flex border-r border-gray-400px-3 cursor-pointer px-3"
      >
        Table of Contents
      </div>
      <!--<div @click="select('recipe')" class="flex px-3 cursor-pointer">
        Back to Recipe
      </div>
      -->
    </div>
  </div>
</template>
<script>
export default {
  name: "CookbookNav",
  methods: {
    select(page) {
      this.$emit("select-page", page)
    }
  }
}
</script>