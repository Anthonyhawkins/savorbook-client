<template>
  <div class="flex flex-row">
    <div class="flex flex-wrap">
      <div
        v-for="(tag, index) in tagList"
        :key="'tag' + index"
        class="flex flex-row rounded-sm bg-rose-500 pl-1 mb-1 mr-1 text-white"
        data-testid="tag"
      >
        <div class="flex mr-1 place-items-center">
          {{ tag }}
        </div>
        <div
          @click="removeTag(tag)"
          class="flex place-items-center"
          data-testid="tag-close"
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <input
        v-model="tagValue"
        type="text"
        class="w-full h-full outline-none  text-rose-500"
        name="tag-input"
        :placeholder="placeholder"
        @keyup.enter.prevent="addTag()"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TagInput",
  props: {
    tags: {
      type: Array
    },
    placeholder: {
      type: String,
      default: "add a tag..."
    }
  },
  emits: ["tags-updated"],
  data() {
    return {
      tagValue: "",
      tagList: []
    }
  },
  watch: {
    tags() {
      if (this.tags != null) {
        this.tagList = this.tags
      }
    }
  },
  methods: {
    addTag() {
      const regex = /^[a-zA-Z0-9]*$/i
      const inLineError = "letters and numbers only"
      if (!this.tagValue.match(regex)) {
        this.tagValue = inLineError
        return true
      }

      if (this.tagValue == inLineError) {
        this.tagValue = ""
        return true
      }

      if (this.tagList.includes(this.tagValue)) {
        this.tagValue = ""
        return true
      }
      this.tagList.push(this.tagValue)
      this.tagValue = ""
      this.$emit("tags-updated", this.tagList)
    },
    removeTag(tag) {
      this.tagList.splice(this.tagList.indexOf(tag), 1)
      this.$emit("tags-updated", this.tagList)
    }
  }
}
</script>

<style lang="postcss" scoped></style>
