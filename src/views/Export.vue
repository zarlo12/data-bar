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
              @click="downloadExcel"
              :disabled="!records.length || generating"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg text-base sm:text-lg transition-all duration-300"
              :class="{ 'opacity-50 cursor-not-allowed': !records.length || generating }"
            >
              {{ generating ? 'Generando archivo...' : '⬇️ Descargar Excel (.xlsx)' }}
            </button>
            <button
              @click="downloadCsv"
              :disabled="!records.length || generating"
              class="sm:flex-none bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg text-base transition-all duration-300"
              :class="{ 'opacity-50 cursor-not-allowed': !records.length || generating }"
            >
              CSV
            </button>
            <button
              @click="loadRecords"
              class="sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg"
            >
              🔄
            </button>
          </div>
          <p class="text-white text-xs opacity-70 mt-2 text-center sm:text-left">
            El .xlsx ya viene con formato, filtros y los teléfonos como texto.
            El CSV es solo por si necesitas subir los datos a otro sistema.
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
                      {{ formatDate(row.fecha) }} {{ row.hora }}
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
import {
  buildColumns,
  buildRows,
  buildBeverageTotals,
  buildDayTotals
} from '../exportWorkbook.js'

export default {
  name: 'Export',
  data() {
    return {
      records: [],
      loading: true,
      generating: false,
      error: null
    }
  },
  computed: {
    rows() {
      return buildRows(this.records)
    },
    previewRows() {
      return this.rows.slice(0, 15)
    },
    beverageTotals() {
      return buildBeverageTotals(this.records)
    },
    dayTotals() {
      return buildDayTotals(this.records)
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

    formatDate(date) {
      return date ? date.toLocaleDateString('es-MX') : ''
    },

    saveFile(blob, filename) {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },

    async downloadExcel() {
      this.generating = true

      try {
        // Carga diferida: ExcelJS pesa, y no tiene por qué descargarlo
        // cada participante que abre el quiz en la tableta
        const [excelModule, { buildWorkbook }] = await Promise.all([
          import('exceljs/dist/exceljs.min.js'),
          import('../exportWorkbook.js')
        ])

        // exceljs.min.js es UMD: según cómo lo empaquete el bundler,
        // el constructor puede venir en .default o en la raíz del módulo
        const ExcelJS = excelModule.default || excelModule

        const workbook = buildWorkbook(ExcelJS, this.records)
        const buffer = await workbook.xlsx.writeBuffer()
        const stamp = new Date().toISOString().slice(0, 10)

        this.saveFile(
          new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }),
          `data-bar-participantes-${stamp}.xlsx`
        )
      } catch (error) {
        console.error('Error generando el Excel:', error)
        alert('No se pudo generar el archivo de Excel. Revisa la consola.')
      } finally {
        this.generating = false
      }
    },

    escapeCsv(value) {
      const text = value === null || value === undefined ? '' : String(value)
      if (text.includes('"') || text.includes(';') || /[\n\r]/.test(text)) {
        return `"${text.replace(/"/g, '""')}"`
      }
      return text
    },

    downloadCsv() {
      const columns = buildColumns()
      const header = columns.map(c => this.escapeCsv(c.header)).join(';')
      const body = this.rows.map(row =>
        columns
          .map(c => {
            const value = c.get(row)
            return this.escapeCsv(c.fecha && value ? this.formatDate(value) : value)
          })
          .join(';')
      )

      // El BOM es lo que hace que los acentos y la ñ se vean bien
      const csv = '\uFEFF' + [header, ...body].join('\r\n')
      const stamp = new Date().toISOString().slice(0, 10)

      this.saveFile(
        new Blob([csv], { type: 'text/csv;charset=utf-8;' }),
        `data-bar-participantes-${stamp}.csv`
      )
    }
  }
}
</script>
