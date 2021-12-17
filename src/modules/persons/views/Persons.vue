<template>
  <v-container>
    <view-title>
      <template v-slot:action>
        <v-btn
            color='primary'
            @click='registerItem'
        >
          Registrar Persona
        </v-btn>
      </template>
    </view-title>
    <v-row
        justify="center"
    >
      <v-col
          cols="12"
          md="8"
          lg="6"
          class="mx-auto"
      >
        <v-text-field
            v-model="search"
            placeholder="Buscar..."
            prepend-inner-icon="mdi-magnify"
            dense
            filled
            rounded
            hide-details
            clearable
        />
      </v-col>
      <v-col cols="12">
        <div style="position: relative !important;">
          <v-data-table
              :headers='headers'
              :items='persons'
              :loading='loading'
              loading-text='Cargando... por favor espere'
              class='elevation-1'
          >
            <template v-slot:item.person='{ item }'>
              <v-list-item class="pa-0">
                <v-list-item-avatar class="ma-0">
                  <v-icon size="30">
                    {{ item.sexo ? item.sexo === 'M' ? 'mdi-face-man' : 'mdi-face-woman' : 'mdi-account' }}
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content class="py-1">
                  <v-list-item-title>
                    {{ [item.nombre1, item.nombre2, item.apellido1, item.apellido2].filter(x => x).join(' ') }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ [item.tipo_identificacion, item.identificacion].filter(x => x).join(' ') }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:item.contact='{ item }'>
              <v-list-item class="pa-0">
                <v-list-item-content class="py-1">
                  <v-list-item-title v-if="item.celular || item.celular2">
                    <v-icon size="16">mdi-cellphone</v-icon>
                    <template v-if="item.celular">
                      <c-tooltip
                          top
                          tooltip="Principal"
                      >
                        <a :href="`tel:${item.celular}`">
                          {{ item.celular }}
                        </a>
                      </c-tooltip>
                    </template>
                    <template v-if="item.celular && item.celular2"> | </template>
                    <template v-if="item.celular2">
                      <c-tooltip
                          top
                          tooltip="Opcional"
                      >
                        <a :href="`tel:${item.celular2}`">
                          {{ item.celular2 }}
                        </a>
                      </c-tooltip>
                    </template>
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="item.email">
                    <v-icon size="16">mdi-email</v-icon>
                    {{ item.email }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:item.residence='{ item }'>
              <v-list-item class="pa-0">
                <v-list-item-content class="py-1">
                  <v-list-item-title v-if="item.direccion">
                    {{ item.direccion }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ [item.municipio ? item.municipio.nombre : null, item.departamento ? item.departamento.nombre : null].filter(x => x).join(', ') }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:item.vote='{ item }'>
              <v-list-item class="pa-0">
                <c-tooltip top tooltip="Mesa de votación">
                  <v-list-item-avatar
                      tile
                      :color="item.mesa_votacion ? 'info' : 'warning'"
                      class="ma-0 mr-1 white--text"
                  >
                    {{ item.mesa_votacion || '?' }}
                  </v-list-item-avatar>
                </c-tooltip>
                <v-list-item-content class="py-1">
                  <v-list-item-title>
                    {{ item.lugar_votacion }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ [item.municipio_votacion ? item.municipio_votacion.nombre : null, item.departamento_votacion ? item.departamento_votacion.nombre : null].filter(x => x).join(', ') }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:item.options='{ item }'>
              <div class="optionsButtons">
                <v-toolbar>
                  <c-tooltip bottom tooltip='Editar'>
                    <v-btn
                        class='ma-1'
                        color='blue'
                        depressed
                        fab
                        x-small
                        @click='editItem(item)'
                    >
                      <v-icon color='white'>mdi-pencil</v-icon>
                    </v-btn>
                  </c-tooltip>
<!--                  <c-tooltip bottom tooltip='Ver Detalle'>-->
<!--                    <v-btn-->
<!--                        class='ma-1'-->
<!--                        color='success'-->
<!--                        depressed-->
<!--                        fab-->
<!--                        x-small-->
<!--                        @click='detalleItem(item)'-->
<!--                    >-->
<!--                      <v-icon>mdi-file-find</v-icon>-->
<!--                    </v-btn>-->
<!--                  </c-tooltip>-->
                </v-toolbar>
              </div>
            </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>
    <person-register
        ref='itemRegister'
    />
  </v-container>
</template>

<script>
import PersonRegister from '../components/PersonRegister'
import store from '@/store'
export default {
  name: 'Persons',
  components: {
    PersonRegister
  },
  data: () => ({
    search: null,
    loading: false,
    headers: [
      {
        text: 'Persona',
        sortable: false,
        value: 'person',
      },
      {
        text: 'Contacto',
        sortable: false,
        value: 'contact',
      },
      {
        text: 'Lugar de residencia',
        sortable: false,
        value: 'residence',
      },
      {
        text: 'Votación',
        sortable: false,
        value: 'vote',
      },
      {
        text: '',
        value: 'options',
        sortable: false
      },
    ]
  }),
  computed: {
    persons() {
      return store.getters['personsModule/persons'](this.search || '')
    }
  },
  methods: {
    registerItem () {
      this.$refs.itemRegister.open()
    },
    editItem (item) {
      this.$refs.itemRegister.open(item)
    }
  }
}
</script>

<style>
.optionsButtons>header {
  position: absolute !important;
  right: 8px !important;
  height: 0 !important;
}
.optionsButtons>header .v-toolbar__content, .v-toolbar__extension {
  padding: 0 !important;
}

.v-data-table tr .optionsButtons {
  align-content: center;
  margin-top: -2.5em;
  display: none;
}

.v-data-table tr:hover .optionsButtons {
  display: block;
}
</style>