<template>
  <div
    class="w-full h-screen relative overflow-hidden bg-cover bg-center"
    style="background-image: url('/assets_base/4FondoPersonaTenue.png')"
  >
    <!-- Contenedor principal -->
    <div
      class="w-full h-full flex flex-col items-center justify-center px-8 py-16"
      v-if="currentQuestion"
    >
      <!-- Logo en la parte superior -->
      <div class="mb-12">
        <img
          src="/assets_base/3LogoClaromediaDataBar.png"
          alt="Claro Media Data Bar Logo"
          class="h-32 md:h-40 lg:h-48 w-auto"
        />
      </div>

      <!-- Pregunta centrada -->
      <div class="text-center mb-12">
        <h2
          class="text-white text-2xl md:text-3xl font-bold leading-tight max-w-2xl"
        >
          {{ currentQuestion.text }}
        </h2>
      </div>

      <!-- Opciones de respuesta -->
      <div class="w-full max-w-2xl space-y-4 mb-12">
        <button
          v-for="option in currentQuestion.options"
          :key="option.id"
          @click="selectOption(option.id)"
          :class="[
            'w-full px-6 py-4 bg-black bg-opacity-40 rounded-lg text-white text-left text-lg hover:bg-opacity-60 transition-all duration-300',
            selectedOption === option.id 
              ? 'border-4 border-red-400 bg-red-600 bg-opacity-20 shadow-lg shadow-red-500/50' 
              : 'border-2 border-red-600'
          ]"
        >
          <span class="text-red-400 font-bold mr-3">{{ option.id }})</span>
          <span>{{ option.text }}</span>
        </button>
      </div>

      <!-- Botón Siguiente -->
      <div>
        <button
          @click="nextQuestion"
          :disabled="!selectedOption"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105"
          :class="{ 'opacity-50 cursor-not-allowed': !selectedOption }"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { questions } from '../beverageLogic.js'

export default {
  name: 'Question',
  props: {
    questionNumber: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedOption: null,
      questions: questions,
      totalQuestions: questions.length
    }
  },
  computed: {
    currentQuestion() {
      const questionIndex = parseInt(this.questionNumber) - 1
      return this.questions[questionIndex]
    },
    isLastQuestion() {
      return parseInt(this.questionNumber) === this.totalQuestions
    },
    progress() {
      return (parseInt(this.questionNumber) / this.totalQuestions) * 100
    }
  },
  watch: {
    questionNumber: {
      immediate: true,
      handler() {
        this.loadSavedAnswer()
      }
    }
  },
  methods: {
    selectOption(optionId) {
      this.selectedOption = optionId
    },
    loadSavedAnswer() {
      const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '{}')
      const questionId = this.currentQuestion?.id
      if (questionId && savedAnswers[questionId]) {
        this.selectedOption = savedAnswers[questionId]
      } else {
        this.selectedOption = null
      }
    },
    saveAnswer() {
      if (!this.selectedOption) return

      const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '{}')
      savedAnswers[this.currentQuestion.id] = this.selectedOption
      localStorage.setItem('quizAnswers', JSON.stringify(savedAnswers))
    },
    nextQuestion() {
      if (!this.selectedOption) return

      this.saveAnswer()

      if (this.isLastQuestion) {
        this.$router.push('/resultado')
      } else {
        const nextNumber = parseInt(this.questionNumber) + 1
        this.$router.push(`/pregunta/${nextNumber}`)
      }
    },
    goBack() {
      const prevNumber = parseInt(this.questionNumber) - 1
      if (prevNumber === 0) {
        this.$router.push('/datos')
      } else {
        this.$router.push(`/pregunta/${prevNumber}`)
      }
    }
  }
}
</script>
