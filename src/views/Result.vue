<template>
  <div
    class="w-full h-screen relative overflow-hidden bg-cover bg-center"
    style="background-image: url('/assets_base/5Fondo.png')"
  >
    <!-- Contenedor principal -->
    <div
      class="w-full h-full flex flex-col items-center justify-center px-8 py-16"
      v-if="result"
    >
      <!-- Logo en la parte superior -->
      <div class="mb-8">
        <img
          src="/assets_base/3LogoClaromediaDataBar.png"
          alt="Claro Media Data Bar Logo"
          class="h-32 md:h-40 lg:h-48 w-auto"
        />
      </div>

      <!-- Imagen de la bebida -->
      <div class="mb-8">
        <img
          :src="result.beverage.image"
          :alt="result.beverage.name"
          class="h-64 md:h-80 w-auto mx-auto"
        />
      </div>

      <!-- Nombre de la bebida -->
      <div class="text-center mb-8">
        <h1 class="text-white text-4xl md:text-5xl font-bold">
          {{ result.beverage.name }}
        </h1>
      </div>

      <!-- Texto de usuarios -->
      <div class="mb-8 max-w-3xl text-center">
        <p class="text-white text-lg md:text-xl leading-relaxed">
          En Claro Media detectamos que, al igual que tú,
          <span class="text-red-500 font-bold"
            >{{ result.beverage.users }} Usuarios</span
          >
          se identifican con este coctel:
        </p>
      </div>

      <!-- Descripción de la bebida -->
      <div class="mb-12 max-w-2xl">
        <div
          class="bg-black bg-opacity-60 border-2 border-red-600 rounded-lg px-6 py-4"
        >
          <p class="text-white text-lg md:text-xl text-center leading-relaxed">
            {{ result.beverage.description }}
          </p>
        </div>
      </div>

      <!-- Botón Reclama tu bebida -->
      <div>
        <button
          @click="claimBeverage"
          :disabled="isClaiming"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105"
          :class="{ 'opacity-50 cursor-not-allowed': isClaiming }"
        >
          <span v-if="!isClaiming"> Reclama tu bebida </span>
          <span v-else class="flex items-center justify-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Procesando...
          </span>
        </button>
      </div>
    </div>

    <!-- Estado de carga -->
    <div v-else class="w-full h-full flex flex-col items-center justify-center">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"
        ></div>
        <h2 class="text-white text-2xl font-bold mb-2">
          Calculando tu resultado...
        </h2>
        <p class="text-white opacity-80">
          Analizando tus respuestas para encontrar tu bebida perfecta
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { calculateBeverage, beverages } from '../beverageLogic.js'
import { db } from '../firebase.js'
import { collection, addDoc } from 'firebase/firestore'

export default {
  name: 'Result',
  data() {
    return {
      result: null,
      isClaiming: false
    }
  },
  async mounted() {
    await this.calculateResult()
  },
  methods: {
    async calculateResult() {
      try {
        const answers = JSON.parse(localStorage.getItem('quizAnswers') || '{}')
        const calculation = calculateBeverage(answers)

        this.result = {
          ...calculation,
          beverage: beverages[calculation.beverage]
        }
      } catch (error) {
        console.error('Error calculating result:', error)
        this.$router.push('/')
      }
    },

    async claimBeverage() {
      this.isClaiming = true

      try {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}')
        const answers = JSON.parse(localStorage.getItem('quizAnswers') || '{}')

        // Guardar en Firestore
        await addDoc(collection(db, 'quiz_results'), {
          userData: userData,
          answers: answers,
          result: {
            beverage: this.result.beverage.name,
            score: this.result.score,
            allScores: this.result.allScores
          },
          timestamp: new Date(),
          claimed: true
        })

        // Ir a página de agradecimiento
        this.$router.push('/gracias')

      } catch (error) {
        console.error('Error saving to Firestore:', error)
        alert('Hubo un error al registrar tu resultado. Por favor intenta de nuevo.')
      } finally {
        this.isClaiming = false
      }
    }
  }
}
</script>
