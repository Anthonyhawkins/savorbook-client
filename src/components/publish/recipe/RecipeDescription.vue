<template>
  <div class="h-48">
    <textarea
      name="description"
      placeholder="What makes the recipe special?"
      class="des-textarea"
      id=""
      cols="30"
      rows="10"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "RecipeDescription",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [String],
      default: ""
    }
  }
}
</script>

<style lang="postcss" scoped>
.des-textarea {
  @apply w-full h-48 focus:outline-none focus:ring p-2 text-gray-600 border border-gray-200;
}
</style>
