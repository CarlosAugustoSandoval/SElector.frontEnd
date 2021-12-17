<template>
  <v-navigation-drawer
    style="z-index: 2 !important;"
    :style="`padding-top: ${$vuetify.breakpoint.mdAndUp ? '64' : '56'}px`"
    v-model="customizerDrawer"
    app
    temporary
    clipped
    :right="!$vuetify.rtl"
    src="../../../assets/images/background/sidebarUser.jpg"
    dark
  >
    <loading :value="loading"/>
    <v-list-item
        v-if="user"
        two-line
        class="px-3 py-4"
    >
      <v-list-item-avatar
          size="50"
          class="mr-2"
      >
        <v-icon x-large>mdi-account-circle</v-icon>
      </v-list-item-avatar>
      <v-list-item-content class="white--text">
        <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle class="caption white--text">{{ user.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <!---Theme color -->
    <v-divider></v-divider>
    <div class="px-4 py-4">
      <label class="white--text">Color Primario</label>
      <v-color-picker
        class="pt-2"
        v-model="colorActive"
        mode="hexa"
        :swatches="swatchesPrimary"
        show-swatches
        hide-canvas
        hide-mode-switch
        hide-inputs
        hide-sliders
      />
      <v-switch
          v-model="dark"
          class="mt-4"
          hide-details
          color="primary"
          label="Modo Oscuro"
      />
    </div>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
            block
            color="red"
            @click="logout"
        >
          <v-icon dark class="mr-1">mdi-power-standby</v-icon>
          Cerrar Sesión
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Customizer',
  data: () => ({
    loading: false,
    colorActive: null,
    dark: false
  }),
  computed: {
    customizerDrawer: {
      get () {
        return this.$store.state.settingsModule.customizerDrawer
      },
      set (val) {
        this.$store.commit('settingsModule/SET_CUSTOMIZER_DRAWER', val)
      }
    }
  },
  watch: {
    dark: {
      handler (dark) {
        this.$store.commit('settingsModule/SET_THEME_MODE', dark)
      },
      immediate: false
    },
    colorActive: {
      handler (color) {
        this.$store.commit('settingsModule/SET_THEME_COLOR', color)
      },
      immediate: false
    }
  },
  created () {
    this.colorActive = this.primaryColor
    this.dark = this.darkMode
  },
  methods: {
    logout () {
      this.loading = true
      this.$store.dispatch('authModule/logout')
        .then(resolve => {
          if (resolve) this.$router.push({ name: 'Login' })
          this.$store.commit('settingsModule/SET_CUSTOMIZER_DRAWER', false)
          this.loading = false
        })
    }
  }
}
</script>