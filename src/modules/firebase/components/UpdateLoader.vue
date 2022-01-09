<template>
  <v-dialog
      :value="showUpdateLoader"
      persistent
      width="400"
  >
    <v-card
        color="primary"
        dark
    >
      <v-card-text class="pt-3 text-center">
        Cargando actualizaciones, por favor espere...
        <v-progress-linear
            indeterminate
            color="white"
            class="mb-0 mt-2"
            height="6"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'UpdateLoader',
  data: () => ({
    showChanges: false
  }),
  computed: {
    ...mapState('firebaseModule', ['showUpdateLoader']),
  }
}
</script>