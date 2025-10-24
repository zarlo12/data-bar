<template>
  <div
    class="w-full h-screen relative overflow-hidden bg-cover bg-center"
    style="background-image: url('/assets_base/4FondoPersonaTenue.png')"
  >
    <!-- Contenedor principal -->
    <div
      class="w-full h-full flex flex-col items-center justify-center px-8 py-16"
    >
      <!-- Logo en la parte superior -->
      <div class="mb-12">
        <img
          src="/assets_base/3LogoClaromediaDataBar.png"
          alt="Claro Media Data Bar Logo"
          class="h-32 md:h-40 lg:h-48 w-auto"
        />
      </div>

      <!-- Mensaje principal -->
      <div class="text-center mb-8">
        <h1
          class="text-white text-4xl md:text-5xl font-bold leading-tight max-w-4xl mb-6"
        >
          ¡Gracias por conectar con la Data!
        </h1>

        <!-- Línea roja decorativa -->
        <div class="w-32 h-1 bg-red-600 mx-auto mb-8"></div>

        <div
          class="text-white text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto"
        >
          <p class="mb-4">Tu mezcla perfecta está lista.</p>
          <p>
            Pasa al
            <span class=" font-bold" style="color:#e21712;">Data</span> Bar y
            disfruta tu bebida personalizada.
          </p>
        </div>
      </div>

      <!-- Botón de volver al inicio -->
      <div class="mt-12">
        <button
          @click="goHome"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105"
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
