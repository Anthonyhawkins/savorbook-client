<template>
  <div
    class="flex flex-row mx-auto bg-gray-900 p-2 mt-2 mb-10 rounded-lg shadow-md text-gray-300 justify-between"
  >
    <div class="flex flex-row">
      <div
        @click="select('cover')"
        class="flex border-r border-gray-400 px-3 cursor-pointer"
      >
        Cover
      </div>
      <div @click="select('toc')" class="flex px-3 cursor-pointer">
        Table of Contents
      </div>
    </div>

    <div class="flex flex-row space-x-8 mr-2">
      <div class="flex cursor-pointer">
        <svg class="h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
        </svg>
      </div>
      <div class="flex cursor-pointer">
        <svg class="h-8 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
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