<template>
  <v-app>
    <router-view/>
    <snackbar/>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer'
import snackbar from '@/components/snackbar/components/Snackbar'
export default {
  name: 'App',
  components: {
    snackbar,
    Footer
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
          this.$vuetify.theme.themes.light.primary = color
          this.$vuetify.theme.themes.dark.primary = color
        }
      },
      immediate: true
    }
  }
}
</script>
