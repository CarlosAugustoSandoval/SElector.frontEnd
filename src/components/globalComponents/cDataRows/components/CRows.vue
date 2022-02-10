<template>
  <div>
    <v-row justify="center">
      <v-col cols="12">
        <div class="d-flex">
          <v-select
              v-if="isOnline"
              v-model="dataPagination.itemsPerPage"
              :items="optionsPerPage"
              item-text="text"
              item-value="value"
              @change="reloadCurrentPage"
              hide-details
              outlined
              dense
              prepend-inner-icon="mdi-table-row"
              style="max-width: 120px"
              class="mr-2"
          />
          <v-select
              v-model="selectHeaders"
              :items="makeHeaders.filter(x => x.visibleColumnSelectable)"
              item-text="text"
              item-value="id"
              return-object
              hide-details
              multiple
              outlined
              prepend-inner-icon="mdi-table-column"
              style="max-width: 120px"
              dense
          >
            <template
                slot="selection"
                slot-scope="{ item, index }"
            >
              <span
                  v-if="index === 0"
                  class="body-2 text-truncate"
              >
                  {{
                  `${selectHeaders.filter(x => x.visibleColumnSelectable).length} de ${makeHeaders.filter(x => x.visibleColumnSelectable).length}`
                }}
              </span>
            </template>
          </v-select>
        </div>
      </v-col>
    </v-row>
    <v-col
        cols="12"
        :md="exportExcel ? 10 : 8"
        :lg="exportExcel ? 8 : 6"
        class="mx-auto"
    >
      <v-text-field
          v-model="searchRows"
          placeholder="Buscar..."
          prepend-inner-icon="mdi-magnify"
          dense
          filled
          rounded
          hide-details
          clearable
          class="searchRows mt-2 mb-1"
          @keyup.enter="reloadCurrentPage"
      >
        <template v-slot:prepend>
          <v-btn
              icon
              large
              color="primary"
              @click="reloadCurrentPage"
          >
            <v-icon large>mdi-sync</v-icon>
          </v-btn>
        </template>
        <template
            v-if="(advanceFilters || exportExcel) && isOnline"
            v-slot:append-outer
        >
          <c-row-filters
              :title="filtersTitle"
              :subtitle="filtersSubtitle"
              :max-width="filtersMaxWidth"
          >
            <template v-slot:filters>
              <slot name="filters"/>
            </template>
          </c-row-filters>
          <export-excel
              v-if="exportExcel && isOnline"
              :route="urlStringExport"
              :count="(dataPagination && dataPagination.itemsLength) || null"
          />
        </template>
      </v-text-field>
    </v-col>
    <slot
        v-if="isOnline"
        name="filterstags"
        v-bind="{ tags: filtersTags }"
    />
    <div
        class="mt-1"
        style="position: relative !important;"
    >
      <slot
          name="rows"
          v-bind="{ items: items, headers: rowsHeaders, loading: loading }"
      />
    </div>
    <template v-if="dataPagination && isOnline">
      <div
          v-if="footerPagination"
          class="mt-15"
      >
        <div
            style="left: 0 !important; right: 0 !important; bottom: 0 !important; position: fixed !important;"
        >
          <v-sheet
              tile
              elevation="5"
          >
            <v-container>
              <template v-if="dataPagination.lastPage && dataPagination.itemsLength">
                <v-row align="center" justify="center">
                <span class="title grey--text text--darken-1 text-center caption mt-1">
                  {{ `Registros del ${dataPagination.from} al ${dataPagination.to} de ${dataPagination.itemsLength}` }}
                </span>
                </v-row>
                <v-row align="center" justify="center">
                  <v-pagination
                      class="my-1"
                      circle
                      v-model="dataPagination.currentPage"
                      :total-visible="totalVisiblePagination"
                      :length="dataPagination.lastPage"
                      @input="reloadPage"
                  />
                </v-row>
              </template>
              <v-row
                  v-else
                  align="center"
                  justify="center"
              >
                <div
                    style="display: inline-flex !important;"
                    class="ma-2"
                >
                  <div
                      class="mr-0 ml-3"
                      :style="`margin-top: ${!dataPagination.prev ? '5' : '4'}px !important;`"
                  >
                    <v-btn
                        fab
                        x-small
                        elevation="2"
                        :disabled="!dataPagination.prev"
                        @click="() => {
                  dataPagination.currentPage = dataPagination.prev
                  reloadPage()
                }"
                    >
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                  </div>

                  <div class="mx-2">
                    <v-progress-circular
                        v-if="loading"
                        indeterminate
                        color="primary"
                    />
                    <v-avatar
                        v-else
                        size="40"
                        color="primary"
                        class="white--text elevation-2"
                    >
                      {{dataPagination.currentPage}}
                    </v-avatar>
                  </div>

                  <div
                      class="ml-0 mr-3"
                      :style="`margin-top: ${!dataPagination.next ? '5' : '4'}px !important;`"
                  >
                    <v-btn
                        fab
                        x-small
                        elevation="2"
                        :disabled="!dataPagination.next"
                        @click="() => {
                  dataPagination.currentPage = dataPagination.next
                  reloadPage()
                }"
                    >
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-row>
            </v-container>
          </v-sheet>
        </div>
      </div>
      <div v-else class="text-center mt-1">
        <template v-if="dataPagination.lastPage && dataPagination.itemsLength">
          <span class="title grey--text text--darken-1 text-center caption pa-1">
          {{ `Registros del ${dataPagination.from} al ${dataPagination.to} de ${dataPagination.itemsLength}` }}
        </span>
          <v-pagination
              circle
              v-model="dataPagination.currentPage"
              :total-visible="totalVisiblePagination"
              :length="dataPagination.lastPage"
              @input="reloadPage"
          />
        </template>
        <div
            v-else
            style="display: inline-flex !important;"
            class="ma-2"
        >
          <div
              class="mr-0 ml-3"
              :style="`margin-top: ${!dataPagination.prev ? '5' : '4'}px !important;`"
          >
            <v-btn
                fab
                x-small
                elevation="2"
                :disabled="!dataPagination.prev"
                @click="() => {
                  dataPagination.currentPage = dataPagination.prev
                  reloadPage()
                }"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </div>

          <div class="mx-2">
            <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
            />
            <v-avatar
                v-else
                size="40"
                color="primary"
                class="white--text elevation-2"
            >
              {{dataPagination.currentPage}}
            </v-avatar>
          </div>

          <div
              class="ml-0 mr-3"
              :style="`margin-top: ${!dataPagination.next ? '5' : '4'}px !important;`"
          >
            <v-btn
                fab
                x-small
                elevation="2"
                :disabled="!dataPagination.next"
                @click="() => {
                  dataPagination.currentPage = dataPagination.next
                  reloadPage()
                }"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import store from '@/store'
