<template>
  <v-toolbar-items v-if="user">
    <v-btn
        dark
        elevation="0"
        color="transparent"
        v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="setCustomizerDrawer(!customizerDrawer)"
    >
      <v-icon x-large>mdi-account-circle</v-icon>
    </v-btn>
    <v-list-item
        v-else
        dark
        @click.stop="setCustomizerDrawer(!customizerDrawer)"
    >
      <v-list-item-avatar
          class="mr-1"
          size="50"
      >
        <v-icon x-large>mdi-account-circle</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-toolbar-items>
  <v-progress-circular
      v-else
      indeterminate
      color="white"
  />
</template>
<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'UserMenu',
  data: () => ({}),
  computed: {
    ...mapState('settingsModule', ['customizerDrawer'])
  },
  methods: {
    ...mapMutations({
      setCustomizerDrawer: 'settingsModule/SET_CUSTOMIZER_DRAWER'
    })
  }
}
</script>