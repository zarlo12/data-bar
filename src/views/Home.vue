<template>
  <div class="tablet-container">
    <div class="full-page bg-persona">
      <div class="page-overlay"></div>
      <div class="page-content">
        <!-- Logo principal arriba -->
        <div class="main-logo fade-in">
          <img 
            src="/assets_base/1LogoClaroMedia.png" 
            alt="Claro Media Logo" 
            class="h-24 w-auto mb-6"
          />
        </div>
        
        <!-- Contenido principal -->
        <div class="content-card slide-up">
          <div class="text-center">
            <h1 class="main-title">
              ¡Bienvenido a Data Bar!
            </h1>
            <p class="subtitle">
              Descubre qué bebida representa mejor tu perfil profesional a través de nuestro quiz personalizado
            </p>
            
            <!-- Logo Data Bar en el centro -->
            <div class="mb-8">
              <img 
                src="/assets_base/2LogoDataBarServimosresultadosefectivos.png" 
                alt="Data Bar - Servimos resultados efectivos" 
                class="h-16 w-auto mx-auto"
              />
            </div>
            
            <button 
              @click="startQuiz"
              class="btn-primary-tablet"
            >
              Comenzar Quiz
            </button>
          </div>
        </div>
        
        <!-- Footer con información adicional -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
          <p class="text-sm opacity-80">
            Una experiencia personalizada de Data Bar
          </p>
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