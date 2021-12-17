<template>
  <v-dialog
      v-model="dialog"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-icon left>mdi-account-{{ item && item.uuid ? 'edit' : 'plus'}}</v-icon>
        <v-toolbar-title>
          {{ item && item.uuid ? 'Edición' : 'Registro' }}  de Persona
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid>
        <v-row dense>
          <v-col md="6" offset-md="3">
            <v-card tile flat>
              <ValidationObserver
                  v-if="item"
                  ref="formItem"
                  v-slot="{ invalid, validated }"
              >
                <v-container>
                  <v-row dense>
                    <v-col cols="12">
                      <v-subheader class="subtitle-2">
                        <v-icon left>mdi-card-account-details</v-icon>
                        Datos personales
                      </v-subheader>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <c-text
                          v-model="item.identificacion"
                          label="Identificación"
                          rules="required"
                          name="identificación"
                      />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <c-radio
                          v-model="item.sexo"
                          :items="sexos"
                          itemValue="value"
                          itemText="text"
                          name="sexo"
                          rules="required"
                          :column="!$vuetify.breakpoint.smAndUp"
                          :readonly="identificacionVerificada < 1 || !!sexoAutomatico"
                      />
                    </v-col>
                    <!--                    <v-col cols="12" sm="6">-->
                    <!--                      <c-select-complete-->
                    <!--                          v-model="item.tipo_identificacion"-->
                    <!--                          label="Tipo identificación"-->
                    <!--                          rules="required"-->
                    <!--                          name="tipo identificación"-->
                    <!--                          :items="tiposIdentificacion"-->
                    <!--                          item-text="descripcion"-->
                    <!--                          item-value="tipo"-->
                    <!--                          :disabled="identificacionVerificada < 1"-->
                    <!--                      />-->
                    <!--                    </v-col>-->
                    <v-col cols="12" sm="6">
                      <c-text
                          v-model="item.nombre1"
                          label="Primer nombre"
                          rules="required"
                          name="primer nombre"
                          upper-case
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <c-text
                          v-model="item.nombre2"
                          label="Segundo nombre"
                          upper-case
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <c-text
                          v-model="item.apellido1"
                          label="Primer apellido"
                          rules="required"
                          name="primer apellido"
                          upper-case
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <c-text
                          v-model="item.apellido2"
                          label="Segundo apellido"
                          upper-case
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <c-date-manual
                          v-model="item.fecha_nacimiento"
                          label="Fecha de Nacimiento"
                          name="Fecha de nacimiento"
                          rules="required"
                          :max="moment().format('YYYY-MM-DD')"
                          :hint="edadText || ''"
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <c-select-complete
                          v-model="item.medio_contacto"
                          label="Medio de contacto"
                          name="medio de contacto"
                          rules="required"
                          :items="mediosContacto"
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <c-text
                          v-model="item.celular"
                          label="Celular"
                          name="celular"
                          rules="required|numeric|minlength:10|maxlength:10|phoneNumber"
                          type="tel"
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <c-text
                          v-model="item.celular2"
                          label="Teléfono Opcional"
                          name="teléfono opcional"
                          rules="numeric|minlength:10|phoneNumber"
                          type="tel"
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
                    <v-col cols="12">
                      <c-text
                          v-model="item.email"
                          label="Email"
                          rules="email"
                          name="email"
                          lower-case
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <c-select-complete
                          v-model="item.codigo_departamento"
                          label="Departamento de residencia"
                          name="departamento de residencia"
                          rules="required"
                          :items="departamentos"
                          item-text="nombre"
                          item-value="codigo_dane"
                          :disabled="identificacionVerificada < 1"
                          @change="item.codigo_municipio = null"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <c-select-complete
                          v-model="item.codigo_municipio"
                          label="Municipio de residencia"
                          name="municipio de residencia"
                          rules="required"
                          :items="municipiosResidencia"
                          item-text="nombre"
                          item-value="codigo_dane"
                          :disabled="identificacionVerificada < 1 || !item.codigo_departamento"
                      />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <c-select-complete
                          v-model="item.zona"
                          label="Zona de residencia"
                          name="zona de residencia"
                          rules="required"
                          :items="zonas"
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
                    <v-col cols="12">
                      <c-text
                          v-model="item.direccion"
                          label="Dirección de residencia"
                          rules="required|minlength:6|direccion"
                          name="dirección de residencia"
                          upper-case
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
<!--                    <v-col cols="12">-->
<!--                      <c-select-complete-->
<!--                          v-model="item.etnia"-->
<!--                          label="Etnia"-->
<!--                          rules="required"-->
<!--                          name="etnia"-->
<!--                          :items="etnias"-->
<!--                          item-text="nombre"-->
<!--                          item-value="codigo"-->
<!--                          :disabled="identificacionVerificada < 1"-->
<!--                      />-->
<!--                    </v-col>-->
                    <v-col cols="12">
                      <v-subheader class="subtitle-2">
                        <v-icon left>mdi-home-city</v-icon>
                        Lugar de votación
                      </v-subheader>
                    </v-col>
                    <v-col cols="12" md="6">
                      <c-select-complete
                          v-model="item.codigo_departamento_votacion"
                          label="Departamento de votación"
                          name="departamento de votación"
                          :items="departamentos"
                          item-text="nombre"
                          item-value="codigo_dane"
                          :disabled="identificacionVerificada < 1"
                          @change="item.codigo_municipio_votacion = null"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <c-select-complete
                          v-model="item.codigo_municipio_votacion"
                          label="Municipio de votación"
                          name="municipio de votación"
                          :rules="item.codigo_departamento_votacion ? 'required' : ''"
                          :items="municipiosVotacion"
                          item-text="nombre"
                          item-value="codigo_dane"
                          :disabled="identificacionVerificada < 1 || !item.codigo_departamento_votacion"
                      />
                    </v-col>
                    <v-col cols="12">
                      <c-text-area
                          label="Lugar de votación"
                          v-model="item.lugar_votacion"
                          :rows="1"
                          :disabled="identificacionVerificada < 1 || !item.codigo_municipio_votacion"
                      />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <c-number
                          v-model="item.mesa_votacion"
                          label="Mesa de votación"
                          name="mesa de votación"
                          min="0"
                          :disabled="identificacionVerificada < 1 || !item.lugar_votacion"
                      />
                    </v-col>
                    <v-col cols="12">
                      <c-radio
                          v-model="item.condicion_desplazamiento"
                          :items="[{ text: 'Si', value: 'SI' },{ text: 'No', value: 'NO' }]"
                          itemValue="value"
                          itemText="text"
                          rules="required"
                          name="desplazamiento al lugar de votación."
                          label="¿Puede desplazarse al lugar de votación?"
                          :column="!$vuetify.breakpoint.smAndUp"
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
                    <v-col cols="12">
                      <c-text-area
                          label="Observaciones"
                          v-model="item.observaciones"
                          :disabled="identificacionVerificada < 1"
                      />
                    </v-col>
                  </v-row>
                  <v-alert
                      v-if="invalid && validated"
                      type="error"
                      dense
                      class="ma-0"
                  >
                    Hay errores en el formulario
                  </v-alert>
                </v-container>
              </ValidationObserver>
              <v-divider/>
              <v-card-actions>
                <v-btn
                    text
                    @click.stop="close"
                >
                  Cerrar
                </v-btn>
                <v-spacer/>
                <v-btn
                    color="primary"
                    @click.stop="save"
                >
                  Registrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import modelPersona from '../models/Persona'
