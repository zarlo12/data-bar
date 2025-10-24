<template>
  <div
    class="w-full h-screen relative overflow-hidden bg-cover bg-center"
    style="background-image: url('/assets_base/4FondoPersona.png')"
  >
    <!-- Contenedor principal centrado -->
    <div class="w-full h-full flex flex-col items-center justify-center px-8">
      <!-- Grupo de elementos centrados -->
      <div class="flex flex-col items-center space-y-8">
        <!-- Logo Claro Media -->
        <div>
          <img
            src="/assets_base/1LogoClaroMedia.png"
            alt="Claro Media Logo"
            class="h-24 md:h-32 w-auto"
          />
        </div>

        <!-- Logo Data Bar -->
        <div>
          <img
            src="/assets_base/2LogoDataBarServimosresultadosefectivos.png"
            alt="Data Bar - Servimos resultados efectivos"
            class="h-48 md:h-56 lg:h-64 w-auto"
          />
        </div>

        <!-- Botón Comenzar -->
        <div class="mt-4">
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
  methods: {
    startQuiz() {
      this.$router.push('/datos')
    }
  }
}
</script>
