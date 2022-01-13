<template>
  <v-dialog
      v-model="model"
      persistent
      max-width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item
          :disabled="!isOnline"
          v-bind="attrs"
          v-on="on"
      >
        <v-list-item-avatar color="warning">
          <v-icon class="white--text">mdi-account-key</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Cambio de contraseña</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card v-if="user">
      <v-list-item>
        <v-list-item-avatar :size="48" color="warning">
          <v-icon class="white--text">mdi-account-key</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">Cambio de contraseña</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="ma-0"/>
      <ValidationObserver ref="formPassword">
        <v-container class="mt-3">
          <v-row dense>
            <v-col cols="12">
              <c-password
                  v-model="current_password"
                  label="Contraseña actual"
                  rules="required"
                  vid="currentPassword"
                  name="Contraseña actual"
              />
            </v-col>
            <v-col
                v-if="current_password"
                cols="12"
            >
              <c-password
                  v-model="password"
                  label="Nueva contraseña"
                  :rules="{minlength:8, required: true, is_not:current_password, regexPassword:password}"
                  vid="password"
                  name="Nueva contraseña"
              />
            </v-col>
            <v-col
                v-if="current_password && password"
                cols="12"
            >
              <c-password
                  v-model="password_confirmation"
                  label="Confirmar nueva contraseña"
                  :rules="{minlength:8, required: true, is_not:current_password, confirmed:'password'}"
                  vid="passwordConfirmation"
                  name="Confirmar nueva contraseña"
              />
            </v-col>
          </v-row>
        </v-container>
      </ValidationObserver>
      <v-divider class="ma-0"/>
      <v-card-actions>
        <v-btn
            text
            @click.stop="model = false"
        >
          Cancelar
        </v-btn>
        <v-spacer/>
        <v-btn
            color="primary"
            @click.stop="save"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
      <loading v-model="loading"/>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ChangePassword',
  data: () => ({
    current_password: null,
    password: null,
    password_confirmation: null,
    model: false,
    loading: false
  }),
  watch: {
    model: {
      handler (val) {
        if (!val) this.resetData()
      },
      immediate: false
    }
  },
  methods: {
    resetData() {
      this.current_password = null
      this.password = null
      this.password_confirmation = null
      this.$refs.formPassword.reset()
    },
    async save() {
      this.$refs.formPassword.validate().then(result => {
        if (result) {
          this.loading = true
          this.axios.put('changepassword', {
            current_password: this.current_password,
            password: this.password,
            password_confirmation: this.password_confirmation
          })
              .then(() => {
                this.$store.commit('SET_SNACKBAR', {message: 'La contraseña se ha cambiado correctamente.'})
                this.model = false
                setTimeout(() => {
                  this.loading = false
                  this.resetData()
                }, 400)
              })
              .catch(e => {
                this.loading = false
                this.$store.commit('SET_SNACKBAR', {color: 'error', message: 'Error al cambiar la contraseña.', error: e})
          })
        }
      })
    }
  }
}
</script>