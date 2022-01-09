<template>
  <v-app>
    <update-loader/>
    <alert-changes/>
    <alert-install/>
    <router-view/>
    <snackbar/>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer'
import snackbar from '@/components/snackbar/components/Snackbar'
import AlertInstall from '@/components/AlertInstall'
import AlertChanges from '@/modules/firebase/components/AlertChanges'
import UpdateLoader from '@/modules/firebase/components/UpdateLoader'
export default {
  name: 'App',
  components: {
    UpdateLoader,
    snackbar,
    Footer,
    AlertInstall,
    AlertChanges
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
