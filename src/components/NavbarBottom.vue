<template lang="">
  <div
    class="flex flex-row h-15 pb-4 bg-gray-700  justify-center space-x-10 items-center"
  >
    <a class="footer-link" href="">Terms</a>
    <a class="footer-link" href="">Policy</a>
    <a class="footer-link" href="">Contact</a>
    <a class="footer-link" href="">About</a>
  </div>
</template>

<script>
export default {
  name: "NavbarBottom",
  data() {
    return {};
  }
};
</script>

<style lang="postcss" scoped>
.footer-link {
  @apply text-gray-400 hover:text-white p-2;
}
</style>
