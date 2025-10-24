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
        
        <!-- Formulario principal -->
        <div class="content-card slide-up">
          <h2 class="main-title text-3xl mb-2">
            Cuéntanos sobre ti
          </h2>
          <p class="subtitle text-lg mb-8">
            Necesitamos algunos datos para personalizar tu experiencia
          </p>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="fade-in" style="animation-delay: 0.1s">
                <label for="name" class="input-label">
                  Nombre completo *
                </label>
                <input 
                  type="text" 
                  id="name"
                  v-model="userData.name"
                  class="input-tablet"
                  required
                  placeholder="Ingresa tu nombre completo"
                />
              </div>
              
              <div class="fade-in" style="animation-delay: 0.2s">
                <label for="cedula" class="input-label">
                  Cédula *
                </label>
                <input 
                  type="text" 
                  id="cedula"
                  v-model="userData.cedula"
                  class="input-tablet"
                  required
                  placeholder="Número de cédula"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="fade-in" style="animation-delay: 0.3s">
                <label for="phone" class="input-label">
                  Celular *
                </label>
                <input 
                  type="tel" 
                  id="phone"
                  v-model="userData.phone"
                  class="input-tablet"
                  required
                  placeholder="Número de celular"
                />
              </div>
              
              <div class="fade-in" style="animation-delay: 0.4s">
                <label for="email" class="input-label">
                  Correo electrónico *
                </label>
                <input 
                  type="email" 
                  id="email"
                  v-model="userData.email"
                  class="input-tablet"
                  required
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            
            <div class="fade-in" style="animation-delay: 0.5s">
              <button 
                type="submit"
                class="btn-primary-tablet"
                :disabled="!isFormValid"
                :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
              >
                Continuar al Quiz
              </button>
            </div>
          </form>
        </div>
        
        <!-- Información de privacidad -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center max-w-md">
          <p class="text-xs opacity-80">
            Tus datos están protegidos y solo se utilizarán para personalizar tu experiencia en Data Bar
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserData',
  data() {
    return {
      userData: {
        name: '',
        cedula: '',
        phone: '',
        email: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.userData.name && 
             this.userData.cedula && 
             this.userData.phone && 
             this.userData.email
    }
  },
  methods: {
    submitForm() {
      if (this.isFormValid) {
        // Guardar datos del usuario en el localStorage
        localStorage.setItem('userData', JSON.stringify(this.userData))
        
        // Ir a la primera pregunta
        this.$router.push('/pregunta/1')
      }
    }
  }
}
</script>