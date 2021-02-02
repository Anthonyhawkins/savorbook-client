<template>
  <div v-if="showAlert" :class="[alertColor]" class="flex flex-row font-medium text-white p-2 shadow-sm rounded-md justify-between space-x-3 mb-1">
    <div class="flex h-7 w-7 rounded-full justify-center items-center">
      <svg v-if="alertType == 'danger'" class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <svg v-if="alertType == 'info'" class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <svg v-if="alertType == 'success'" class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <svg v-if="alertType == 'warning'" class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>   
    <div class="flex">
      {{message}}
    </div>
      <div @click="dismissAlert()" class="flex h-7 w-7 rounded-full justify-center items-center">
        <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>    
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    message: {
        type: [String],
        required: true
    },
    alertType: {
        type: [String],
        required: true
    }
},
  data(){
    return {
      showAlert: true
    }
  },
  computed: {
    alertColor(){
      const colorMap = {
        "info": "bg-light-blue-500",
        "danger": "bg-red-500",
        "warning": "bg-amber-500",
        "success": "bg-emerald-500"
      }
      return colorMap[this.alertType]
    }
  },
  methods: {
    dismissAlert(){
      this.showAlert = false
    }
  }

}
</script>

<style lang="postcss" scoped>

</style>