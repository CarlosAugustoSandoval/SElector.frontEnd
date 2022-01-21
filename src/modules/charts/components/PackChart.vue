<template>
  <v-card
      tile
      flat
  >
    <filters-pack
      v-if='(pack && pack.filters && pack.filters.length) || externalFilters'
      :filters='pack ? pack.filters : []'
      @reloadFilter='val => filterStringDefine(val)'
    >
      <template v-slot:externalfilters>
        <slot name='externalfilters'/>
      </template>
    </filters-pack>
    <loading
        v-model="loading"
        absolute
        class="ma-12"
    />
    <v-row
      v-if="pack"
      justify="center"
    >
      <template v-for='(dataChart, indexChart) in pack.charts'>
        <v-col
          :key='`Chart${indexChart}`'
          cols='12'
          :sm='dataChart.sm'
          :md='dataChart.md'
          :lg='dataChart.lg'
          :xl='dataChart.xl'
        >
          <container-chart
            :data='dataChart'
            :string-filter-pack='stringFilterTotal'
            :filter-pack='pack.filters && pack.filters.length > 0'
            :height-chart="dataChart.height"
          />
        </v-col>
      </template>
    </v-row>
  </v-card>
</template>

<script>
import ContainerChart from '@/modules/charts/components/ContainerChart'
import FiltersPack from './FiltersPack'
export default {
  name: 'PackChart',
  props: {
    initPack: {
      type: Object,
      default: null
    },
    heightChart: {
      type: Number,
      default: 200
    },
    externalFilters: {
      type: Boolean,
      default: false
    },
    externalStringFilterInit: {
      type: String,
      default: ''
    }
  },
  components: {
    FiltersPack,
    ContainerChart
  },
  data: () => ({
    loading: false,
    stringFilter: '',
    externalStringFilter: '',
    stringFilterTotal: '',
    pack: null
  }),
  watch: {
    initPack: {
      handler (val) {
        if (val) {
          this.getPack(val.id)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    externalFilterStringDefine (stringFilter) {
      this.externalStringFilter = stringFilter
      this.stringDefine()
    },
    filterStringDefine (stringFilter) {
      this.stringFilter = stringFilter
      this.stringDefine()
    },
    stringDefine () {
      let string = this.stringFilter ? ((this.stringFilter.indexOf('?') > -1 ? '&' : '?') + this.stringFilter) : ''
      const external = this.externalStringFilter || this.externalStringFilterInit
      string = string + (external ? ((string ? '&' : (external.indexOf('?') > -1 ? '&' : '?')) + external) : '')
      this.stringFilterTotal = string
    },
    filterDefine () {
      this.$set(
        this.pack,
        'filters',
        [
          {
            type: 'dateRange',
            vmodel: [],
            label: 'Periodo',
            period: this.pack.range_default || 'today'
          }
        ]
      )
    },
    packInit (id) {
      this.pack = null
      this.stringFilter = ''
      this.externalStringFilter = ''
      this.stringFilterTotal = ''
      this.getPack(id)
    },
    getPack (id) {
      this.loading = true
      this.axios.get(`graphic_reports/${id}`)
        .then(response => {
          this.pack = response.data
          if (this.pack.range_default) {
            this.filterDefine()
          } else {
            this.pack.filters = []
          }
          this.loading = false
        })
        .catch(error => {
          this.$store.commit('SET_SNACKBAR', {
            color: 'error',
            message: `Error al recuperar el pack con id: ${id}.`,
            error: error
          })
          this.loading = false
        })
    }
  }
}
</script>