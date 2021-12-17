<template>
  <v-btn
      dark
      icon
      elevation="0"
      @click.stop="setNavigationDrawer(!navigationDrawer)"
  >
    <v-icon x-large>mdi-menu</v-icon>
  </v-btn>
</template>
<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'btnMenu',
  data: () => ({}),
  computed: {
    ...mapState('settingsModule', ['navigationDrawer'])
  },
  methods: {
    ...mapMutations({
      setNavigationDrawer: 'settingsModule/SET_NAVIGATION_DRAWER'
    })
  }
}
</script>