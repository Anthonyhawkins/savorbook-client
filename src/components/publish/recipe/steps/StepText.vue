<template>
    <div class="move-icon flex flex-row bg-white h-auto text-sm p-2 text-gray-300 shadow-md border border-gray-300 mt-2">
        <div class="flex w-full bg-red-200">
            <textarea 
            name="description" 
            placeholder="Now do this..." 
            class="step-text" 
            cols="30" 
            rows="10"
            v-model="text"
            @blur="saveStep(stepIndex)"
            ></textarea>
        </div>
        <div class="flex flex-col w-10 pl-1 justify-between cursor-move ">
            <div class="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-200 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
            </div>
            <div 
            class="flex justify-center cursor-pointer"
            @click="removeStep(stepIndex)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-200 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    name: "StepText",
    props: {
        stepIndex: {
            type: [Number],
            required: true
        },
        content: {
            type: [Object],
            required: true
        }
    },
    data () {
        return {
            index: this.stepIndex,
            text: this.content.text
            //text: this.$vnode.key
        }
    },
    methods: {
        saveStep(index){
            const payload = {
                index,
                step: {
                    type: "text",
                    content: { text: this.text }
                }
            }
            this.$store.dispatch('setStep', payload)
        },
        removeStep(index){
            this.$store.dispatch('removeStep', index)
        }
    }
}
</script>

<style lang="postcss" scoped>
    .step-text {
        @apply w-full h-24 focus:outline-none focus:ring p-2 text-gray-600
    }

    .move-icon:active {
        @apply border-blue-200 border-2
    }

</style>