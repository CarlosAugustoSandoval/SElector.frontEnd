<template>
  <v-navigation-drawer
      app
      absolute
      style="z-index: 2 !important;"
      :style="`padding-top: ${$vuetify.breakpoint.mdAndUp ? '74' : '66'}px`"
      v-model="navigationDrawer"
  >
    <v-list
        dense
        nav
        subheader
    >
      <template v-for="(menu, indexMenu) in menus">
        <v-subheader
            :key="`subheader${indexMenu}`"
            v-if="menu.type === 'subheader'"
        >
          {{ menu.meta.title }}
        </v-subheader>
        <v-list-item
            v-else
            :key="indexMenu"
            link
            :to="{name: menu.name}"
        >
          <v-list-item-icon>
            <v-icon>{{ menu.meta.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menu.meta.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Menu from '@/modules/settings/data/Menu'
export default {
  name: 'Navigation',
  data: () => ({
    menus: []
  }),
  created() {
    this.menus = Menu
  },
  computed: {
    navigationDrawer: {
      get () {
        return this.$store.state.settingsModule.navigationDrawer
      },
      set (val) {
        this.$store.commit('settingsModule/SET_NAVIGATION_DRAWER', val)
      }
    }
  }
}
</script>