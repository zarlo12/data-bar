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

        <!-- Contenido de la pregunta -->
        <div class="content-card slide-up max-w-4xl" v-if="currentQuestion">
          <!-- Encabezado de pregunta -->
          <div class="text-center mb-8">
            <div
              class="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              Pregunta {{ questionNumber }} de {{ totalQuestions }}
            </div>
            <h2 class="main-title text-3xl">
              {{ currentQuestion.text }}
            </h2>
          </div>

          <!-- Barra de progreso -->
          <div class="progress-bar fade-in">
            <div class="progress-fill" :style="`width: ${progress}%`"></div>
          </div>

          <!-- Opciones de respuesta -->
          <div class="space-y-4 mb-8">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="option.id"
              @click="selectOption(option.id)"
              :class="[
                'question-option-tablet fade-in',
                selectedOption === option.id ? 'selected' : ''
              ]"
              :style="`animation-delay: ${0.1 + index * 0.1}s`"
            >
              <div class="flex items-center">
                <div
                  class="w-6 h-6 rounded-full border-2 border-current mr-4 flex-shrink-0 flex items-center justify-center"
                >
                  <div
                    v-if="selectedOption === option.id"
                    class="w-3 h-3 bg-current rounded-full"
                  ></div>
                </div>
                <span>{{ option.text }}</span>
              </div>
            </button>
          </div>

          <!-- Botones de navegación -->
          <div class="nav-buttons">
            <button
              @click="goBack"
              v-if="questionNumber > 1"
              class="btn-secondary-tablet w-32"
            >
              ← Anterior
            </button>
            <div v-else></div>

            <button
              @click="nextQuestion"
              :disabled="!selectedOption"
              class="btn-primary-tablet w-48"
              :class="{ 'opacity-50 cursor-not-allowed': !selectedOption }"
            >
              {{ isLastQuestion ? 'Ver Resultado →' : 'Siguiente →' }}
            </button>
          </div>
        </div>

        <!-- Indicador de progreso textual -->
        <div
          class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
        >
          <p class="text-sm opacity-80">
            {{ Math.round(progress) }}% completado
          </p>
        </div>
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
