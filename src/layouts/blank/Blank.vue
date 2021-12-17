<template>
  <v-app>
    <router-view/>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer'
export default {
  name: 'Blank',
  components: {
    Footer
  }
}
</script>