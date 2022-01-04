<template>
  <v-alert
    tile
    dense
    dark
    dismissible
    colored-border
    v-model="showInstall"
    style="width: 100%"
    class="ma-0"
    color="primary lighten-2"
    border="left"
    icon="mdi-application-import"
  >
    <a
      class="white--text"
      @click.prevent="install"
    >Instalar en el dispositivo
    </a>
  </v-alert>
</template>

<script>
let installEvent = null
export default {
  name: 'AlertInstall',
  data: () => ({
    showInstall: false
  }),
  created () {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      installEvent = e
      this.showInstall = true
    })
  },
  methods: {
    install () {
      this.showInstall = false
      installEvent.prompt()
      installEvent.userChoice.then(() => {
        installEvent = null
      })
    }
  }
}
</script>
