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
        header-background="primary"
        icon="mdi-file-cog"
        :loading.sync="loading"
        title="Gestión de usuario"
        :subtitle="`Registro ID: ${ item.id }`"
        @close="close"
    >
      <v-list two-line>
        <v-list-item @click.stop="!click">
          <v-icon size="50">mdi-account-box</v-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
            <v-list-item-subtitle>{{item.email}}</v-list-item-subtitle>
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
                  @click="editItem(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </c-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-card flat>
        <v-tabs
            dark
            background-color="primary"
            v-model="tab"
            align-with-title
        >
          <v-tabs-slider color="yellow"/>
          <v-tab>Roles</v-tab>
          <v-tab v-if="directPermissionsAvailables">Permisos Directos</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card>
              <v-list
                  v-if="roles && roles.length"
                  dense
                  class="pa-0"
              >
                <v-list-item
                    v-for="(rol, rolIndex) in roles"
                    :key="`rol${rolIndex}`"
                    @click.stop="!click"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ rol.name }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch
                        inset
                        hide-details
                        @change="changeRol(rol)"
                        :loading="rol.loading"
                        :readonly="rol.loading"
                        v-model="item.roles"
                        :value="rol"
                    />
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-tab-item>
          <v-tab-item
              v-if="directPermissionsAvailables"
          >
            <v-list
                dense
                subheader
                class="pa-0"
            >
              <template v-for="(permissions, moduleIndex) in directPermissionsAvailables">
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
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </c-card>
    <user-register
        ref="itemRegister"
        @saved="itemEdited"
    />
  </v-dialog>
</template>

<script>
import UserRegister from './UserRegister'
import User from '../models/User'
import Permission from '../models/Permission'
import Rol from '../models/Rol'
import store from '@/store'
export default {
  name: 'UserManagement',
  components: {
    UserRegister
  },
  data: () => ({
    tab: 0,
    click: false,
    loading: false,
    dialog: false,
    item: User.create(),
    directPermissionsAvailables: null,
    roles: []
  }),
  computed: {
    permissions () {
      return store.getters['authModule/permissionsByModule']('users')
    }
  },
  methods: {
    editItem (item) {
      this.$refs.itemRegister.open(item)
    },
    itemEdited () {
      this.$emit('saved', true)
      this.getItem(this.item)
    },
    changePermission(permission) {
      permission.loading = true
      this.axios.put(`users/${this.item.id}/permission/${permission.id}`)
          .catch(e => {
            store.commit('SET_SNACKBAR', {color: 'error', message: `Error al actualizar el permiso ${permission.name}`, error: e})
          })
          .finally(() => {
            this.getItem(this.item)
            permission.loading = false
          })
    },
    changeRol(rol) {
      rol.loading = true
      this.axios.put(`users/${this.item.id}/role/${rol.id}`)
          .catch(e => {
            store.commit('SET_SNACKBAR', {color: 'error', message: `Error al actualizar el rol ${rol.name}`, error: e})
          })
          .finally(() => {
            this.getItem(this.item)
            rol.loading = false
          })
    },
    getItem (item) {
      this.axios.get(`users/${item.id}`)
          .then(({data}) => {
            this.cleanShow(data)
            this.loading = false
          })
          .catch(e => {
            store.commit('SET_SNACKBAR', {color: 'error', message: 'Error al recuperar el registro del usuario.', error: e})
            this.close()
          })
    },
    cleanShow(data) {
      if (data?.direct_permissions_availables?.length) {
        data.direct_permissions_availables = data.direct_permissions_availables.map((x) => { return Permission.create(x) })
        this.directPermissionsAvailables = data.direct_permissions_availables.reduce((value, key) => {
          (value[key['module']] = value[key['module']] || []).push(key)
          return value
        }, {})
      } else {
        this.directPermissionsAvailables = null
      }
      data.user.permissions = data.user.permissions.map((x) => { return Permission.create(x) })
      data.user.roles = data.user.roles.map((x) => { return Rol.create(x) })
      this.roles = data.roles.map((x) => { return Rol.create(x) })
      this.item = User.create(data.user)
    },
    open (item) {
      this.dialog = true
      this.loading = true
      this.getItem(item)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.item = User.create()
      }, 400)
    }
  }
}
</script>