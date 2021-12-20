<template>
  <div>
    <view-title>
      <template v-slot:action>
        <v-spacer></v-spacer>
        <c-tooltip
            left
            tooltip="Crear Usuario"
        >
          <v-btn
              color="primary"
              depressed
              small
              fab
              @click="crearRegistro"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </c-tooltip>
      </template>
    </view-title>
    <v-row>
      <v-col cols="12">
        <v-card tile flat>
          <data-table
              v-model="dataTable"
          >
            <template v-slot:tabla="{ items, headers, loading }">
              <v-data-table
                  v-model="seleccionados"
                  :headers="headers"
                  :items="items"
                  :loading="loading"
                  loading-text="Cargando... por favor espere"
                  show-select
                  class="elevation-1 rounded-0 mb-12"
                  hide-default-footer
                  disable-pagination
              >
                <template v-slot:item.opciones="{ item }">
                  <c-tooltip
                      left
                      tooltip="Editar Usuario"
                  >
                    <v-btn
                        class="ma-1"
                        color="warning"
                        depressed
                        fab
                        x-small
                        @click="editarRegistro(item)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </c-tooltip>
                  <c-tooltip
                      left
                      tooltip="Eliminar Usuario"
                  >
                    <v-btn
                        class="ma-1"
                        color="error"
                        depressed
                        fab
                        x-small
                        @click="preEliminarRegistro(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </c-tooltip>
                </template>
              </v-data-table>
            </template>
          </data-table>
        </v-card>
      </v-col>
    </v-row>
    <user-register
        ref="itemRegister"
        @save="reloadItems"
    />
    <c-dialog
        ref="cdialog"
        @save="eliminarRegistro"
    />
  </div>
</template>

<script>
import UserRegister from '@/modules/users/components/UserRegister'

export default {
  name: 'Users',
  components: {
    UserRegister
  },
  data: () => ({
    seleccionados: [],
    rutaBase: 'users',
    dataTable: {
      buttonZone: false,
      advanceFilters: false,
      nameItemState: 'tablaUsuarios',
      route: 'users',
      makeHeaders: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        {
          text: 'Nombre',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Correo Electrónico',
          align: 'left',
          sortable: false,
          value: 'email'
        },
        {
          text: 'Opciones',
          value: 'opciones',
          align: 'center',
          sortable: false
        }
      ]
    },
    seleccionado: null
  }),
  methods: {
    crearRegistro() {
      this.$refs.itemRegister.open()
    },
    editarRegistro(registro) {
      this.$refs.itemRegister.open(registro)
    },
    preEliminarRegistro(registro) {
      this.seleccionado = registro
      this.$refs.cdialog.open(`¿Está seguro de eliminar el registro del usuario <strong>${this.seleccionado.name}</strong>?`)
    },
    eliminarRegistro() {
      this.$store.dispatch('eliminarUsuario', this.seleccionado.id)
          .then(resolve => {
            if (resolve) {
              this.reloadItems()
              this.$refs.cdialog.close()
            } else {
              this.$refs.cdialog.loading = false
            }
          })
    },
    reloadItems() {
      this.$store.commit('RELOAD_TABLA', 'tablaUsuarios')
    }
  }
}
</script>
