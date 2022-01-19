<template>
  <v-container>
    <view-title>
      <template v-slot:action>
        <c-tooltip
            v-if="permissions.create"
            left
            tooltip="Crear reporte"
            :disabled="$vuetify.breakpoint.smAndUp"
        >
          <v-btn
              color="primary"
              depressed
              :small="!!$vuetify.breakpoint.xsOnly"
              :fab="$vuetify.breakpoint.xsOnly"
              @click.stop="createItem"
          >
            <v-icon v-if="$vuetify.breakpoint.xsOnly">mdi-plus</v-icon>
            {{ $vuetify.breakpoint.smAndUp ? 'Crear reporte' : '' }}
          </v-btn>
        </c-tooltip>
      </template>
    </view-title>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col
                  cols="12"
                  md="6"
                  offset-md="3"
              >
                <v-text-field
                    v-model="search"
                    placeholder="Buscar"
                    filled
                    solo
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    @input="searchReports"
                    clearable
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text
              v-if="!reportsFiltered.length"
              class="text-center body-1 grey--text"
          >
            No hay reportes para mostrar
          </v-card-text>
          <v-list
              v-else
              two-line
              class="py-0"
          >
            <template v-for="(report, indexReport) in reportsFiltered">
              <v-hover
                  v-slot:default="{ hover }"
                  :key="`reporte${indexReport}`"
              >
                <v-list-item @click="selectReport(report)">
                  <v-list-item-avatar class="my-1 align-self-center">{{ report.id }}</v-list-item-avatar>
                  <v-list-item-content class="pa-0">
                    <v-list-item-title><h5 class="mb-0 text-truncate">{{ report.nombre }}</h5></v-list-item-title>
                    <p class="grey--text fs-12 fw-normal ma-0">{{ report.descripcion }}</p>
                    <v-list-item-subtitle class="green--text" v-if="report.variables && !report.variables.length">
                      <v-icon color="green">mdi-arrow-down-bold-circle-outline</v-icon>
                      Descarga directa
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action v-if="hover && permissions.edit">
                    <v-btn
                        icon
                        color="warning"
                        @click.stop="editItem(report)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-hover>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <report-generator
        ref="reportGenerator"
        @loading="val => loading = val"
    />
    <report-register
        ref="itemRegister"
        @guardado="getReports"
    />
    <loading v-model="loading"/>
  </v-container>
</template>

<script>
import store from '@/store'

const ReportRegister = () => import('@/modules/reports/components/ReportRegister')
const ReportGenerator = () => import('@/modules/reports/components/ReportGenerator')

export default {
  name: 'Reports',
  components: {
    ReportRegister,
    ReportGenerator
  },
  data: () => ({
    debounce: require('lodash/debounce'),
    search: '',
    loading: false,
    reportsFull: [],
    reportsFiltered: []
  }),
  computed: {
    permissions() {
      return store.getters['authModule/permissionsByModule']('reports')
    }
  },
  created() {
    this.getReports()
  },
  methods: {
    searchReports: window.lodash.debounce(function () {
      this.reportsFiltered = this.search
          ? this.reportsFull.filter(x => (x.id === parseInt(this.search) || x.nombre.toLowerCase().search(this.search.toLowerCase()) > -1) || (x.descripcion.toLowerCase().search(this.search.toLowerCase()) > -1))
          : this.clone(this.reportsFull)
    }, 200),
    createItem() {
      this.$refs.itemRegister.open()
    },
    editItem(report) {
      this.$refs.itemRegister.open(report.id)
    },
    selectReport(report) {
      const copyReport = this.clone(report)
      copyReport.variables.map(x => {
        x.value = null
      })
      this.$refs.reportGenerator.open(copyReport)
    },
    getReports() {
      this.loading = true
      this.axios.get('reportes')
          .then(response => {
            this.reportsFull = response.data
            this.reportsFiltered = this.clone(this.reportsFull)
            this.loading = false
          })
          .catch(error => {
            this.$store.commit('SET_SNACKBAR', {
              color: 'error',
              message: 'al recuperar los registros de los reportes.',
              error: error
            })
            this.loading = false
          })
    }
  }
}
</script>

<style>
.CodeMirror-gutter-wrapper {
  left: -34px !important;
}

.CodeMirror-gutters {
  left: 0px !important;
}
</style>
