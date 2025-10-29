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

      <!-- Formulario centrado -->
      <div class="w-full max-w-md space-y-8">
        <!-- Campo Nombre -->
        <div>
          <label class="block text-white text-xl font-medium mb-3 text-center">
            Nombre
          </label>
          <input
            type="text"
            v-model="userData.name"
            class="w-full px-4 py-4 bg-black bg-opacity-60 border-2 border-red-600 rounded-lg text-white text-lg placeholder-gray-300 focus:outline-none focus:border-red-400"
            required
          />
        </div>

        <!-- Campo Cédula -->
        <div>
          <label class="block text-white text-xl font-medium mb-3 text-center">
            Cédula
          </label>
          <input
            type="text"
            v-model="userData.cedula"
            class="w-full px-4 py-4 bg-black bg-opacity-60 border-2 border-red-600 rounded-lg text-white text-lg placeholder-gray-300 focus:outline-none focus:border-red-400"
            required
          />
        </div>

        <!-- Campo Celular -->
        <div>
          <label class="block text-white text-xl font-medium mb-3 text-center">
            Celular
          </label>
          <input
            type="tel"
            v-model="userData.phone"
            class="w-full px-4 py-4 bg-black bg-opacity-60 border-2 border-red-600 rounded-lg text-white text-lg placeholder-gray-300 focus:outline-none focus:border-red-400"
            required
          />
        </div>

        <!-- Campo Correo -->
        <div>
          <label class="block text-white text-xl font-medium mb-3 text-center">
            Correo
          </label>
          <input
            type="email"
            v-model="userData.email"
            class="w-full px-4 py-4 bg-black bg-opacity-60 border-2 border-red-600 rounded-lg text-white text-lg placeholder-gray-300 focus:outline-none focus:border-red-400"
            required
          />
        </div>

        <!-- Campo NIT -->
        <div>
          <label class="block text-white text-xl font-medium mb-3 text-center">
            NIT
          </label>
          <input
            type="text"
            v-model="userData.nit"
            class="w-full px-4 py-4 bg-black bg-opacity-60 border-2 border-red-600 rounded-lg text-white text-lg placeholder-gray-300 focus:outline-none focus:border-red-400"
            required
          />
        </div>

        <!-- Checkbox Habeas Data -->
        <div class="flex items-start space-x-3">
          <input
            type="checkbox"
            id="habeasData"
            v-model="userData.acceptTerms"
            class="mt-1 w-5 h-5 text-red-600 bg-transparent border-2 border-red-600 rounded focus:ring-red-500 focus:ring-2"
            required
          />
          <label
            for="habeasData"
            class="text-white text-lg leading-relaxed cursor-pointer"
          >
            Acepta nuestra politica de datos personales
          </label>
        </div>

        <!-- Botón Enviar -->
        <div class="pt-8">
          <button
            @click="submitForm"
            type="button"
            class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105"
            :disabled="!isFormValid"
            :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
          >
            Enviar
          </button>
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
        email: '',
        nit: '',
        acceptTerms: false
      }
    }
  },
  computed: {
    isFormValid() {
      return this.userData.name &&
             this.userData.cedula &&
             this.userData.phone &&
             this.userData.email &&
             this.userData.nit &&
             this.userData.acceptTerms
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
