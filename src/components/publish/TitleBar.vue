<template>
    <div class="flex flex-col bg-white w-2/3">
        <input 
            type="text" 
            class="title-input" 
            placeholder="Untitled"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
    </div>
</template>

<script>
export default {
    name: "TitleBar",
    props: {
        modelValue: {
            type: [String],
            default: ''
        }
    }
}
</script>

<style lang="postcss" scoped>
    .title-input {
        @apply h-full px-5 placeholder-gray-400 text-red-500 bg-white focus:outline-none focus:ring font-medium text-lg w-full;
    }
</style>