import {mapState} from 'vuex'

export default {
  name: 'PersonRegister',
  data: () => ({
    dialog: false,
    identificacionVerificada: 1,
    edadText: '',
    item: null
  }),
  computed: {
    ...mapState('dataModule', ['tiposIdentificacion', 'sexos', 'mediosContacto', 'departamentos', 'municipios', 'zonas', 'etnias']),
    municipiosResidencia() {
      return (this.item?.codigo_departamento && this.municipios?.length && this.municipios.filter(x => x.codigo_departamento === this.item.codigo_departamento)) || []
    },
    municipiosVotacion() {
      return (this.item?.codigo_departamento_votacion && this.municipios?.length && this.municipios.filter(x => x.codigo_departamento === this.item.codigo_departamento_votacion)) || []
    },
    sexoAutomatico() {
      if (!this.item || this.item.tipo_identificacion !== 'CC' || !this.item.identificacion || isNaN(Number(this.item.identificacion)) || (!isNaN(Number(this.item.identificacion)) && ((Number(this.item.identificacion) >= 1000000000) || (Number(this.item.identificacion) <= 0)))) {
        return null
      } else {
        const identificacion = Number(this.item.identificacion)
        return ((identificacion > 0 && identificacion <= 19999999) || (identificacion >= 70000000 && identificacion <= 99999999)) ? 'M' : 'F'
      }
    }
  },
  watch: {
    sexoAutomatico: {
      handler(val) {
        if (typeof val !== 'undefined' && this.item) this.item.sexo = val
      },
      immediate: true
    },
    'item.fecha_nacimiento': {
      handler(val) {
        if (this?.item) {
          let laEdad = this.calculaEdad(val)
          this.item.edad = laEdad.years
          this.edadText = laEdad.stringDate
        }
      },
      immediate: true,
    }
  },
  methods: {
    save() {
      this.$refs.formItem.validate().then((result) => {
        if (result) {
          this.loading = true
          this.$store.dispatch('personsModule/save', this.item)
              .then(resolve => {
                if (resolve) this.close()
                this.loading = false
              })
        }
      })
    },
    open(item) {
      if (item) {
        this.item = this.clone(item)
      } else {
        this.item = this.clone(modelPersona)
      }
      this.dialog = true
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.loading = false
        this.item = null
        this.$refs.formItem.reset()
      }, 400)
    }
  }
}
</script>