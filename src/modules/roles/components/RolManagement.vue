<template>
  <v-dialog
      v-model="dialog"
      max-width="600"
      persistent
      scrollable
  >
    <c-card
        flat
        tile
        avatar
        darkHeader
        show-close-button
        form-validation
        header-background="primary"
        :icon="item.id ? 'mdi-file-cog' : 'mdi-file-plus'"
        :title="item.id ? 'Gestión de rol' : 'Nuevo rol'"
        :subtitle="item.id ? `Registro ID: ${ item.id }` : ''"
        :class-container="editing ? 'pt-6' : 'pt-6'"
        ref="cCardRol"
        @close="close"
        @cancel="close"
        @save="val => save(val)"
    >
      <v-row
          v-if="!item.id || (item.id && editing)"
      >
        <v-col cols="12">
          <c-text
              v-model="item.name"
              label="Nombre rol"
              name="nombre del rol"
              rules="required"
              :loading="loading"
          >
            <template v-slot:prepend>
              <v-icon size="30">mdi-account-switch</v-icon>
            </template>
            <template v-slot:append-outer>
              <c-tooltip
                  :disabled="$vuetify.breakpoint.smAndUp"
                  tooltip="Guardar"
                  left
              >
                <v-btn
                    color="primary"
                    depressed
                    small
                    :fab="$vuetify.breakpoint.xsOnly"
                    :style="`bottom: ${$vuetify.breakpoint.xsOnly ? 6 : 2}px !important;`"
                    class="mr-1"
                    :loading="loading"
                    @click.stop="preSave"
                >
                  <v-icon v-if="$vuetify.breakpoint.xsOnly">mdi-content-save</v-icon>
                  {{$vuetify.breakpoint.smAndUp ? 'Guardar' : ''}}
                </v-btn>
              </c-tooltip>
              <c-tooltip
                  v-if="item.id"
                  :disabled="$vuetify.breakpoint.smAndUp"
                  tooltip="Cancelar"
                  left
              >
                <v-btn
                    depressed
                    small
                    :fab="$vuetify.breakpoint.xsOnly"
                    :style="`bottom: ${$vuetify.breakpoint.xsOnly ? 6 : 2}px !important;`"
                    :loading="loading"
                    @click.stop="cancelEditItem"
                >
                  <v-icon v-if="$vuetify.breakpoint.xsOnly">mdi-close</v-icon>
                  {{$vuetify.breakpoint.smAndUp ? 'Cancelar' : ''}}
                </v-btn>
              </c-tooltip>
            </template>
          </c-text>
        </v-col>
      </v-row>
      <v-list v-if="item.id && !editing">
        <v-list-item @click.stop="!click">
          <v-icon size="30" class="mr-2">mdi-account-switch</v-icon>
          <v-list-item-content>
            <v-list-item-subtitle class="">Nombre rol</v-list-item-subtitle>
            <v-list-item-title class="title">{{item.name}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <c-tooltip
                v-if="permissions.edit"
                top
                tooltip="Editar"
            >
              <v-btn
                  color="warning"
                  depressed
                  fab
                  dark
                  small
                  @click="editItem"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </c-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-card v-if="generalPermissions" flat>
        <v-subheader
            style="height: 24px !important;"
            class="title mb-2"
        >
          <v-icon left>mdi-key</v-icon>
          Permisos
        </v-subheader>
        <v-divider></v-divider>
        <v-list
            dense
            subheader
            class="pa-0"
        >
          <template v-for="(permissions, moduleIndex) in generalPermissions">
            <v-subheader
                style="height: 12px !important;"
                class="body-1 mt-5 mb-2"
                :key="`module${moduleIndex}`"
            >
              {{moduleIndex}}
            </v-subheader>
            <v-list-item
                :ripple="false"
                @click.stop="!click"
                v-for="(permission, permissionIndex) in permissions"
                :key="`module${moduleIndex}permission${permissionIndex}`"
            >
              <v-list-item-content>
                <v-list-item-title>{{ permission.description }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-switch
                    inset
                    hide-details
                    @change="changePermission(permission)"
                    :loading="permission.loading"
                    :readonly="permission.loading"
                    v-model="item.permissions"
                    :value="permission"
                />
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </c-card>
  </v-dialog>
</template>

<script>
import Rol from '../models/Rol'
import Permission from '@/modules/users/models/Permission'
import store from '@/store'
export default {
  name: 'RolManagement',
  data: () => ({
    click: false,
    editing: false,
    loading: false,
    dialog: false,
    item: Rol.create(),
    originalItem: Rol.create(),
    generalPermissions: null
  }),
  computed: {
    permissions () {
      return store.getters['authModule/permissionsByModule']('roles')
    }
  },
  methods: {
    saved (value) {
      this.getItem(value)
      this.$emit('saved', value)
    },
    editItem () {
      this.editing = true
    },
    cancelEditItem () {
      this.editing = false
      this.item.name = this.originalItem.name
    },
    changePermission(permission) {
      permission.loading = true
      this.axios.put(`roles/${this.item.id}/permission/${permission.id}`)
          .catch(e => {
            store.commit('SET_SNACKBAR', {color: 'error', message: `Error al actualizar el permiso ${permission.name}`, error: e})
          })
          .finally(() => {
            this.getItem(this.item)
            permission.loading = false
          })
    },
    preSave () {
      this.$refs.cCardRol.save()
    },
    save (confirm) {
      if (confirm) {
        this.loading = true
        const request = this.item.id
            ? this.axios.put(`roles/${this.item.id}`, this.item)
            : this.axios.post('roles', this.item)
        request
            .then(({data}) => {
              store.commit('SET_SNACKBAR', {color: 'success', message: `El rol se ${this.item.id ? 'actualizó' : 'creó'} correctamente.`})
              this.saved(data ? !this.item.id ? data.role : data : null)
            })
            .catch(e => {
              store.commit('SET_SNACKBAR', {color: 'error', message: 'Error al guardar el registro del rol .', error: e})
              this.loading = false
            })
      }
    },
    getItem (item) {
      this.loading = true
      this.axios.get(`roles/${item.id}`)
          .then(({data}) => {
            this.cleanShow(data)
            this.loading = false
          })
          .catch(e => {
            store.commit('SET_SNACKBAR', {color: 'error', message: 'Error al recuperar el registro del rol .', error: e})
            this.close()
          })
    },
    cleanShow(data) {
      if (data?.permissions?.length) {
        data.permissions = data.permissions.map((x) => { return Permission.create(x) })
        this.generalPermissions = data.permissions.reduce((value, key) => {
          (value[key['module']] = value[key['module']] || []).push(key)
          return value
        }, {})
      } else {
        this.generalPermissions = null
      }
      data.role.permissions = data.role.permissions.map((x) => { return Permission.create(x) })
      this.item = Rol.create(data.role)
      this.originalItem = Rol.create(data.role)
      this.cancelEditItem()
    },
    open (item = null) {
      this.dialog = true
      if (item) {
        this.loading = true
        this.getItem(item)
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.item = Rol.create()
        this.originalItem = Rol.create()
        this.generalPermissions = null
      }, 400)
    }
  }
}
</script>