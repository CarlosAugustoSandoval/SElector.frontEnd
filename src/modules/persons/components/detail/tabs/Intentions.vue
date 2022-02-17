<template>
  <v-card tile>
    <v-toolbar
        :color="color"
        dark
        dense
        tile
        flat
    >
      <v-toolbar-title>Intenciones de voto</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="permissionsIntention.create">
        <c-tooltip
            left
            tooltip="Registrar Intención"
            :disabled="$vuetify.breakpoint.smAndUp"
        >
          <v-btn
              :color="`${color} darken-3`"
              depressed
              :small="!!$vuetify.breakpoint.xsOnly"
              :fab="$vuetify.breakpoint.xsOnly"
              @click="registerIntent"
          >
            <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-plus</v-icon>
            {{$vuetify.breakpoint.smAndUp ? 'Registrar Intención' : ''}}
          </v-btn>
        </c-tooltip>
      </template>
    </v-toolbar>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-simple-table
              v-if="item && permissionsIntention.view"
          >
            <template v-slot:default>
              <thead>
              <tr>
                <th>Fecha</th>
                <th>Senado</th>
                <th>Cámara</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(intention, intentionIndex) in item.intenciones_voto"
                  :key="intentionIndex"
              >
                <td>
                  {{intention.created_at ? moment(intention.created_at).format('DD/MM/YYYY HH:mm') : ''}}
                </td>
                <td>
                  <v-list-item-content v-if="intention.candidato_senado">
                    <v-list-item-subtitle class="font-weight-black">
                      {{ intention.candidato_senado.nombre_completo }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="caption">
                      {{ intention.candidato_senado.partido }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </td>
                <td>
                  <v-list-item-content v-if="intention.candidato_camara">
                    <v-list-item-subtitle class="font-weight-black">
                      {{ intention.candidato_camara.nombre_completo }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="caption">
                      {{ intention.candidato_camara.partido }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
    <intention-register
        ref='intentionRegister'
        @saved="$emit('saved')"
    />
  </v-card>
</template>

<script>
import IntentionRegister from '@/modules/forms/intention/components/IntentionRegister'
import store from '@/store'
export default {
  name: 'Intentions',
  components: {
    IntentionRegister,
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  data: () => ({
  }),
  watch: {
    item: {
      handler(val) {
        val && this.assign()
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    permisos () {
      return store.getters['authModule/permissionsByModule']('electores')
    },
    permissionsIntention () {
      return store.getters['authModule/permissionsByModule']('intencionVoto')
    }
  },
  methods: {
    registerIntent() {
      this.$refs.intentionRegister.open(this.item)
    },
    assign() {
    }
  }
}
</script>