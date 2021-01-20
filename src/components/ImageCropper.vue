<template>
<div class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-11/12" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

        <div>
          <img ref="image" :src="src">
        </div>


      </div>
      <div class="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">
        <button @click="crop()" type="button" class="w-full inline-flex justify-center rounded border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
          Done
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Cropper from "cropperjs"

export default {
  name: "ImageCropper",
  props: {
    src: String
  },
  data(){
    return {
      cropper: {},
      destination: {},
      image: {}
    }
  },
  mounted(){
    this.image = this.$refs.image
    this.cropper = new Cropper(this.image, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1
    })
  },
  methods: {
    crop() {
      const canvas = this.cropper.getCroppedCanvas()
      this.destination = canvas.toDataURL("image/jpg")
      this.$emit('set-crop', this.destination)
    }
  }
}
</script>

<style lang="postcss">
.cropper-view-box {
  outline-color:#F43F5E !important;
}
.cropper-point {
  background-color: #F43F5E !important;
}
</style>
