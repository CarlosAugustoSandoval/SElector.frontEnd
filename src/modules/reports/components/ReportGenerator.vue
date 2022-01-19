<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="720px"
  >
    <v-card v-if="report">
      <loading v-model="loading" absolute/>
      <v-card-title class="py-0">
        <v-list-item-avatar
            color="primary"
            class="white--text"
        >
          {{ report.id }}
        </v-list-item-avatar>
        <v-list-item-content class="pa-0">
          <p class="title ma-0">{{ report.nombre }}</p>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
              large
              icon
              @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-card-title>
      <v-card-text class="py-0 body-1">
        {{ report.descripcion }}
      </v-card-text>
      <ValidationObserver ref="formVariables">
        <v-container v-if="report.variables && report.variables.length">
          <v-row
              justify="center"
              align="center"
          >
            Parámetros del Reporte
          </v-row>
          <v-row
              justify="center"
              align="center"
          >
            <template v-for="(variable, indexVariable) in report.variables">
              <v-col
                  class="pb-0"
                  cols="12"
                  sm="12"
                  md="6"
                  :key="`variable${indexVariable}`"
              >
                <c-text
                    v-if="variable.type === 'text' && !variable.parameter"
                    v-model="variable.value"
                    :label="variable.label"
                />
                <c-number
                    v-if="variable.type === 'number'"
                    v-model.number="variable.value"
                    :label="variable.label"
                    rules="min:0"
                    :min="0"
                    :step="0.1"
                    :vid="`input${variable.type}${indexVariable}`"
                    :name="variable.label"
                />
                <c-date-manual
                    v-if="variable.type === 'date'"
                    v-model="variable.value"
                    :label="variable.label"
                    :max="moment().format('YYYY-MM-DD')"
                />
              </v-col>
            </template>
          </v-row>
        </v-container>
        <v-card-actions v-if="report && report.variables && report.variables.length">
          <v-btn
              text
              :loading="loading"
              @click="close"
          >
            Cerrar
          </v-btn>
          <v-btn
              dark
              color="primary"
              :loading="loading"
              @click="download"
          >
            Descargar
          </v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ReportGenerator',
  data: () => ({
    dialog: false,
    loading: false,
    report: null
  }),
  methods: {
    download() {
      this.$refs.formVariables.validate().then(result => {
        if (result) {
          this.directDownload()
        }
      })
    },
    directDownload() {
      this.$emit('loading', true)
      this.loading = true
      let data = null
      if (this.report.variables?.length) {
        data = this.clone(this.report.variables).reduce(function (result, item) {
          result[item.ref.substr(1)] = item.value
          return result
        }, {})
      }
      this.axios({
        url: `ejecutar-reporte/${this.report.id}`,
        method: 'POST',
        data: data,
        responseType: 'blob'
      })
          .then((response) => {
            if (response.status === 204) {
              this.$store.commit('SET_SNACKBAR', {
                color: 'info',
                message: 'El reporte no contiene registros para exportar.'
              })
            } else {
              const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}))
              window.open(url, '_blank')
            }
            this.close()
          })
          .catch((error) => {
            this.$emit('loading', false)
            this.loading = false
            this.$store.commit('SET_SNACKBAR', {color: 'error', message: 'al descargar el reporte.', error: error})
          })
    },
    close() {
      this.$emit('loading', false)
      if (this.$refs?.formVariables) this.$refs.formVariables.reset()
      this.dialog = false
      this.loading = false
      setTimeout(() => {
        this.report = null
      }, 500)
    },
    open(report) {
      this.report = report
      if (report.variables && report.variables.length) {
        this.dialog = true
      } else {
        this.directDownload()
      }
    }
  }
}
</script>