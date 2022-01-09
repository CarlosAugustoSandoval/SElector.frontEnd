<template>
  <v-alert
      v-if="reloadAplication"
      id="alert-changes"
      tile
      dense
      dark
      dismissible
      colored-border
      class="ma-0"
      color="warning lighten-2"
      border="left"
      icon="mdi-application-import"
  >
    <a
        class="white--text"
        @click.prevent="updateChange"
    >
      Actualización Disponible
    </a>
  </v-alert>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'AlertChanges',
  data: () => ({
    showChanges: false
  }),
  computed: {
    ...mapState('firebaseModule', ['reloadAplication']),
  },
  methods: {
    updateChange() {
      this.$store.commit('firebaseModule/SET_OFF_RELOAD_FIREBASE')
    }
  }
}
</script>

<style scoped>
  #alert-changes {
    width: 100% !important;
    z-index: 210 !important;
    position: fixed !important;
    bottom: 0;
  }
</style>