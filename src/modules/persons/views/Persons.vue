<template>
  <v-container>
    <view-title>
      <template v-slot:action>
        <template v-if="unsyncPersons && unsyncPersons.length && isOnline">
          <c-tooltip
              left
              tooltip="Sincronizar todo"
              :disabled="$vuetify.breakpoint.smAndUp"
          >
            <v-btn
                color="info"
                depressed
                class='mr-3'
                :small="!!$vuetify.breakpoint.xsOnly"
                :fab="$vuetify.breakpoint.xsOnly"
                @click="syncPerson(null)"
            >
              <v-icon v-if="$vuetify.breakpoint.xsOnly">mdi-cloud-sync</v-icon>
              {{$vuetify.breakpoint.smAndUp ? 'Sincronizar todo' : ''}}
            </v-btn>
          </c-tooltip>
        </template>



        <c-tooltip
            v-if="permissions.create"
            left
            tooltip="Crear elector"
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
            {{$vuetify.breakpoint.smAndUp ? 'Crear elector' : ''}}
          </v-btn>
        </c-tooltip>
      </template>
    </view-title>
    <c-rows
        name="rowsPersons"
        route="electores/elector"
        dispatch="personsModule/getPersons"
        :make-headers="headers"
        filters-title="Filtros de electores"
        filters-max-width="900"
        advance-filters
        :initial-run="true"
    >
      <persons-filters slot="filters"/>
      <template v-slot:filterstags="{ tags }">
        <persons-filters-tags :tags="tags"/>
      </template>
      <template v-slot:rows="{ items, loading, headers }">
        <v-data-table
            :headers="headers"
            :items="isOnline ? unsyncPersons.concat(items) : items"
            :loading="loading"
            loading-text="Cargando... por favor espere"
            class="elevation-1"
            :hide-default-footer="isOnline"
            :disable-pagination="isOnline"
        >
          <template v-slot:item.name="{ item }">
            <v-list-item class="pa-0">
              <c-tooltip top tooltip="No sincronizado">
                <v-icon
                    v-if="!item.sincronizado"
                    color="orange"
                >
                  mdi-sync-alert
                </v-icon>
              </c-tooltip>
              <v-list-item-avatar class="ma-0">
                <v-icon size="30">
                  {{ item.sexo ? item.sexo === 'M' ? 'mdi-face-man' : 'mdi-face-woman' : 'mdi-account' }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content class="py-1">
                <v-list-item-title>
                  {{ item.nombre_completo }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ [item.tipo_identificacion, item.identificacion].filter(x => x).join(' ') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:item.contact="{ item }">
            <v-list-item class="pa-0">
              <v-list-item-content class="py-1">
                <v-list-item-title v-if="item.celular || item.celular2">
                  <v-icon size="16">mdi-cellphone-check</v-icon>
                  <template v-if="item.celular">
                    <c-tooltip
                        top
                        tooltip="Principal"
                    >
                      <a
                          :href="`tel:${item.celular}`"
                      >
                        {{ item.celular }}
                      </a>
                    </c-tooltip>
                  </template>
                  <template v-if="item.celular && item.celular2"> | </template>
                  <template v-if="item.celular2">
                    <c-tooltip
                        top
                        tooltip="Opcional"
                    >
                      <a
                          :href="`tel:${item.celular2}`"
                      >
                        {{ item.celular2 }}
                      </a>
                    </c-tooltip>
                  </template>
                </v-list-item-title>
                <v-list-item-subtitle v-if="item.email">
                  <v-icon size="16">mdi-email</v-icon>
                  <a
                      :href="`mailto:${item.email}`"
                  >
                    {{ item.email }}
                  </a>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:item.residence="{ item }">
            <v-list-item class="pa-0">
              <v-list-item-content class="py-1">
                <v-list-item-title v-if="item.direccion">
                  {{ item.direccion }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{
                    [item.municipio ? item.municipio.nombre : null, item.departamento ? item.departamento.nombre : null].filter(x => x).join(', ')
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:item.vote="{ item }">
            <v-list-item class="pa-0">
              <c-tooltip top tooltip="Mesa de votación">
                <v-list-item-avatar
                    tile
                    :color="item.mesa_votacion ? 'info' : 'warning'"
                    class="ma-0 mr-1 white--text"
                >
                  {{ item.mesa_votacion || '?' }}
                </v-list-item-avatar>
              </c-tooltip>
              <v-list-item-content class="py-1">
                <v-list-item-title>
                  {{ item.lugar_votacion }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{
                    [item.municipio_votacion ? item.municipio_votacion.nombre : null, item.departamento_votacion ? item.departamento_votacion.nombre : null].filter(x => x).join(', ')
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:item.options="{ item }">
            <options-buttons
                :edit-button="permissions.edit"
                @edit="editItem(item)"
                :delete-button="permissions.delete"
                @delete="deleteItem(item)"
                top
            >
              <c-tooltip
                  v-if="!item.sincronizado && isOnline"
                  top
                  tooltip='Sincronizar Registro'
              >
                <v-btn
                    class='ma-1'
                    color='info'
                    depressed
                    fab
                    x-small
                    @click="syncPerson(item)"
                >
                  <v-icon>mdi-cloud-sync</v-icon>
                </v-btn>
              </c-tooltip>
            </options-buttons>
          </template>
        </v-data-table>
      </template>
    </c-rows>
    <person-register
        ref='itemRegister'
        @saved="rowsReload"
    />
    <c-confirm
        v-if="itemSelected"
        title="Eliminar registro de elector"
        :subtitle="`¿Está seguro de continuar con la eliminación del registro de <strong>${itemSelected.nombre_completo}</strong>?`"
        text-confirm-button="Si, Eliminar"
        color-confirm-button="error"
        action="DELETE"
        :dispatch="'personsModule/delete'"
        :payload="itemSelected"
        catch-message="Error al eliminar el registro del elector."
        success-message="Se eliminó el registro del elector correctamente."
        :dialog.sync="showConfirmDelete"
        @success="deleted"
        @cancel="itemSelected = null"
    />
    <loading v-model="loading"/>
  </v-container>
</template>

<script>
import PersonRegister from '../components/PersonRegister'
import PersonsFilters from '../components/PersonsFilters'
import PersonsFiltersTags from '../components/PersonsFiltersTags'
import store from '@/store'

export default {
  name: 'Persons',
  components: {
    PersonRegister,
    PersonsFilters,
    PersonsFiltersTags
  },
  data: () => ({
    itemSelected: null,
    showConfirmDelete: false,
    loading: false,
    unsyncPersons: [],
    headers: [
      {
        text: 'Nombre',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Contacto',
        sortable: false,
        value: 'contact',
      },
      {
        text: 'Lugar de residencia',
        sortable: false,
        value: 'residence',
      },
      {
        text: 'Votación',
        sortable: false,
        value: 'vote',
      },
      {
        text: '',
        value: 'options',
        cellClass: 'pa-0',
        sortable: false,
        visibleColumnSelectable: false
      },
    ]
  }),
  computed: {
    permissions () {
      return store.getters['authModule/permissionsByModule']('electores')
    }
  },
  mounted() {
    if (this.isOnline) this.getUnsyncPersons()
  },
  methods: {
    deleteItem(item) {
      this.itemSelected = item
      this.showConfirmDelete = true
    },
    deleted() {
      this.showConfirmDelete = false
      this.rowsReload()
      setTimeout(() => {
        this.itemSelected = null
      }, 400)
    },
    createItem() {
      this.$refs.itemRegister.open()
    },
    editItem(item) {
      this.$refs.itemRegister.open(item)
    },
    getUnsyncPersons() {
      store.dispatch('personsModule/getUnsyncPersons')
          .then(response => {
            this.unsyncPersons = response
          })
    },
    syncPerson(item = null) {
      this.loading = true
      store.dispatch('personsModule/syncServerLote', item ? [item] : [])
          .then(() => {
            this.rowsReload()
            this.loading = false
          })
    },
    rowsReload() {
      store.commit('SET_RELOAD_ROWS', 'rowsPersons')
      if (this.isOnline) this.getUnsyncPersons()
    }
  }
}
</script>