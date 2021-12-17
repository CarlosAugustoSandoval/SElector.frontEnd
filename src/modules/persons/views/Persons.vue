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
              {{item.nombre1}}
            </template>
            <template v-slot:item.contact='{ item }'>
              {{item.celular}}
            </template>
            <template v-slot:item.vote='{ item }'>
              {{item.lugar_votacion}}
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
        text: 'votación',
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