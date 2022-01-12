<template>
  <c-tooltip
      left
      tooltip="Exportar"
      :disabled="$vuetify.breakpoint.smAndUp"
  >
    <v-btn
        dark
        color="green"
        class="ml-2"
        depressed
        :small="!!$vuetify.breakpoint.xsOnly"
        :fab="$vuetify.breakpoint.xsOnly"
        :loading="loading"
        @click="downloadExel"
    >
      <v-icon>mdi-file-excel</v-icon>
      {{$vuetify.breakpoint.smAndUp ? 'Exportar' : ''}}
    </v-btn>
  </c-tooltip>
</template>

<script>

export default {
  name: 'ExportExcel',
  props: {
    route: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    downloadExel () {
      this.loading = true
      this.axios( {
        url: this.route, //your url
        method: 'GET',
        responseType: 'blob', // important
      }).then(response => {
        if(response.data){
          //Create a Blob from the PDF Stream
          const file = new Blob(
              [response.data],
              {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
          const fileURL = URL.createObjectURL(file)
          const a = document.createElement('a')
          document.body.appendChild(a)
          a.style = 'display: none'
          a.href = fileURL
          a.download = `Electores${this.moment().format('YYYYMMDDHHmmss')}.xlsx`
          a.click()
          this.loading = false
        }
      }).catch(error => {
        this.loading = false
        this.$store.commit('SET_SNACKBAR', { color: 'error', message: `Error ${error?.response?.status || ''} al exportar los registros.`, error: error })
      })
    }
  }
}
</script>