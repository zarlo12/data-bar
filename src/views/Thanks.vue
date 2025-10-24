<template>
  <div class="tablet-container">
    <div class="full-page bg-persona-tenue">
      <div class="page-overlay"></div>
      <div class="page-content">
        <!-- Logo principal arriba -->
        <div class="main-logo fade-in">
          <img 
            src="/assets_base/3LogoClaromediaDataBar.png" 
            alt="Claro Media Data Bar Logo" 
            class="h-20 w-auto"
          />
        </div>
        
        <!-- Contenido de agradecimiento -->
        <div class="content-card slide-up">
          <!-- Celebración -->
          <div class="text-center mb-8">
            <div class="text-8xl mb-6 animate-bounce">🎉</div>
            <h1 class="main-title text-4xl mb-4">
              ¡Gracias por participar!
            </h1>
            <div class="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mb-6"></div>
          </div>
          
          <!-- Mensaje principal -->
          <div class="text-center mb-10 space-y-6">
            <div class="fade-in" style="animation-delay: 0.2s">
              <h2 class="text-2xl font-bold text-gray-800 mb-3">
                Tu bebida ha sido registrada exitosamente
              </h2>
            </div>
            
            <div class="fade-in" style="animation-delay: 0.4s">
              <p class="text-xl text-gray-600 leading-relaxed">
                En <span class="font-semibold text-red-600">Data Bar</span> servimos resultados efectivos, 
                y tu resultado personalizado refleja tu perfil único profesional.
              </p>
            </div>
            
            <div class="fade-in" style="animation-delay: 0.6s">
              <div class="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
                <p class="text-red-800 font-medium">
                  ¡Esperamos que disfrutes tu bebida perfecta! 🍹
                </p>
              </div>
            </div>
          </div>
          
          <!-- Botones de acción -->
          <div class="space-y-4 fade-in" style="animation-delay: 0.8s">
            <button 
              @click="startOver"
              class="btn-primary-tablet"
            >
              🔄 Realizar quiz nuevamente
            </button>
            
            <button 
              @click="goHome"
              class="btn-secondary-tablet"
            >
              🏠 Volver al inicio
            </button>
          </div>
          
          <!-- Footer del mensaje -->
          <div class="mt-10 pt-8 border-t border-gray-200 text-center fade-in" style="animation-delay: 1s">
            <div class="flex items-center justify-center space-x-3 mb-4">
              <img 
                src="/assets_base/2LogoDataBarServimosresultadosefectivos.png" 
                alt="Data Bar Logo" 
                class="h-8 w-auto opacity-60"
              />
            </div>
            <p class="text-sm text-gray-500">
              Data Bar - Servimos resultados efectivos
            </p>
            <p class="text-xs text-gray-400 mt-2">
              Una experiencia personalizada para profesionales
            </p>
          </div>
        </div>
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