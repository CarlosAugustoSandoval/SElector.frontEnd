<template>
  <v-alert
    tile
    dense
    dark
    dismissible
    colored-border
    v-model="showChanges"
    style="width: 100%"
    class="ma-0"
    color="error lighten-2"
    border="left"
    icon="mdi-application-import"
  >
    <a
      class="white--text"
      @click.prevent="install"
    >
      Instalar actualizaciones
    </a>
  </v-alert>
</template>

<script>
let installEvent = null
export default {
  name: 'AlertChanges',
  data: () => ({
    showChanges: false
  }),
  created () {
    window.addEventListener('message', e => {
      console.log('eeeee', e)
      if (e.data.action === 'skipWaiting')  {
        this.showChanges = true
      }
    })
  },
  methods: {
    install () {
      this.showChanges = false
      installEvent.prompt()
      installEvent.userChoice.then(() => {
        installEvent = null
      })
    }
  }
}
</script>
