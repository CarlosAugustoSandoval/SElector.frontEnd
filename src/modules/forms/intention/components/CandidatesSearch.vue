<template>
  <ValidationProvider
      :name="name"
      :rules="rules"
      v-slot="{ errors }"
  >
    <v-autocomplete
        :label="label"
        v-model="candidate"
        item-value="id"
        item-text="nombre_completo"
        :items="type ? type === 'senado' ? candidatosSenado : candidatosCamara : []"
        :loading="loading"
        :filter="filterCandidates"
        placeholder="Buscar por nombre o partido"
        no-data-text="No hay resultados para mostrar"
        outlined
        :error-messages="errors"
        hide-selected
        persistent-hint
        :hint="candidateObject ? `Partido: ${candidateObject.partido}` : ''"
        @change="val => $emit('change', val)"
    >
      <template v-slot:item="data">
        <div style="width: 100% !important;">
          <v-list-item class="pa-0">
            <v-list-item-content class="text-truncate pa-0">
              <v-list-item-title class="body-2">
                {{ data.item.nombre_completo }}
              </v-list-item-title>
              <v-list-item-subtitle class="caption">
                Partido: {{ data.item.partido }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="ma-0"></v-divider>
        </div>
      </template>
    </v-autocomplete>
  </ValidationProvider>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'CandidatesSearch',
  props: {
    label: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number, Object],
      default: null
    },
    name: {
      type: String,
      default: null
    },
    rules: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },
  data: () => ({
    candidateObject: null,
    loading: false,
    filterCandidates(item, queryText) {
      const hasValue = val => val != null ? val : ''
      const text = hasValue(item.nombre_completo + ' ' + item.partido)
      const query = hasValue(queryText)
      return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
    }
  }),
  computed: {
    ...mapGetters('dedicatesModule',['candidatosSenado', 'candidatosCamara']),
    candidate: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
        this.candidateObject = (typeof val !== 'undefined') ? this[this.type === 'senado' ? 'candidatosSenado' : 'candidatosCamara'].find(x => x.id === val) : null
        this.$emit('inputObject', this.candidateObject)
      }
    }
  }
}
</script>