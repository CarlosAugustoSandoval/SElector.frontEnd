<template>
  <v-container fluid>
    <view-title/>
    <v-row>
      <v-col
          cols="12"
          sm="12"
          md="12"
          lg="12"
          xl="8"
          offset-xl="2"
      >
        <v-tabs
            :vertical="$vuetify.breakpoint.mdAndUp"
            show-arrows
        >
          <template v-for="(item, indexItem) in packs">
            <v-tab
                :key="`tab-${indexItem}`"
                style="max-width: 250px !important; padding-left: 8px !important; padding-right: 8px !important;"
                :style="$vuetify.breakpoint.mdAndUp ? 'padding-top: 14px !important; display: block !important;' : ''"
                class="text-truncate"
            >
              <p class="text-start">{{ item.title }}</p>
            </v-tab>
          </template>
          <template v-for="(item, indexItem) in packs">
            <v-tab-item :key="`tab-item${indexItem}`">
              <v-container
                  fluid
                  :class="$vuetify.breakpoint.smAndDown ? 'pt-6' : ''"
              >
                <pack-chart
                    ref="packNo"
                    :init-pack="item"
                    external-filters
                    :height-chart="200"
                    :external-string-filter-init="externalStringFilterInit"
                >
                  <template v-slot:externalfilters>
                    <v-col
                        cols="2"
                        sm="1"
                        class="text-end"
                    >
                      <v-btn
                          color="primary"
                          icon
                          @click="reloadChart(indexItem, item.id)"
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </v-col>
                  </template>
                </pack-chart>
              </v-container>
            </v-tab-item>
          </template>
        </v-tabs>
      </v-col>
    </v-row>
    <loading v-model="loading"/>
  </v-container>
</template>

<script>
import PackChart from '@/modules/charts/components/PackChart'
export default {
  name: 'Indicadores',
  components: {
    PackChart
  },
  data: () => ({
    loading: false,
    packs: [],
    tab: null,
    externalStringFilterInit: ''
  }),
  created () {
    this.getPackx()
  },
  methods: {
    reloadChart(indexItem, id) {
      this.$refs.packNo[indexItem].packInit(id)
      if (this?.$refs?.municipio_id && this.$refs.municipio_id[indexItem]) {
        this.$refs.municipio_id[indexItem].internalValue = ''
      }
    },
    makeExternalFiltersString (indexItem) {
      let string = ''
      string = string + `municipio_id=${(this?.$refs?.municipio_id && this.$refs.municipio_id[indexItem]?.internalValue) || ''}`
      if(this?.$refs?.packNo && this?.$refs?.packNo[indexItem]) {
        this.$refs.packNo[indexItem].externalFilterStringDefine(string)
      } else {
        this.externalStringFilterInit = string
      }
    },
    getPackx () {
      this.loading = true
      this.axios.get('graphic_reports')
        .then(response => {
          this.packs = response.data
          this.loading = false
        })
        .catch(error => {
          this.$store.commit('SET_SNACKBAR', {
            color: 'error',
            message: 'Error al recuperar los packs de gráficas.',
            error: error
          })
          this.loading = false
        })
    }
  }
}
</script>
