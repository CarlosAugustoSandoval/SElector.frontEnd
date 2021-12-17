<template>
  <v-footer
      app
      padless
      :color="$vuetify.breakpoint.smAndDown ? 'black' : 'transparent'"
  >
    <v-col
        :class="$vuetify.breakpoint.smAndDown ? 'text-center' : ''"
        class="white--text"
        cols="12"
    >
      <span>© {{ new Date().getFullYear() }} — SElector</span>
    </v-col>
  </v-footer>
</template>
<script>
export default {
  name: 'Footer',
  data: () => ({})
}
</script>