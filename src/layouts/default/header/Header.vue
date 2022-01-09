<template>
  <v-app-bar
      app
      clipped-left
      clipped-right
      color="primary"
      dark
  >
    <v-toolbar-title class="align-center d-flex">
      <span class="title mr-2">SElectorPlus++</span>
      <btn-menu/>
    </v-toolbar-title>
    <v-spacer />
    <user/>
  </v-app-bar>
</template>

<script>
import User from '@/layouts/default/header/components/User'
import BtnMenu from './components/btnMenu'
export default {
  name: 'Header',
  components: {
    BtnMenu,
    User
  }
}
</script>

<style lang="scss">
  .v-application #main-sidebar.theme--dark.white{
    background:#363636!important;
  }
</style>