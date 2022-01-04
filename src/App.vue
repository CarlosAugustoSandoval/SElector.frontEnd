<template>
  <v-app>
    <router-view/>
    <snackbar/>
    <Footer>
      <alert-changes/>
      <alert-install/>
    </Footer>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer'
import snackbar from '@/components/snackbar/components/Snackbar'
import AlertInstall from '@/components/AlertInstall'
import AlertChanges from '@/components/AlertChanges'
export default {
  name: 'App',
  components: {
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
  },
  created() {
    console.log('created app')
  },
  mounted() {
    setTimeout(() => {
      console.log('mounted app 500')
    }, 500)
  }
}
</script>
