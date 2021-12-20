<template>
  <v-dialog
      v-model="dialog"
      max-width="500"
      persistent
  >
    <v-card
        class="text-center"
    >
      <loading
          v-if="fullLoading"
          v-model="loading"
          absolute
      />
      <v-container>
        <v-icon
            size="80"
            :color="iconColor"
        >
          {{ icon }}
        </v-icon>
        <h2 class="mb-3">{{ title }}</h2>
        <p class="mb-3 text-h6" v-html="subtitle"/>
      </v-container>
      <v-card-actions class="justify-center">
        <v-btn
            @click="cancel"
            :loading="fullLoading ? false : loading"
        >
          Cancelar
        </v-btn>
        <v-btn
            :color="colorConfirmButton"
            :loading="fullLoading ? false : loading"
            @click="save"
        >
          {{ textConfirmButton }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CConfirm',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: 'warning'
    },
    fullLoading: {
      type: Boolean,
      default: true
    },
    textConfirmButton: {
      type: String,
      default: 'Aceptar'
    },
    colorConfirmButton: {
      type: String,
      default: 'primary'
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    textCancelButton: {
      type: String,
      default: 'Cancelar'
    },
    colorCancelButton: {
      type: String,
      default: ''
    },
    dispatch: {
      type: String,
      default: ''
    },
    method: {
      type: String,
      default: 'DELETE'
    },
    payload: {
      type: Object,
      default: null
    },
    catchMessage: {
      type: String,
      default: ''
    },
    successMessage: {
      type: String,
      default: ''
    },
    dialog: {
      type: Boolean,
      default: false
    },
    inStore: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    loading: false,
    icon: '',
    iconColor: ''
  }),
  watch: {
    dialog: {
      handler(value) {
        if (value) this.assignIcon()
      },
      immediate: true
    }
  },
  methods: {
    close() {
      this.$emit('update:dialog', false)
    },
    success(value) {
      this.loading = false
      this.$emit('success', value)
    },
    cancel() {
      this.close()
      this.$emit('cancel')
    },
    assignIcon() {
      switch (this.action) {
        case 'warning':
          this.icon = 'mdi-alert'
          this.iconColor = 'warning'
          break
        case 'info':
          this.icon = 'mdi-information'
          this.iconColor = 'info'
          break
        case 'delete':
          this.icon = 'mdi-trash-can'
          this.iconColor = 'error'
          break
        default:
          this.icon = ''
          this.iconColor = ''
          break
      }
    },
    async save() {
      if (this.dispatch && this.method) {
        this.loading = true
        if (this.inStore) {
          this.$store.dispatch(this.dispatch, this.payload || null)
              .then(response => {
                if (response.data) {
                  this.success(response.data)
                  this.close()
                } else {
                  this.success(false)
                }
              })
        } else {
          try {
            const response = await this.axios(
                {
                  method: this.method,
                  url: this.dispatch,
                  data: this.payload || null
                }
            )
            this.success(!!response.data)
            this.close()
            this.$store.commit('SET_SNACKBAR', {message: this.successMessage})
          } catch (e) {
            this.$store.commit('SET_SNACKBAR', {color: 'error', message: this.catchMessage, error: e})
            this.success(false)
          }
        }
      } else {
        this.success(true)
      }
    }
  }
}
</script>