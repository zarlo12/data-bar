<template>
  <div
    class="w-full min-h-screen relative overflow-auto bg-cover bg-center"
    style="background-image: url('/assets_base/4FondoPersonaTenue.png')"
  >
    <div class="w-full min-h-screen flex flex-col px-4 py-6 sm:px-6 md:px-8">
      <!-- Header -->
      <div class="mb-6 text-center">
        <img
          src="/assets_base/3LogoClaromediaDataBar.png"
          alt="Data Bar Logo"
          class="h-12 sm:h-16 lg:h-20 w-auto mx-auto mb-3 max-w-[90vw]"
        />
        <h1 class="text-white text-xl sm:text-2xl md:text-3xl font-bold">
          📊 Exportar información
        </h1>
      </div>

      <!-- Cargando -->
      <div v-if="loading" class="flex-1 flex flex-col items-center justify-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"
        ></div>
        <p class="text-white text-lg">Leyendo registros...</p>
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="max-w-2xl mx-auto bg-black bg-opacity-60 border-2 border-red-600 rounded-lg p-6 text-center"
      >
        <p class="text-white text-lg mb-4">
          No se pudo leer la base de datos.
        </p>
        <p class="text-gray-300 text-sm mb-6">{{ error }}</p>
        <button
          @click="loadRecords"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg"
        >
          Reintentar
        </button>
      </div>

      <template v-else>
        <!-- Resumen -->
        <div class="max-w-5xl w-full mx-auto mb-6">
          <div
            class="bg-black bg-opacity-50 border-2 border-red-600 rounded-lg p-4 sm:p-6"
          >
            <div class="flex flex-wrap gap-x-8 gap-y-4 mb-6">
              <div class="text-center min-w-[90px]">
                <div class="text-red-400 text-3xl sm:text-4xl font-bold">
                  {{ records.length }}
                </div>
                <div class="text-white text-xs sm:text-sm opacity-80">
                  Participaciones
                </div>
              </div>
              <div
                v-for="item in beverageTotals"
                :key="item.name"
                class="text-center min-w-[90px]"
              >
                <div class="text-white text-2xl sm:text-3xl font-bold">
                  {{ item.total }}
                </div>
                <div class="text-white text-xs sm:text-sm opacity-80">
                  {{ item.name }}
                </div>
              </div>
            </div>

            <!-- Por día -->
            <div v-if="dayTotals.length" class="border-t border-red-800 pt-4">
              <h2 class="text-white text-sm font-bold mb-2 opacity-80">
                POR DÍA
              </h2>
              <div class="flex flex-wrap gap-x-6 gap-y-1">
                <span
                  v-for="day in dayTotals"
                  :key="day.label"
                  class="text-white text-sm"
                >
                  {{ day.label }}:
                  <span class="text-red-400 font-bold">{{ day.total }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones de descarga -->
        <div class="max-w-5xl w-full mx-auto mb-6">
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="downloadCsv(';')"
              :disabled="!records.length"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg text-base sm:text-lg transition-all duration-300"
              :class="{ 'opacity-50 cursor-not-allowed': !records.length }"
            >
              ⬇️ Descargar para Excel
            </button>
            <button
              @click="downloadCsv(',')"
              :disabled="!records.length"
              class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg text-base sm:text-lg transition-all duration-300"
              :class="{ 'opacity-50 cursor-not-allowed': !records.length }"
            >
              ⬇️ CSV separado por comas
            </button>
            <button
              @click="loadRecords"
              class="sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg"
            >
              🔄
            </button>
          </div>
          <p class="text-white text-xs opacity-70 mt-2 text-center sm:text-left">
            Si al abrirlo en Excel todo cae en una sola columna, usa el otro
            botón: cambia el separador.
          </p>
        </div>

        <!-- Vista previa -->
        <div class="max-w-5xl w-full mx-auto flex-1">
          <div
            class="bg-black bg-opacity-50 border-2 border-red-600 rounded-lg p-3 sm:p-4"
          >
            <h2 class="text-white text-sm font-bold mb-3 opacity-80">
              VISTA PREVIA — {{ previewRows.length }} de {{ records.length }}
            </h2>

            <div v-if="!records.length" class="text-center py-10">
              <div class="text-5xl mb-3">📭</div>
              <p class="text-white text-lg">Todavía no hay registros</p>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full text-left text-white text-xs sm:text-sm">
                <thead>
                  <tr class="border-b border-red-800">
                    <th class="py-2 pr-4 whitespace-nowrap opacity-70">Fecha</th>
                    <th class="py-2 pr-4 whitespace-nowrap opacity-70">Nombre</th>
                    <th class="py-2 pr-4 whitespace-nowrap opacity-70">Email</th>
                    <th class="py-2 pr-4 whitespace-nowrap opacity-70">Teléfono</th>
                    <th class="py-2 pr-4 whitespace-nowrap opacity-70">Bebida</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in previewRows"
                    :key="row.id"
                    class="border-b border-gray-800"
                  >
                    <td class="py-2 pr-4 whitespace-nowrap opacity-80">
                      {{ row.fecha }} {{ row.hora }}
                    </td>
                    <td class="py-2 pr-4 whitespace-nowrap">{{ row.nombre }}</td>
                    <td class="py-2 pr-4 whitespace-nowrap opacity-80">
                      {{ row.email }}
                    </td>
                    <td class="py-2 pr-4 whitespace-nowrap opacity-80">
                      {{ row.telefono }}
                    </td>
                    <td class="py-2 pr-4 whitespace-nowrap text-red-400 font-bold">
                      {{ row.bebida }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>

      <!-- Footer -->
      <div class="mt-6 text-center">
        <button
          @click="$router.push('/')"
          class="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-8 rounded-lg"
        >
          🏠 Volver al Inicio
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase.js'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { questions, beverages, beverageNames } from '../beverageLogic.js'

export default {
  name: 'Export',
  data() {
    return {
      records: [],
      loading: true,
      error: null
    }
  },
  computed: {
    // Una fila plana por participante, lista para la tabla y para el CSV
    rows() {
      return this.records.map(record => {
        const user = record.userData || {}
        const result = record.result || {}
        const answers = record.answers || {}
        const date = this.toDate(record.timestamp)

        const row = {
          id: record.id,
          fecha: date ? date.toLocaleDateString('es-MX') : '',
          hora: date ? date.toLocaleTimeString('es-MX') : '',
          nombre: user.name || '',
          cedula: user.cedula || '',
          telefono: user.phone || '',
          email: user.email || '',
          nit: user.nit || '',
          terminos: user.acceptTerms ? 'Sí' : 'No',
          bebida: result.beverage || '',
          puntaje: result.score ?? ''
        }

        // Puntaje que obtuvo cada bebida
        beverageNames.forEach(key => {
          row[`puntaje_${key}`] = result.allScores?.[key] ?? ''
        })

        // Respuesta de cada pregunta: la letra y el texto completo
        questions.forEach(question => {
          const optionId = answers[question.id] || ''
          const option = question.options.find(o => o.id === optionId)
          row[`${question.id}_opcion`] = optionId
          row[`${question.id}_respuesta`] = option ? option.text.trim() : ''
        })

        row.reclamado = record.claimed ? 'Sí' : 'No'
        row.servido = record.served ? 'Sí' : 'No'
        const servedAt = this.toDate(record.servedAt)
        row.hora_servido = servedAt ? servedAt.toLocaleString('es-MX') : ''

        return row
      })
    },

    previewRows() {
      return this.rows.slice(0, 15)
    },

    // Encabezados del CSV, en el mismo orden que las columnas de cada fila
    columns() {
      const base = [
        ['fecha', 'Fecha'],
        ['hora', 'Hora'],
        ['nombre', 'Nombre'],
        ['cedula', 'Cédula'],
        ['telefono', 'Teléfono'],
        ['email', 'Email'],
        ['nit', 'NIT'],
        ['terminos', 'Aceptó términos'],
        ['bebida', 'Bebida'],
        ['puntaje', 'Puntaje']
      ]

      beverageNames.forEach(key => {
        base.push([`puntaje_${key}`, `Puntos ${beverages[key].name}`])
      })

      questions.forEach(question => {
        base.push([`${question.id}_opcion`, `${question.id} opción`])
        base.push([`${question.id}_respuesta`, `${question.id} — ${question.text}`])
      })

      base.push(['reclamado', 'Reclamado'])
      base.push(['servido', 'Servido'])
      base.push(['hora_servido', 'Hora en que se sirvió'])
      base.push(['id', 'ID del registro'])

      return base
    },

    beverageTotals() {
      const counts = new Map()

      // Se cuenta por el nombre guardado en cada registro, no por el catálogo
      // actual: en la base quedaron resultados con los nombres anteriores.
      beverageNames.forEach(key => counts.set(beverages[key].name, 0))
      this.records.forEach(record => {
        const name = record.result?.beverage || 'Sin bebida'
        counts.set(name, (counts.get(name) || 0) + 1)
      })

      return [...counts.entries()]
        .map(([name, total]) => ({ name, total }))
        .sort((a, b) => b.total - a.total)
    },

    dayTotals() {
      const counts = new Map()
      this.records.forEach(record => {
        const date = this.toDate(record.timestamp)
        if (!date) return
        const label = date.toLocaleDateString('es-MX')
        counts.set(label, (counts.get(label) || 0) + 1)
      })
      return [...counts.entries()]
        .map(([label, total]) => ({ label, total }))
        .sort((a, b) => a.label.localeCompare(b.label))
    }
  },
  async mounted() {
    await this.loadRecords()
  },
  methods: {
    async loadRecords() {
      this.loading = true
      this.error = null

      try {
        const snapshot = await getDocs(
          query(collection(db, 'quiz_results'), orderBy('timestamp', 'desc'))
        )
        this.records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      } catch (error) {
        console.error('Error leyendo quiz_results:', error)
        this.error = error.message || String(error)
      } finally {
        this.loading = false
      }
    },

    // Firestore devuelve Timestamp, pero un registro viejo puede traer Date o nada
    toDate(value) {
      if (!value) return null
      if (typeof value.toDate === 'function') return value.toDate()
      const date = new Date(value)
      return isNaN(date.getTime()) ? null : date
    },

    escapeCsv(value, delimiter) {
      const text = value === null || value === undefined ? '' : String(value)
      if (text.includes('"') || text.includes(delimiter) || /[\n\r]/.test(text)) {
        return `"${text.replace(/"/g, '""')}"`
      }
      return text
    },

    downloadCsv(delimiter) {
      const header = this.columns
        .map(([, label]) => this.escapeCsv(label, delimiter))
        .join(delimiter)

      const body = this.rows.map(row =>
        this.columns
          .map(([key]) => this.escapeCsv(row[key], delimiter))
          .join(delimiter)
      )

      // El BOM es lo que hace que Excel respete acentos y ñ
      const csv = '﻿' + [header, ...body].join('\r\n')
      const stamp = new Date().toISOString().slice(0, 10)

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `data-bar-participantes-${stamp}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }
}
</script>
