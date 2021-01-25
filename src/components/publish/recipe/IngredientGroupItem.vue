<template>
  <li class="flex-row border-b border-gray-200 space-x-6">
    <div class="flex flex-row  justify-end">
      <div class="flex w-full">
        <input 
        type="text" 
        class="ingredient-input  w-full mr-1" 
        placeholder="Name"
        v-bind="$attrs"
        :value="ingredientName"
        @input="$emit('update:ingredientName', $event.target.value)"
        @blur="$emit('outOfFocus')"
        >
      </div>
      <div class="flex w-24 mr-1">
        <input 
        type="text" 
        class="ingredient-input text-center w-full" 
        placeholder="qty"
        :value="ingredientQty"
        @input="$emit('update:ingredientQty', $event.target.value)"
        @blur="$emit('outOfFocus')"
        >          
      </div>
      <div class="flex w-46 mr-2">
        <input 
        type="text" 
        class="ingredient-input w-full" 
        placeholder="unit"
        :value="ingredientUnit"
        @input="$emit('update:ingredientUnit', $event.target.value)"
        @blur="$emit('outOfFocus')"
        >   
      </div>
    </div>
  </li>  
</template>

<script>
export default {
  name: "IngredientGroupItem",
  emits: [
    'outOfFocus',
    'update:ingredientName', 
    'update:ingredientQty', 
    'update:ingredientUnit'],
  props: {
    ingredientName: {
      type: [String],
      default: ''
    },
    ingredientQty: {
      type: [String],
      default: ''
    },
    ingredientUnit: {
      type: [String],
      default: ''
    }
  }
}
</script>

<style lang="postcss" scoped>
  .ingredient-input {
      @apply h-8 focus:outline-none focus:ring text-gray-600 pl-3
  }
</style>