<template>
  <v-dialog
      v-model="dialog"
      max-width="920"
      persistent
  >
    <c-card
        flat
        tile
        avatar
        darkHeader
        form-validation
        show-actions
        show-close-button
        text-save-button="Guardar"
        header-background="primary"
        :icon="item && item.id ? 'mdi-file-edit' : 'mdi-file-plus'"
        :loading.sync="loading"
        :title="`${ item && item.id ? `Reporte No. ${item.id}` : `Nuevo Reporte` }`"
        :subtitle="item && item.id ? `Registro ID: ${ item.id }` : ''"
        @close="close"
        @cancel="close"
        @save="val => save(val)"
        class-container="pt-2"
    >
      <v-container v-if="item">
        <v-row
            justify="center"
            align="center"
            dense
        >
          <v-col cols="12">
            <c-text
                v-model="item.nombre"
                label="Nombre"
                rules="required"
                name="nombre"
            />
          </v-col>
          <v-col cols="12">
            <c-text-area
                v-model="item.descripcion"
                label="Descripción"
                name="descripción"
                rules="required"
                rows="1"
            />
          </v-col>
          <v-col cols="12">
            <ValidationProvider
                name="query"
                rules="required|sqlIntegrity"
                v-slot="{ errors }"
            >
                <span
                    :class="focusCOdemirror ? errors[0] ? 'error--text' : 'primary--text' : errors[0] ? 'error--text' : ''"
                    class="caption v-label v-label--active theme--light"
                >
                  Sentencia SQL
                </span>
              <codemirror
                  v-model="item.query"
                  :options="cmOptions"
                  @focus="focusCOdemirror = true"
                  @blur="focusCOdemirror = false"
              />
              <v-card-actions>
                <span class="red--text caption">{{ errors[0] }}</span>
                <span class="caption grey--text text--darken-1">
                  {{ errors[0] ? '...' : '' }} Las variables se escriben con el prefijo ':' y sin espacios Ej. => :variable_uno
                </span>
                <template v-if="item.query">
                  <v-spacer/>
                  <v-btn
                      v-if="$vuetify.breakpoint.mdAndUp"
                      dark
                      color="green"
                      class="mr-2"
                      @click="probarSql"
                  >
                    Probar Sentencia SQL
                    <v-icon right large>mdi-play</v-icon>
                  </v-btn>
                  <c-tooltip
                      v-else
                      top
                      tooltip="Probar Sentencia SQL"
                  >
                    <v-btn
                        icon
                        color="green"
                        class="mr-2"
                        @click="probarSql"
                    >
                      <v-icon large>mdi-play</v-icon>
                    </v-btn>
                  </c-tooltip>
                </template>
              </v-card-actions>
            </ValidationProvider>
            <v-card v-if="item.variables && item.variables.length">
              <v-toolbar dense class="elevation-0">
                <v-toolbar-title>Variables</v-toolbar-title>
              </v-toolbar>
              <v-simple-table
                  id="controlTable"
                  dense
              >
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th>Referencia</th>
                    <th>Label Control</th>
                    <th>Tipo Control</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(variable, indexVariable) in item.variables" :key="`variable${indexVariable}`">
                    <td>
                      {{ variable.ref }}
                    </td>
                    <td>
                      <c-text
                          v-model="variable.label"
                          placeholder="Label"
                          rules="required"
                          name="label"
                          :vid="`label${indexVariable}`"
                          :outlined="false"
                      />
                    </td>
                    <td>
                      <c-select-complete
                          v-model="variable.type"
                          placeholder="Tipo"
                          rules="required"
                          name="tipo control"
                          :vid="`tipo${indexVariable}`"
                          :outlined="false"
                          :items="controlTypes"
                          item-text="name"
                          item-value="id"
                      />
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
          <v-col cols="12">
            <c-combo-box
                v-model="item.columns"
                label="Columnas Visibles"
                :items="item.items"
                hide-details
            />
          </v-col>
          <v-col cols="12">
            <c-select-complete
                v-model="item.roles"
                label="Roles que visualizan"
                rules="required"
                name="roles que visualizan"
                :items="roles"
                item-text="name"
                item-value="id"
                multiple
            />
          </v-col>
        </v-row>
      </v-container>
    </c-card>
  </v-dialog>
</template>

<script>
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/theme/solarized.css'
import Report from '../models/Report'

