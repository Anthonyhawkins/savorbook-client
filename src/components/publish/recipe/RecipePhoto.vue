<template>
  <form action="" enctype="multipart/form-data">
    <div class="flex bg-gray-300 rounded aspect-w-1 aspect-h-1 justify-center">
      <img
        class="image-fit w-full rounded"
        v-if="imgsrc"
        :src="imgsrc"
        alt=""
      />

      <div v-if="imgsrc" class="flex justify-end h-full p-2">
        <div class=" h-6 w-6 justify-center cursor-pointer space-y-2">
          <svg
            @click="$refs.file.click()"
            xmlns="http://www.w3.org/2000/svg"
            class="bg-rose-600 rounded-md text-white h-6 w-6 place-self-center "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <svg
            @click="startCrop()"
            class="bg-rose-600 rounded-md text-white h-6 w-6 place-self-center "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </div>
      </div>
      <div v-else class="flex flex-col justify-center">
        <div
          @click="$refs.file.click()"
          class="bg-rose-600 p-3 justify-center place-self-center cursor-pointer rounded-md shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-gray-100 place-self-center h-10 w-10 z-40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-gray-100 place-self-center h-10 w-10 z-40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    </div>

    <input type="file" ref="file" @change="selectFile()" class="hidden" />
    <ImageCropper
      v-if="crop"
      @close-cropper="closeCropper()"
      @set-crop="setCrop"
      :src="original"
    />
  </form>
</template>

<script>
import { ImageService } from "@/services/apiService.js";
import ImageCropper from "@/components/ImageCropper.vue";
import { dataURItoBlob } from "@/helpers/helpers.js";

export default {
  name: "RecipePhoto",
  components: {
    ImageCropper
  },
  data() {
    return {
      crop: false,
      original: "",
      file: "",
      imgsrc: ""
    };
  },
  methods: {
    /**
     * Upload Process
     *  - 1 User selects file which triggers a crop
     *  - 2 User Accepts or adjusts the crop - setCrop()
     *  - 3 SetCrop closes the cropper modal and uploads the image - sendFile()
     *  - 4 File is uploaded to server -> GCP storage, the img src becomes the gcp URL
     *  - if Users wants to re-crop or select new image, process starts at 1 again
     */

    startCrop() {
      this.crop = true;
    },
    closeCropper() {
      this.crop = false;
    },

    setCrop(croppedImage) {
      this.crop = false;
      this.imgsrc = croppedImage;
      //this.sendFile()
    },

    selectFile() {
      // store as original
      this.original = this.$refs.file.files[0];
      var reader = new FileReader();
      reader.onload = e => {
        this.imgsrc = e.target.result;
        this.original = e.target.result;
        this.startCrop();
      };
      reader.readAsDataURL(this.original);
    },
    async sendFile() {
      const fileBlob = dataURItoBlob(this.imgsrc);
      const formData = new FormData();
      formData.append("image", fileBlob);
      try {
        await ImageService.uploadImage(formData).then(({ data }) => {
          this.imgsrc = "https://storage.googleapis.com" + data.data.path;
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.image-fit {
  object-fit: cover;
}

.1-to-1 {
  padding-top: 100%;
}
</style>
