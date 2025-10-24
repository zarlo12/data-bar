<template>
  <div
    class="w-full min-h-screen relative overflow-hidden bg-cover bg-center"
    style="background-image: url('/assets_base/4FondoPersonaTenue.png')"
  >
    <!-- Contenedor principal -->
    <div class="w-full min-h-screen flex flex-col px-8 py-8">
      <!-- Header del Bartender -->
      <div class="mb-8 text-center">
        <img
          src="/assets_base/3LogoClaromediaDataBar.png"
          alt="Data Bar Logo"
          class="h-16 md:h-20 w-auto mx-auto mb-4"
        />
        <h1 class="text-white text-3xl md:text-4xl font-bold mb-2">
          🍹 Panel del Bartender
        </h1>
        <p class="text-white text-lg opacity-80">
          Pedidos en tiempo real - Total: {{ orders.length }}
        </p>
      </div>

      <!-- Estadísticas rápidas -->
      <!-- <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div
          class="bg-black bg-opacity-60 border-2 border-red-600 rounded-lg p-4 text-center"
        >
          <div class="text-red-400 text-2xl font-bold">
            {{ getTotalByBeverage('Conversion Mule') }}
          </div>
          <div class="text-white text-sm">Conversion Mule</div>
        </div>
        <div
          class="bg-black bg-opacity-60 border-2 border-red-600 rounded-lg p-4 text-center"
        >
          <div class="text-red-400 text-2xl font-bold">
            {{ getTotalByBeverage('Affinity Spritz') }}
          </div>
          <div class="text-white text-sm">Affinity Spritz</div>
        </div>
        <div
          class="bg-black bg-opacity-60 border-2 border-red-600 rounded-lg p-4 text-center"
        >
          <div class="text-red-400 text-2xl font-bold">
            {{ getTotalByBeverage('Engagement Tonic') }}
          </div>
          <div class="text-white text-sm">Engagement Tonic</div>
        </div>
        <div
          class="bg-black bg-opacity-60 border-2 border-red-600 rounded-lg p-4 text-center"
        >
          <div class="text-red-400 text-2xl font-bold">
            {{ getTotalByBeverage('Data Brew') }}
          </div>
          <div class="text-white text-sm">Data Brew</div>
        </div>
        <div
          class="bg-black bg-opacity-60 border-2 border-red-600 rounded-lg p-4 text-center"
        >
          <div class="text-red-400 text-2xl font-bold">
            {{ getTotalByBeverage('Planters Punch') }}
          </div>
          <div class="text-white text-sm">Planters Punch</div>
        </div>
      </div> -->

      <!-- Lista de pedidos -->
      <div class="flex-1">
        <div
          class="bg-black bg-opacity-40 border-2 border-red-600 rounded-lg p-6"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-white text-2xl font-bold">📋 Pedidos Recientes</h2>
            <!-- <button
              @click="refreshOrders"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
              :disabled="loading"
            >
              <span v-if="!loading">🔄 Actualizar</span>
              <span v-else>⏳ Cargando...</span>
            </button> -->
          </div>

          <!-- Lista de pedidos -->
          <div class="space-y-4 max-h-96 overflow-y-auto">
            <div
              v-for="order in sortedOrders"
              :key="order.id"
              class="bg-black bg-opacity-60 border border-red-400 rounded-lg p-4 hover:bg-opacity-80 transition-all duration-300"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <span class="text-white text-lg font-bold mr-3">
                      👤 {{ order.userData.name }}
                    </span>
                    <span
                      class="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded"
                    >
                      {{ formatTime(order.timestamp) }}
                    </span>
                  </div>

                  <div class="text-red-400 text-xl font-bold mb-2">
                    🍹 {{ order.result.beverage }}
                  </div>
                </div>

                <div class="ml-4 text-right">
                  <button
                    @click="markAsServed(order.id)"
                    :class="[
                      'px-4 py-2 rounded-lg font-bold transition-all duration-300',
                      order.served 
                        ? 'bg-green-600 text-white cursor-default' 
                        : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    ]"
                    :disabled="order.served"
                  >
                    {{ order.served ? '✅ Servido' : '🔄 Marcar Servido' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Estado vacío -->
            <div v-if="orders.length === 0" class="text-center py-12">
              <div class="text-6xl mb-4">🍹</div>
              <p class="text-white text-xl">No hay pedidos aún</p>
              <p class="text-gray-400">
                Los pedidos aparecerán aquí en tiempo real
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-6 text-center">
        <button
          @click="goHome"
          class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
        >
          🏠 Volver al Inicio
        </button>
      </div>
    </div>

    <!-- Notificación de nuevo pedido -->
    <div
      v-if="showNewOrderNotification"
      class="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-500 animate-bounce"
    >
      <div class="flex items-center">
        <span class="text-2xl mr-2">🔔</span>
        <div>
          <div class="font-bold">¡Nuevo Pedido!</div>
          <div class="text-sm">
            {{ lastOrderName }} - {{ lastOrderBeverage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase.js'
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore'

export default {
  name: 'Bartender',
  data() {
    return {
      orders: [],
      loading: false,
      unsubscribe: null,
      showNewOrderNotification: false,
      lastOrderName: '',
      lastOrderBeverage: '',
      previousOrderCount: 0
    }
  },
  computed: {
    sortedOrders() {
      return [...this.orders].sort((a, b) => {
        // Primero los no servidos, luego por fecha más reciente
        if (a.served === b.served) {
          return b.timestamp.toDate() - a.timestamp.toDate()
        }
        return a.served ? 1 : -1
      })
    }
  },
  async mounted() {
    await this.setupRealtimeListener()
  },
  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  methods: {
    async setupRealtimeListener() {
      this.loading = true

      try {
        const q = query(
          collection(db, 'quiz_results'),
          orderBy('timestamp', 'desc')
        )

        this.unsubscribe = onSnapshot(q, (snapshot) => {
          const newOrders = []

          snapshot.forEach((doc) => {
            newOrders.push({
              id: doc.id,
              ...doc.data(),
              served: doc.data().served || false
            })
          })

          // Detectar nuevos pedidos
          if (newOrders.length > this.previousOrderCount && this.previousOrderCount > 0) {
            const newestOrder = newOrders[0]
            this.showNewOrderNotification = true
            this.lastOrderName = newestOrder.userData.name
            this.lastOrderBeverage = newestOrder.result.beverage

            // Ocultar notificación después de 5 segundos
            setTimeout(() => {
              this.showNewOrderNotification = false
            }, 5000)

            // Reproducir sonido de notificación (opcional)
            this.playNotificationSound()
          }

          this.orders = newOrders
          this.previousOrderCount = newOrders.length
          this.loading = false
        })

      } catch (error) {
        console.error('Error setting up real-time listener:', error)
        this.loading = false
      }
    },

    async markAsServed(orderId) {
      try {
        const orderRef = doc(db, 'quiz_results', orderId)
        await updateDoc(orderRef, {
          served: true,
          servedAt: new Date()
        })
      } catch (error) {
        console.error('Error marking order as served:', error)
      }
    },

    getTotalByBeverage(beverageName) {
      return this.orders.filter(order => order.result.beverage === beverageName).length
    },

    formatTime(timestamp) {
      if (!timestamp) return ''
      const date = timestamp.toDate()
      return date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    async refreshOrders() {
      // El listener en tiempo real ya maneja las actualizaciones
      // Este método es solo para feedback visual
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },

    playNotificationSound() {
      // Crear un sonido simple usando Web Audio API
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = context.createOscillator()
        const gainNode = context.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(context.destination)

        oscillator.frequency.value = 800
        oscillator.type = 'sine'

        gainNode.gain.setValueAtTime(0.3, context.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5)

        oscillator.start(context.currentTime)
        oscillator.stop(context.currentTime + 0.5)
      } catch (error) {
        console.log('Could not play notification sound:', error)
      }
    },

    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
/* Scrollbar personalizado */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #dc2626;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #b91c1c;
}
</style>
