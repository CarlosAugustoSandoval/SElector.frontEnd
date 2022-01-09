<template>
  <v-footer
      app
      padless
      :color="$vuetify.breakpoint.smAndDown ? 'black' : 'transparent'"
  >
    <v-col
        v-if="$route.meta && $route.meta.footer"
        :class="$vuetify.breakpoint.smAndDown ? 'text-center' : ''"
        class="white--text"
        cols="12"
    >
      <span>© {{ new Date().getFullYear() }} — SElectorPlus</span>
    </v-col>
    <v-alert
        v-if="isOffline"
        width="100%"
        dark
        tile
        class="my-0 pb-0 pt-1 text-center"
        dense
        color="error"
    >
      <v-icon
          color="white"
          style="bottom: 2px !important;"
      >
        mdi-cloud-off-outline
      </v-icon>
      Sin conexión a Internet
    </v-alert>
    <slot></slot>
  </v-footer>
</template>
<script>
export default {
  name: 'Footer'
}
</script>