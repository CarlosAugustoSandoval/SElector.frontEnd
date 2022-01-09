<template>
  <v-navigation-drawer
      style="z-index: 4 !important;"
      :style="`padding-top: ${$vuetify.breakpoint.mdAndUp ? '74' : '66'}px`"
      v-model="navigationDrawer"
      app
  >
    <v-list
        dense
        nav
        subheader
    >
      <template v-for="(menu, key) in menus">
        <v-subheader
            :key="`subheader${key}`"
            v-if="key"
        >
          {{ key }}
        </v-subheader>
        <v-list-item
            v-for="(item, indexItem) in menu"
            :key="`item${indexItem}${key}`"
            link
            :to="{name: item.name}"
        >
          <v-list-item-icon>
            <v-icon>{{ item.meta.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <template
        v-if="user && user.id === 1"
        v-slot:append
    >
      <div class="pa-2">
        <c-tooltip
            right
            tooltip="Lanzamiento de alerta de actualización para todos los usuarios."
        >
          <v-btn
              dark
              block
              color="red"
              @click="setAlerta"
              :disabled="isOffline"
              :loading="loadingAlerta"
          >
            <v-icon dark class="mr-1">mdi-restore-alert</v-icon>
            Actualización
          </v-btn>
        </c-tooltip>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import Menu from '@/modules/settings/data/Menu'
import {mapGetters} from 'vuex'
export default {
  name: 'Navigation',
  data: () => ({
    loadingAlerta: false
  }),
  computed: {
    ...mapGetters('authModule',['permissions']),
    menus () {
      if (Menu?.length) {
        const permissionsKeys = Object.keys(this.permissions)
        return Menu.filter(x => {
          if (x.meta.permission) {
            if (permissionsKeys.length) {
              return permissionsKeys.includes(x.meta.permission)
            } else {
              return false
            }
          } else {
            return true
          }
        }).reduce((value, key) => {
          (value[key.meta.group] = value[key.meta.group] || []).push(key)
          return value
        }, {})
      } else {
        return []
      }
    },
    navigationDrawer: {
      get () {
        return this.$store.state.settingsModule.navigationDrawer
      },
      set (val) {
        this.$store.commit('settingsModule/SET_NAVIGATION_DRAWER', val)
      }
    }
  },
  methods: {
    setAlerta() {
      this.loadingAlerta = true
      this.$store.dispatch('firebaseModule/setVersionFirebase').then(() => {
        this.loadingAlerta = false
      })
    }
  }
}
</script>