<template>
  <v-dialog
      v-model="dialog"
      :max-width="maxWidth"
      eager
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
      >
        <v-icon>mdi-tune</v-icon>
        {{ $vuetify.breakpoint.smAndDown ? '' : ' Filtros' }}
      </v-btn>
    </template>
    <c-card
        flat
        tile
        avatar
        darkHeader
        show-close-button
        header-background="primary"
        icon="mdi-tune"
        class-container="pt-6"
        :loading.sync="loading"
        :title="title"
        :subtitle="subtitle"
        @close="dialog = false"
    >
      <slot name="filters"/>
    </c-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'CRowFilters',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    maxWidth: {
      type: String,
      default: '920'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialog: false
  })
}
</script>