import RowsManager from '../data/RowsManager'
import CRowFilters from './CRowFilters'
import ExportExcel from './ExportExcel'

export default {
  name: 'CRows',
  props: {
    exportExcel: {
      type: Boolean,
      default: false
    },
    advanceFilters: {
      type: Boolean,
      default: false
    },
    filtersTitle: {
      type: String,
      default: ''
    },
    filtersSubtitle: {
      type: String,
      default: ''
    },
    filtersMaxWidth: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    footerPagination: {
      type: Boolean,
      default: true
    },
    itemsLoading: {
      type: Boolean,
      default: false
    },
    initialRun: {
      type: Boolean,
      default: true
    },
    makeHeaders: {
      type: Array,
      default: () => []
    },
    route: {
      type: String,
      default: ''
    },
    dispatch: {
      type: String,
      default: ''
    },
    totalVisiblePagination: {
      type: Number,
      default: 5
    },
    optionsPerPage: {
      type: Array,
      default: () =>
          [
            {
              text: 15,
              value: 15
            },
            {
              text: 30,
              value: 30
            },
            {
              text: 50,
              value: 50
            },
            {
              text: 100,
              value: 100
            },
            {
              text: 200,
              value: 200
            },
            {
              text: 500,
              value: 500
            }
          ]
    },
  },
  components: {
    ExportExcel,
    CRowFilters
  },
  computed: {
    stateDataRow() {
      return store.getters['myDataRow'](this.name)
    }
  },
  watch: {
    isOffline: {
      handler(val) {
        if (val) this.reloadCurrentPage()
      },
      immediate: true
    },
    'stateDataRow.filters': {
      handler() {
        this.reloadCurrentPage()
      },
      immediate: false
    },
    'stateDataRow.changes': {
      handler() {
        this.reloadCurrentPage()
      },
      immediate: false
    },
    route: {
      handler(val) {
        if (val) this.reloadCurrentPage()
      },
      immediate: false
    },
    searchRows: {
      handler(val) {
        if (!val) this.reloadPage()
      },
      immediate: false
    },
    selectHeaders: {
      handler(val) {
        if (this.name) {
          store.commit('SET_DATA_ROWS_HEADERS', {
            name: this.name,
            version: this.constDataRow?.version || 1,
            headers: val
          })
        }
        this.reloadRowsHeaders()
      },
      immediate: false
    }
  },
  data: () => ({
    debounce: require('lodash/debounce'),
    urlStringExport: null,
    constDataRow: null,
    sortString: '',
    filterString: '',
    selectHeaders: [],
    rowsHeaders: [],
    loading: false,
    activePetition: true,
    items: [],
    searchRows: '',
    dataPagination: {
      currentPage: 1,
      lastPage: 1,
      itemsLength: 0,
      itemsPerPage: 0,
      from: 1,
      to: 1
    },
    filtersTags: {}
  }),
  created() {
    this.dataPagination.itemsPerPage = this.optionsPerPage[0].value
    if (this.name) this.constDataRow = RowsManager.find(x => x.name === this.name)
    this.reloadHeaders()
    this.loading = this.initialRun
  },
  mounted() {
    setTimeout(() => {
      if (this.route && this.initialRun) {
        this.reloadCurrentPage()
      }
    }, 300)
  },
  methods: {
    reloadRowsHeaders() {
      this.rowsHeaders = JSON.parse(JSON.stringify(this.stateDataRow?.headers || this.makeHeaders)).sort((a, b) => {
        if (a.id > b.id) return 1
        if (a.id < b.id) return -1
        return 0
      })
    },
    reloadHeaders() {
      this.makeHeaders.forEach((item, index) => {
        item.id = index
        item.visibleColumn = item.visibleColumn !== false
        item.visibleColumnSelectable = item.visibleColumnSelectable !== false
        item.disabled = !(item.columnSelectable !== false)
        item.sortable = !!item.sortable
        item.text = item.text || ''
      })
      store.commit('SET_DATA_ROWS_HEADERS', {
        name: this.name,
        version: this.constDataRow?.version || 1,
        headers: this.constDataRow?.version !== this.stateDataRow?.version
            ? this.makeHeaders.filter(x => x.visibleColumn)
            : this.stateDataRow.headers
      })
      this.selectHeaders = this.stateDataRow?.headers || JSON.parse(JSON.stringify(this.makeHeaders.filter(x => x.visibleColumn)))
    },
    async reloadCurrentPage() {
      this.dataPagination.currentPage = 1
      await this.reloadPage()
    },
    async reloadPage() {
      if (this.activePetition) {
        try {
          this.loading = true
          this.activePetition = false
          if (this.isOnline) {
            const urlString = await this.makeUrl()
            const {data} = await this.axios.get(urlString)

            if (data) {
              this.dataPagination.itemsLength = data.total
              this.dataPagination.itemsPerPage = parseInt(data.per_page)
              this.dataPagination.lastPage = data.last_page
              this.dataPagination.from = data.from
              this.dataPagination.to = data.to
              this.dataPagination.next = data.total ? data.next_page_url : data.next_page_url ? this.dataPagination.currentPage + 1 : null
              this.dataPagination.prev = data.total ? data.prev_page_url : data.prev_page_url ? this.dataPagination.currentPage - 1 : null
              this.items = Object.freeze(data.data)
              this.filtersTags = this?.$slots?.filters && this.$slots.filters[0] && this.$slots.filters[0].componentInstance?.$data?.model || {}
            }
          } else if (this.dispatch) {
            store.dispatch(this.dispatch, this.searchRows || '')
                .then(data => {
                  this.items = Object.freeze(data)
                })
          }
        } catch (e) {
          store.commit('SET_SNACKBAR', {
            color: 'error',
            message: 'Error al hacer la busqueda de registros',
            error: e
          })
        }
        setTimeout(() => {
          this.activePetition = true
        }, 400)
        this.loading = false
      }
    },
    async makeUrl() {
      const filtersString = this.advanceFilters ? this.stateDataRow.filters ? `&${this.stateDataRow.filters}` : '' : ''
      const sortString = ''
      this.urlStringExport = `${this.route}${this.route.indexOf('?') > -1 ? '&' : '?'}filter[search]=${!this.searchRows ? '' : this.searchRows}${filtersString}${sortString}&excel=1`
      return `${this.route}${this.route.indexOf('?') > -1 ? '&' : '?'}per_page=${this.dataPagination.itemsPerPage}${filtersString}${sortString}&page=${this.dataPagination.currentPage}&filter[search]=${!this.searchRows ? '' : this.searchRows}`
    }
  }
}
</script>

<style>
.searchRows .v-input__prepend-outer {
  margin-top: 0 !important;
}

.searchRows .v-input__append-outer {
  margin-top: 2px !important;
}

.optionsButtons > header {
  position: absolute !important;
  right: 8px !important;
  height: 0 !important;
}

.optionsButtons > header .v-toolbar__content, .v-toolbar__extension {
  padding: 0 !important;
}

.v-data-table tr .optionsButtons {
  align-content: center;
  margin-top: -2.5em;
  display: none;
}

.v-data-table tr:hover .optionsButtons {
  display: block;
}
</style>