export default {
  name: 'ReportRegister',
  components: {
    codemirror
  },
  data: () => ({
    focusCOdemirror: false,
    pattern: /:(\w+)(?!\w)/g,
    cmOptions: {
      tabSize: 4,
      lineWrapping: false,
      styleActiveLine: true,
      lineNumbers: true,
      line: true,
      mode: 'text/x-mysql',
      theme: 'solarized light'
    },
    controlTypes: [
      {id: 'text', name: 'Texto'},
      {id: 'number', name: 'Número'},
      {id: 'date', name: 'Fecha'}
    ],
    loading: false,
    dialog: false,
    item: null,
    roles: []
  }),
  watch: {
    'item.query': {
      handler(val) {
        if (typeof val !== 'undefined') this.reloadVariables()
      },
      immediate: false
    }
  },
  methods: {
    probarSql() {
      this.loading = true
      this.axios.post('test-query', {query: this.item.query})
          .then(() => {
            this.$store.commit('SET_SNACKBAR', {
              color: 'success',
              message: 'La sentencia SQL se ha probado correctamente.'
            })
            this.loading = false
          })
          .catch(e => {
            this.loading = false
            this.$store.commit('SET_SNACKBAR', {
              color: 'warning',
              message: 'Error al probar la sentencia SQL.',
              error: e
            })
          })
    },
    reloadVariables() {
      const fields = window.lodash.uniq(this.item.query.match(this.pattern))
      if (fields) {
        const generatedVariables = []
        fields.forEach(x => {
          generatedVariables.push({ref: x, type: null, label: null})
        })
        const newVariables = this.getNewVariables(generatedVariables)
        if (newVariables.length) this.item.variables.length ? this.item.variables = this.item.variables.concat(newVariables) : this.item.variables = newVariables
        this.removeVariables(generatedVariables)
      } else {
        this.item.variables = []
      }
    },
    removeVariables(generatedVariables) {
      if (this.item.variables.length) {
        this.item.variables = this.item.variables.filter(x => {
          return window.lodash.includes(generatedVariables.map(z => z.ref), x.ref)
        })
      }
    },
    getNewVariables(generatedVariables) {
      if (this.item.variables.length) {
        const returnVariables = generatedVariables.filter(z => {
          return !window.lodash.includes(this.item.variables.map(x => x.ref), z.ref)
        })
        return !returnVariables ? [] : returnVariables
      } else {
        return generatedVariables
      }
    },
    save(result) {
      if (result) {
        this.loading = true
        const copy = this.clone(this.item)
        copy.columns = copy.columns && copy.columns.length ? copy.columns.map(x => x.text).join(',') : null
        const request = copy.id ? this.axios.put(`reportes/${copy.id}`, copy) : this.axios.post('reportes', copy)
        request
            .then(response => {
              this.$emit('guardado', response.data)
              this.$store.commit('SET_SNACKBAR', {
                color: 'success',
                message: 'El reporte se guardo correctamente.'
              })
              this.close()
            })
            .catch(e => {
              this.loading = false
              this.$store.commit('SET_SNACKBAR', {
                color: 'error',
                message: 'Error al guardar el reporte.',
                error: e
              })
            })
      }
    },
    open(idReport = null) {
      if (!this.roles?.length) this.getRoles()
      if (idReport) {
        this.getReport(idReport)
      } else {
        this.item = Report.create()
      }
      this.dialog = true
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.loading = false
        this.item = null
      }, 400)
    },
    getReport(idReport) {
      this.loading = true
      this.axios.get(`reportes/${idReport}`)
          .then(response => {
            if (response.data.columns && response.data.columns.length) {
              response.data.columns = response.data.columns.split(',').map(x => {
                return {text: x, color: 'purple'}
              })
              response.data.items = this.clone(response.data.columns).concat([{header: 'Seleccionar o Crear un item'}])
            }
            response.data.roles = response.data.roles && response.data.roles.length ? response.data.roles.map(x => x.id) : []
            this.item = response.data
            this.loading = false
          })
          .catch(e => {
            this.loading = false
            this.$store.commit('SET_SNACKBAR', {
              color: 'error',
              message: 'Error al recuperar el reporte para edición.',
              error: e
            })
          })
    },
    getRoles() {
      this.axios.get('roles')
          .then(response => {
            this.roles = response.data
          })
          .catch(e => {
            this.$store.commit('SET_SNACKBAR', {
              color: 'error',
              message: 'Error al solicitar los roles disponibles.',
              error: e
            })
          })
    }
  }
}
</script>

<style scoped>
#controlTable>thead>tr>th{
  height: 30px !important;
}
#controlTable>tbody>tr>td{
  height: 30px !important;
}
</style>
