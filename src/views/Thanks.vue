<template>
  <div
    class="w-full min-h-screen relative overflow-auto bg-cover bg-center"
    style="background-image: url('/assets_base/4FondoPersonaTenue.png')"
  >
    <!-- Contenedor principal -->
    <div
      class="w-full min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-16"
    >
      <!-- Logo en la parte superior -->
      <div class="mb-8 sm:mb-12">
        <img
          src="/assets_base/3LogoClaromediaDataBar.png"
          alt="Claro Media Data Bar Logo"
          class="h-16 sm:h-20 md:h-24 lg:h-32 xl:h-40 w-auto max-w-[90vw]"
        />
      </div>

      <!-- Mensaje principal -->
      <div class="text-center mb-6 sm:mb-8">
        <h1
          class="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mb-4 sm:mb-6 px-4"
        >
          ¡Gracias por conectar con la Data!
        </h1>

        <!-- Línea roja decorativa -->
        <div class="w-24 sm:w-32 h-1 bg-red-600 mx-auto mb-6 sm:mb-8"></div>

        <div
          class="text-white text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto px-4"
        >
          <p class="mb-3 sm:mb-4">Tu mezcla perfecta está lista.</p>
          <p>
            Pasa al
            <span class=" font-bold" style="color:#e21712;">Data</span> Bar y
            disfruta tu bebida personalizada.
          </p>
        </div>
      </div>

      <!-- Botón de volver al inicio -->
      <div class="mt-8 sm:mt-12 w-full max-w-md px-4">
        <button
          @click="goHome"
          class="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 sm:py-4 sm:px-12 rounded-lg text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 mx-auto block min-w-[250px]"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Thanks',
  methods: {
    startOver() {
      // Limpiar datos guardados
      localStorage.removeItem('userData')
      localStorage.removeItem('quizAnswers')

      // Ir al formulario de datos
      this.$router.push('/datos')
    },

    goHome() {
      // Limpiar datos guardados
      localStorage.removeItem('userData')
      localStorage.removeItem('quizAnswers')

      // Ir al inicio
      this.$router.push('/')
    }
  }
}
</script>
