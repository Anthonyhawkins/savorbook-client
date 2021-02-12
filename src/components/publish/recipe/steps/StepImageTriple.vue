<template>
  <div
    class="flex flex-row rounded-md bg-white h-auto text-sm p-2 text-gray-300 shadow border border-gray-300 mt-2"
  >
    <draggable
      :list="images"
      @start="drag = true"
      @end="drag = false"
      item-key="src"
      class="flex flex-row w-full justify-between space-x-2"
    >
      <template #item="{element, index}">
        <div class="flex flex-col w-1/3">
          <ImageSelector
            :existingImage="element.src"
            :existingOriginal="element.original"
            :imageFor="index.toString()"
            @image-selected="setImage"
          />
          <textarea
            name="description"
            placeholder="What Aboout this image 1"
            class="step-text h-full mt-2 border-b-2 border-rose-500"
            cols="30"
            rows="3"
            v-model="element.text"
            @blur="saveStep()"
          ></textarea>
        </div>
      </template>
    </draggable>

    <div class="flex flex-col w-10 pl-1 justify-between">
      <div class="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="text-gray-200 h-6 w-6 cursor-move"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      </div>
      <div class="flex justify-center cursor-pointer" @click="removeStep()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="text-gray-200 h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import ImageSelector from "@/components/ImageSelector.vue";
import draggable from "vuedraggable";
export default {
  name: "StepImageTripple",
  components: {
    draggable,
    ImageSelector
  },
  props: {
    stepIndex: {
      type: [Number],
      required: true
    },
    step: {
      type: Object
    }
  },
  data() {
    return {
      index: this.stepIndex,
      type: this.step.type,
      images: this.step.images
    };
  },
  methods: {
    setImage(e) {
      const index = parseInt(e.image, 10);
      this.images[index].src = e.src;
      this.images[index].original = e.original;
      this.saveStep();
    },
    saveStep() {
      const payload = {
        index: this.index,
        step: {
          id: this.step.id,
          type: this.type,
          text: "",
          images: this.images
        }
      };
      this.$store.dispatch("setStep", payload);
    },
    removeStep() {
      this.$store.dispatch("removeStep", this.index);
    }
  }
};
</script>

<style lang="postcss" scoped>
.step-text {
  @apply w-full h-full focus:outline-none focus:ring p-2 text-gray-600;
}
</style>
