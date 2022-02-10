<template>
  <v-dialog
      v-model="dialog"
      max-width="600"
      persistent
  >
    <c-card
        flat
        tile
        avatar
        darkHeader
        show-close-button
        form-validation
        show-actions
        header-background="primary"
        :icon="`mdi-file-${item && item.uuid ? 'edit' : 'plus'}`"
        :loading.sync="loading"
        :title="`${item && item.uuid ? 'Edición' : 'Registro'} de intención de voto`"
        @close="close"
        @cancel="close"
        @save="val => save(val)"
    >
      <v-container v-if="item">
        <v-row class="mb-3">
          <v-col cols="12">
            <v-list-item v-if="person">
              <v-list-item-avatar class="ma-0 mr-2">
                <v-icon size="40">
                  {{ person.sexo ? person.sexo === 'M' ? 'mdi-face-man' : 'mdi-face-woman' : 'mdi-account' }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content class="py-1">
                <v-list-item-title>
                  {{ person.nombre_completo }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ [person.tipo_identificacion, person.identificacion].filter(x => x).join(' ') }}
                </v-list-item-subtitle>
                <v-list-item-title v-if="person.celular || person.celular2">
                  <v-icon size="16" class="mr-1">mdi-cellphone-check</v-icon>
                  <template v-if="person.celular">
                    <c-tooltip
                        top
                        tooltip="Principal"
                    >
                      <a
                          :href="`tel:${person.celular}`"
                      >
                        {{ person.celular }}
                      </a>
                    </c-tooltip>
                  </template>
                  <template v-if="person.celular && person.celular2"> | </template>
                  <template v-if="person.celular2">
                    <c-tooltip
                        top
                        tooltip="Opcional"
                    >
                      <a
                          :href="`tel:${person.celular2}`"
                      >
                        {{ person.celular2 }}
                      </a>
                    </c-tooltip>
                  </template>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <candidates-search
                v-model="item.candidato_camara_id"
                type="camara"
                label="Candidato a la cámara"
                name="Candidato a la cámara"
                rules="required"
            />
          </v-col>
          <v-col cols="12">
            <candidates-search
                v-model="item.candidato_senado_id"
                type="senado"
                label="Candidato al senado"
                name="Candidato al senado"
                rules="required"
            />
          </v-col>
        </v-row>
      </v-container>
    </c-card>
  </v-dialog>
</template>

<script>
import Intention from '../models/Intention'
import {mapState} from 'vuex'
import CandidatesSearch from "./CandidatesSearch";

export default {
  name: 'IntentionRegister',
  components: {CandidatesSearch},
  data: () => ({
    loading: false,
    dialog: false,
    person: null,
    item: null,
  }),
  computed: {
    ...mapState('dedicatesModule', ['candidates'])
  },
  methods: {
    save(result) {
      if (result) {
        this.loading = true
        this.item.elector_uuid = this.person.uuid
        this.$store.dispatch('intentionModule/save', this.item)
            .then(resolve => {
              this.$emit('saved')
              if (resolve) this.close()
              this.loading = false
            })
      }
    },
    async open(person) {
      if (person) {
        this.person = person
        this.item = await Intention.create()
        this.dialog = true
      } else {
        this.$store.commit('SET_SNACKBAR', {color: 'error', message: 'No se ha seleccionado ningun registro'})
      }
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.loading = false
        this.item = null
        this.person = null
      }, 400)
    }
  }
}
</script>