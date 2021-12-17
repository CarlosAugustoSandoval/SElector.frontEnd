<template>
  <v-app id="inspire">
    <navigation/>
    <Header/>
    <v-main>
      <router-view/>
      <Customizer/>
    </v-main>
  </v-app>
</template>

<script>
import store from '@/store'
import Header from './header/Header'
import Customizer from './customizer/Customizer'
import Navigation from './navigation/Navigation'
export default {
  name: 'Layout',
  components: {
    Navigation,
    Header,
    Customizer
  },
  async beforeCreate() {
    await store.dispatch('authModule/getUser')
  }
}
</script>