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
          <v-col
              cols="12"
          >
            <v-switch
                inset
                :hide-details="!item.es_lider"
                v-model="item.es_lider"
                label="Es Lider"
                :true-value="1"
                :false-value="0"
            />
          </v-col>
          <v-col
              v-if="item.es_lider"
              cols="12"
          >
            <c-select-complete
                v-model="item.coordinador_id"
                label="Coordinador"
                name="Coordinador"
                :items="coordinators"
                item-text="name"
                item-value="id"
                rules="required"
                :hint="hintCoordinator"
            >
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.email"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </c-select-complete>
          </v-col>
          <v-col
              v-if="item.es_lider === 0"
              cols="12"
          >
            <v-switch
                inset
                hide-details
                v-model="item.es_coordinador"
                label="Es Coordinador"
                :true-value="1"
                :false-value="0"
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
    coordinators: [],
    item: User.create()
  }),
  watch: {
    'item.es_lider': {
      handler (val) {
        if (val) {
          this.item.es_coordinador = 0
        } else {
          this.item.coordinador_id = null
        }
      },
      immediate: false
    }
  },
  computed: {
    hintCoordinator () {
      return this.coordinators?.find(x => x.id === this.item?.coordinador_id)?.email || ''
    }
  },
  created() {
    this.getCoordinators()
  },
  methods: {
    save (confirm) {
      if (confirm) {
        const request = this.item.id
            ? this.axios.put(`users/${this.item.id}`, this.item)
            : this.axios.post('users', this.item)
        request
            .then(({data}) => {
              store.commit('SET_SNACKBAR', {message: `El usuario se ${this.item.id ? 'actualizó' : 'guardó'} correctamente.`})
              this.$emit('saved',data ? !this.item.id ? data.user : data : null)
              this.close()
            })
            .catch(e => {
              store.commit('SET_SNACKBAR', {color: 'error', message: 'Error al guardar el registro del usuario.', error: e})
              this.loading = false
            })
      }
    },
    getCoordinators () {
      this.axios.get('users?filter[es_coordinador]=1')
      // this.axios.get('users')
          .then(({data}) => {
            this.coordinators = data || []
          })
          .catch(e => {
            store.commit('SET_SNACKBAR', {color: 'error', message: 'Error al recuperar los registros de coordinadores.', error: e})
          })
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