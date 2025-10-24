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
        
        <!-- Resultado principal -->
        <div class="result-card slide-up" v-if="result">
          <!-- Título del resultado -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-600 mb-2">
              ¡Tu bebida perfecta es!
            </h2>
            <h1 class="beverage-title">
              {{ result.beverage.name }}
            </h1>
          </div>
          
          <!-- Imagen de la bebida -->
          <div class="mb-8 fade-in" style="animation-delay: 0.3s">
            <div class="relative inline-block">
              <img 
                :src="result.beverage.image" 
                :alt="result.beverage.name"
                class="beverage-image shadow-2xl"
              />
              <!-- Efecto de brillo alrededor de la imagen -->
              <div class="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur-xl -z-10 transform scale-110"></div>
            </div>
          </div>
          
          <!-- Descripción -->
          <div class="mb-10 fade-in" style="animation-delay: 0.5s">
            <p class="beverage-description">
              {{ result.beverage.description }}
            </p>
          </div>
          
          <!-- Botón de reclamar -->
          <div class="fade-in" style="animation-delay: 0.7s">
            <button 
              @click="claimBeverage"
              class="btn-primary-tablet text-2xl py-8 relative overflow-hidden"
              :disabled="isClaiming"
              :class="{ 'opacity-75 cursor-not-allowed': isClaiming }"
            >
              <span v-if="!isClaiming" class="relative z-10">
                🍹 Reclamar tu bebida
              </span>
              <span v-else class="relative z-10 flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </span>
            </button>
          </div>
          
          <!-- Información adicional -->
          <div class="mt-8 pt-6 border-t border-gray-200 fade-in" style="animation-delay: 0.9s">
            <div class="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div class="text-center">
                <div class="font-semibold text-gray-700">Tu puntuación</div>
                <div class="text-2xl font-bold text-red-600">{{ result.score }}</div>
              </div>
              <div class="w-px h-12 bg-gray-300"></div>
              <div class="text-center">
                <div class="font-semibold text-gray-700">Compatibilidad</div>
                <div class="text-2xl font-bold text-red-600">{{ Math.round((result.score / 5) * 100) }}%</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Estado de carga -->
        <div v-else class="content-card text-center">
          <div class="py-12">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              Calculando tu resultado...
            </h2>
            <p class="text-gray-600">
              Analizando tus respuestas para encontrar tu bebida perfecta
            </p>
          </div>
        </div>
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