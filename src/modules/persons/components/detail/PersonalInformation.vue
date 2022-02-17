<template>
  <v-card v-if="item">
    <v-list two-line dense>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon large>{{ item.sexo === 'F' ? 'mdi-face-woman' : 'mdi-face-man' }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="pa-0">
          <v-list-item-title class="grey--text text--darken-1">
            {{ [item.nombre1, item.nombre2, item.apellido1, item.apellido2].filter(x => x).join(' ') }}
          </v-list-item-title>
          <v-list-item-title>
            {{`${item.tipo_identificacion} ${item.identificacion}`}}
          </v-list-item-title>
          <v-list-item-subtitle v-if="item.celular || item.celular2">
            <v-icon size="16" class="mr-1" color="green">mdi-cellphone-check</v-icon>
            <template v-if="item.celular">
              <c-tooltip
                  top
                  tooltip="Principal"
              >
                <a
                    :href="`tel:${item.celular}`"
                >
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
                <a
                    :href="`tel:${item.celular2}`"
                >
                  {{ item.celular2 }}
                </a>
              </c-tooltip>
            </template>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action-text>
          <v-btn
              class="ml-2"
              icon
              @click="panel= !panel"
          >
            <v-icon>mdi-chevron-{{panel ? 'up' : 'down'}}</v-icon>
          </v-btn>
        </v-list-item-action-text>
      </v-list-item>
    </v-list>
    <v-expand-transition>
      <div v-if="panel">
        <v-card-text>
          <v-row dense>
            <template v-for="(info, indexInfo) in information">
              <v-col
                  :key="`col${indexInfo}`"
                  cols="12"
                  :md="info.colmd"
                  :lg="info.collg"
              >
                <v-list>
                  <v-list-item class="pa-0">
                    <v-list-item-avatar class="ma-1">
                      <v-icon :color="info.iconColor">{{ info.icon }}</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="pa-0">
                      <v-list-item-subtitle class="grey--text fs-12 fw-normal">{{ info.label }}</v-list-item-subtitle>
                      <v-list-item-title v-if="info.label === 'Email'">
                        <template v-if="info.label === 'Email' && info.body">
                          <a :href="`mailto:${info.body}`">
                            {{ info.body }}
                          </a>
                        </template>
                      </v-list-item-title>
                      <v-list-item-title v-else>
                        {{ info.body }}
                      </v-list-item-title>
                      <v-list-item-subtitle
                          v-if="info.subtitle"
                          :class="info.clasSubtitle"
                          class="font-weight-regular"
                      >
                        {{ info.subtitle }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </template>
            <v-col cols="12">
              <v-divider />
              <v-list dense>
                <v-list-item @click="click = false">
                  <v-list-item-avatar
                      size="42"
                      style="line-height: 12px !important;"
                      class="white--text subtitle-2 my-1 mr-1 align-self-center"
                      :color="item.testigo_electoral ? 'teal' : 'grey lighten-2'"
                  >
                    {{ item.testigo_electoral || '?' }}
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="title py-1">Es testigo electoral</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="click = false">
                  <v-list-item-avatar
                      size="42"
                      style="line-height: 12px !important;"
                      class="white--text subtitle-2 my-1 mr-1 align-self-center"
                      :color="item.condicion_desplazamiento ? 'teal' : 'grey lighten-2'"
                  >
                    {{ item.condicion_desplazamiento || '?' }}
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="title py-1">Puede desplazarse al lugar de votación</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" v-if="item.user">
              <v-divider />
              <v-list two-line>
                <v-list-item>
                  <v-list-item-avatar
                      class="my-1 mr-1 align-self-center"
                      size="42"
                      color="primary"
                  >
                    <v-icon dark large>mdi-account-circle</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content class="pa-0">
                    <v-list-item-subtitle class="grey--text fs-12 fw-normal">Registrado por:</v-list-item-subtitle>
                    <v-list-item-title>{{ item.user.name }}</v-list-item-title>
                    <v-list-item-subtitle class="grey--text fs-12 fw-normal">
                      <v-icon small>mdi-email</v-icon>
                      {{ item.user.email }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle
                        v-if="item.created_at"
                        class="grey--text fs-12 fw-normal"
                    >
                      <v-icon small>mdi-calendar-month</v-icon>
                      {{ moment(item.created_at).format('DD/MM/YYYY HH:mm') }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'PersonalInformation',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    information: [],
    click: false,
    panel: true
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
  methods: {
    assign() {
      this.information = []
      this.information.push(
          {
            label: 'Fecha Nacimiento',
            body: this.item.fecha_nacimiento || '',
            subtitle: this.item.fecha_nacimiento ? this.calculaEdad(this.item.fecha_nacimiento).stringDate : '',
            icon: 'mdi-calendar-month',
            iconColor: 'warning',
            colmd: '6',
            collg: '6'
          },
          {
            label: 'Email',
            body: this.item.email,
            icon: 'mdi-email',
            iconColor: 'teal',
            colmd: '6',
            collg: '6'
          },
          {
            label: 'Residencia',
            body: [this.item.municipio?.nombre || '', this.item.departamento?.nombre || ''].join(', '),
            subtitle: this.item.direccion || '',
            icon: 'mdi-home',
            iconColor: 'purple',
            colmd: '6',
            collg: '6'
          },
          {
            label: 'Votación',
            body: [this.item.municipio_votacion?.nombre || '', this.item.departamento_votacion?.nombre || ''].join(', '),
            subtitle: [this.item.mesa_votacion ? `Mesa: ${this.item.mesa_votacion}` : '', this.item.lugar_votacion || ''].filter(x => x).join(' - '),
            icon: 'mdi-home-city',
            iconColor: 'indigo',
            colmd: '6',
            collg: '6'
          }
      )
    }
  }
}
</script>