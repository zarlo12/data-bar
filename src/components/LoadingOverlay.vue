<template>
  <div class="loading-overlay" v-if="isLoading">
    <div class="w-full h-screen bg-black flex items-center justify-center">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"
        ></div>
        <p class="text-white text-lg">Cargando...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingOverlay',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: #000;
}
</style>
