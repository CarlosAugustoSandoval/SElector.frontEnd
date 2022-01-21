<template>
  <v-card
      :color="chart && chart.color && data.type === 'Quantity' ? chart.color : ''"
      :dark="chart && !!chart.color && data.type === 'Quantity'"
  >
    <v-card-subtitle
      v-if="data.title"
      class="text-truncate"
    >
      <v-icon class="mr-1">{{ getIcon() }}</v-icon>
      {{ data.title }}
    </v-card-subtitle>
    <v-card-text>
      <loading v-model="loading" size="20" absolute/>
      <component
        v-if="chart"
        :is="`${data.type}Chart`"
        :chart-data="chart.data"
        :options="chart.options"
        :height="heightChart"
        :color="chart.color"
      />
      <div
          v-else
          class="text-center text--disabled"
      >
        No hay datos para graficar.
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import LineChart from '@/modules/charts/components/chartTypes/LineChart'
import PieChart from '@/modules/charts/components/chartTypes/PieChart'
import BarChart from '@/modules/charts/components/chartTypes/BarChart'
import TableChart from '@/modules/charts/components/chartTypes/TableChart'
import QuantityChart from '@/modules/charts/components/chartTypes/QuantityChart'
export default {
  name: 'ContainerChart',
  props: {
    data: {
      type: Object,
      default: null
    },
    heightChart: {
      type: Number,
      default: 200
    },
    stringFilterPack: {
      type: String,
      default: null
    },
    filterPack: {
      type: Boolean,
      default: false
    }
  },
  components: {
    LineChart,
    PieChart,
    BarChart,
    TableChart,
    QuantityChart
  },
  data: () => ({
    loading: false,
    chart: null,
    icon: null,
    icons: [
      { value: null, text: 'mdi-chart-box' },
      { value: 'Pie', text: 'mdi-chart-pie' },
      { value: 'Bar', text: 'mdi-chart-bar' },
      { value: 'Line', text: 'mdi-chart-line' },
      { value: 'Table', text: 'mdi-table' },
      { value: 'Quantity', text: 'mdi-card-bulleted' }
    ]
  }),
  watch: {
    data: {
      handler (val) {
        if (val && !this.filterPack) this.getCharts()
      },
      immediate: true,
      deep: true
    },
    stringFilterPack: {
      handler () {
        this.getCharts()
      },
      immediate: false
    }
  },
  methods: {
    getIcon () {
      try {
        return this.icons.find(x => x.value === this.data.type).text
      } catch (e) {
        return this.icons.find(x => x.value === null).text
      }
    },
    getCharts () {
      this.loading = true
      this.axios.get(`charts/${this.data.id}${this.stringFilterPack}`)
        .then(response => {
          if (response.data && !response.data.options) {
            response.data.options = {
              responsive: true
            }
          }
          this.chart = response.data
          this.loading = false
        })
        .catch(error => {
          this.$store.commit('SET_SNACKBAR', {
            color: 'error',
            message: `Error al recuperar los datos del gŕafico ${this.data.title}. ${error}`,
            error: error
          })
          this.loading = false
        })
    }
  }
}
</script>