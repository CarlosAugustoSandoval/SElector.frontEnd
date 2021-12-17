<template>
  <v-app>
    <router-view/>
    <snackbar/>
  </v-app>
</template>

<script>
import snackbar from '@/components/snackbar/components/Snackbar'
export default {
  name: 'App',
  components: {
    snackbar
  },
  watch: {
    darkMode: {
      handler (dark) {
        this.$vuetify.theme.dark = dark
      },
      immediate: true
    },
    primaryColor: {
      handler (color) {
        if (color) {
          this.$vuetify.theme.themes.light.primary = color.hex
          this.$vuetify.theme.themes.dark.primary = color.hex
        }
      },
      immediate: true
    }
  }
}
</script>
