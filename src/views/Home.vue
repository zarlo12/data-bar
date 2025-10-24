<template>
  <div
    class="w-full h-screen relative overflow-hidden bg-black bg-cover bg-center transition-all duration-500 ease-in-out"
    :style="backgroundStyle"
  >
    <!-- Botón oculto para Bartender (esquina superior izquierda) -->
    <div class="absolute top-4 left-4">
      <button
        @dblclick="goToBartender"
        class="w-12 h-12 bg-transparent border-2 border-transparent hover:border-red-600 rounded-lg transition-all duration-300 opacity-10 hover:opacity-100"
        title="Doble clic para Panel del Bartender"
      >
        🍹
      </button>
    </div>

    <!-- Contenedor principal centrado -->
    <div class="w-full h-full flex flex-col items-center justify-center px-8">
      <!-- Grupo de elementos centrados -->
      <div class="flex flex-col items-center space-y-8">
        <!-- Logo Claro Media -->
        <div class="animate-fade-in" style="animation-delay: 0.2s">
          <img
            src="/assets_base/1LogoClaroMedia.png"
            alt="Claro Media Logo"
            class="h-24 md:h-32 w-auto transition-all duration-300"
            @load="onImageLoad"
          />
        </div>

        <!-- Logo Data Bar -->
        <div class="animate-fade-in" style="animation-delay: 0.4s">
          <img
            src="/assets_base/2LogoDataBarServimosresultadosefectivos.png"
            alt="Data Bar - Servimos resultados efectivos"
            class="h-48 md:h-56 lg:h-64 w-auto transition-all duration-300"
            @load="onImageLoad"
          />
        </div>

        <!-- Botón Comenzar -->
        <div class="mt-4 animate-fade-in" style="animation-delay: 0.6s">
          <button
            @click="startQuiz"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Comenzar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      imagesLoaded: 0,
      totalImages: 2
    }
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url('/assets_base/4FondoPersona.png')`,
        opacity: this.imagesLoaded >= this.totalImages ? 1 : 0.8
      }
    }
  },
  methods: {
    startQuiz() {
      // Transición suave antes de cambiar de página
      document.body.style.transition = 'opacity 0.3s ease-in-out'
      this.$router.push('/datos')
    },
    onImageLoad() {
      this.imagesLoaded++
    },
    goToBartender() {
      // Acceso al panel del bartender con doble clic
      this.$router.push('/bartender')
    }
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  opacity: 0;
}
</style>
