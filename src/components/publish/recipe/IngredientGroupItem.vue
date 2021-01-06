<template>
    <li class="flex-row border-b border-gray-200 space-x-6">
        <input 
        type="text" 
        class="ingredient-input w-3/5" 
        placeholder="Name"
        v-bind="$attrs"
        :value="ingredientName"
        @input="$emit('update:ingredientName', $event.target.value)"
        @blur="$emit('outOfFocus')"
        >
        <input 
        type="text" 
        class="ingredient-input w-12" 
        placeholder="qty"
        :value="ingredientQty"
        @input="$emit('update:ingredientQty', $event.target.value)"
        @blur="$emit('outOfFocus')"
        >
        <input 
        type="text" 
        class="ingredient-input w-auto" 
        placeholder="unit"
        :value="ingredientUnit"
        @input="$emit('update:ingredientUnit', $event.target.value)"
        @blur="$emit('outOfFocus')"
        >
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