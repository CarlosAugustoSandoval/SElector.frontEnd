<template>
  <v-dialog
      v-model="dialog"
      max-width="500"
      persistent
  >
    <c-card
        flat
        tile
        avatar
        darkHeader
        form-validation
        show-actions
        text-save-button="Guardar"
        header-background="primary"
        :icon="item.id ? 'mdi-file-edit' : 'mdi-file-plus'"
        :loading.sync="loading"
        :title="`${ item.id ? 'Edición de' : 'Nuevo' } Usuario`"
        :subtitle="item.id ? `Registro ID: ${ item.id }` : ''"
        @close="close"
        @cancel="close"
        @save="val => save(val)"
        class-container="pt-6"
    >
      <v-container fluid>
        <v-row
            justify="center"
            align="center"
            dense
        >
          <v-col
              cols="12"
          >
            <c-text
                v-model="item.name"
                label="Nombre de Usuario"
                rules="required"
                name="Nombre de Usuario"
            />
          </v-col>
          <v-col
              cols="12"
          >
            <c-text
                v-model="item.email"
                label="Correo Electrónico"
                rules="required|email"
                name="Correo Electrónico"
            />
          </v-col>
        </v-row>
      </v-container>
    </c-card>
  </v-dialog>
</template>

<script>
import User from '../models/User'
import store from '@/store'
export default {
  name: 'UserRegister',
  data: () => ({
    loading: false,
    dialog: false,
    item: User.create()
  }),
  methods: {
    save (confirm) {
      if (confirm) {
        const request = this.item.id
            ? this.axios.put(`users/${this.item.id}`, this.item)
            : this.axios.post('users', this.item)
        request
            .then(({data}) => {
              store.commit('SET_SNACKBAR', {color: 'success', message: `El usuario se ${this.item.id ? 'actualizó' : 'guardó'} correctamente.`})
              this.$emit('saved',data ? !this.item.id ? data.user : data : null)
              this.close()
            })
            .catch(e => {
              store.commit('SET_SNACKBAR', {color: 'error', message: 'Error al guardar el registro del usuario.', error: e})
              this.loading = false
            })
      }
    },
    getItem (item) {
      this.axios.get(`users/${item.id}`)
          .then(({data}) => {
            this.item = User.create(data.user)
            this.loading = false
          })
          .catch(e => {
            store.commit('SET_SNACKBAR', {color: 'error', message: 'Error al recuperar el registro del usuario.', error: e})
            this.close()
          })
    },
    open (item = null) {
      this.dialog = true
      if (item?.id) {
        this.loading = true
        this.getItem(item)
      }
    },
    close () {
      this.dialog = false
      this.loading = false
      setTimeout(() => {
        this.item = User.create()
      }, 400)
    }
  }
}
</script>