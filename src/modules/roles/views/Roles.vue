<template>
  <v-container>
    <view-title>
      <template
          v-if="permissions.create"
          v-slot:action
      >
        <c-tooltip
            left
            tooltip="Crear Rol"
            :disabled="$vuetify.breakpoint.smAndUp"
        >
          <v-btn
              color="primary"
              depressed
              small
              :fab="$vuetify.breakpoint.xsOnly"
              @click.stop="createItem"
          >
            <v-icon v-if="$vuetify.breakpoint.xsOnly">mdi-plus</v-icon>
            {{$vuetify.breakpoint.smAndUp ? 'Crear rol' : ''}}
          </v-btn>
        </c-tooltip>
      </template>
    </view-title>
    <v-row justify="center">
      <v-col cols="12">
        <c-rows
            name="rowsRoles"
            route="roles"
            :make-headers="itemsHeaders"
            :initial-run="true"
        >
          <template v-slot:rows="{ items, loading, headers }">
            <v-data-table
                :headers="headers"
                :items="items"
                :loading="loading"
                loading-text="Cargando... por favor espere"
                class="elevation-1"
                hide-default-footer
                disable-pagination
            >
              <template v-slot:item.options="{ item }">
                <div class="optionsButtons">
                  <v-toolbar>
                    <c-tooltip
                        v-if="permissions.edit"
                        top
                        tooltip="Gestionar"
                    >
                      <v-btn
                          class="ma-1"
                          color="teal"
                          depressed
                          fab
                          x-small
                          dark
                          @click="itemManagement(item)"
                      >
                        <v-icon>mdi-cog</v-icon>
                      </v-btn>
                    </c-tooltip>
                    <c-tooltip
                        v-if="permissions.delete"
                        top
                        tooltip="Eliminar"
                    >
                      <v-btn
                          class="ma-1"
                          color="error"
                          depressed
                          fab
                          x-small
                          dark
                          @click="deleteItem(item)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </c-tooltip>
                  </v-toolbar>
                </div>
              </template>
            </v-data-table>
          </template>
        </c-rows>
      </v-col>
    </v-row>
    <rol-management
        ref="itemManagement"
        @saved="rowsReload"
    />
    <c-confirm
        v-if="itemSelected"
        title="Eliminar registro de rol"
        :subtitle="`¿Está seguro de continuar con la eliminación del registro del rol <strong>${itemSelected.name}</strong>?`"
        text-confirm-button="Si, Eliminar"
        color-confirm-button="error"
        action="delete"
        :route="`roles/${itemSelected.id}`"
        catch-message="Error al eliminar el registro del rol."
        success-message="Se eliminó el registro del rol correctamente."
        :dialog.sync="showConfirmDelete"
        @success="val => val ? rowsReload() : ''"
        @cancel="itemSelected = null"
    />
  </v-container>
</template>

<script>
import RolManagement from '../components/RolManagement'
import store from '@/store'
export default {
  name: 'Roles',
  components: {
    RolManagement
  },
  data: () => ({
    itemSelected: null,
    showConfirmDelete: false,
    itemsHeaders: [
      {
        text: 'ID',
        value: 'id'
      },
      {
        text: 'Rol',
        value: 'name',
        columnSelectable: false
      },
      {
        value: 'options',
        visibleColumnSelectable: false
      }
    ]
  }),
  computed: {
    permissions () {
      return store.getters['authModule/permissionsByModule']('roles')
    }
  },
  methods: {
    deleteItem (item) {
      this.itemSelected = item
      this.showConfirmDelete = true
    },
    createItem () {
      this.$refs.itemManagement.open()
    },
    itemManagement (item) {
      this.$refs.itemManagement.open(item)
    },
    registeredItem (item) {
      this.rowsReload()
      this.itemManagement(item)
    },
    rowsReload () {
      store.commit('SET_RELOAD_ROWS', 'rowsRoles')
    }
  }
}
</script>