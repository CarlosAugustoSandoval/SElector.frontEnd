import Vue from 'vue'
import moment from 'moment'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, email, numeric } from 'vee-validate/dist/rules'
Vue.use({
  install (Vue) {
    Vue.component('ValidationProvider', ValidationProvider)
    Vue.component('ValidationObserver', ValidationObserver)
  }
})

extend('required', {
  ...required,
  message: 'El campo {_field_} es requerido'
})

extend('email', {
  ...email,
  message: 'El correo no es valido'
})

extend('dateValid', {
  validate(value) {
    return !!(value && (value.length === 10) && moment(value, 'DD/MM/YYYY').isValid())
  },
  message: 'La fecha no es válida'
})

extend('mindate', {
  params: ['minimo'],
  validate(value, { minimo }) {
    let newValue = Vue.prototype.moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
    let newMinimo = Vue.prototype.moment(minimo, 'YYYY-MM-DD')
    return Vue.prototype.moment(newValue).valueOf() >= Vue.prototype.moment(newMinimo).valueOf()
  },
  message: 'El campo {_field_} debe ser mayor o igual a {minimo}'
})

extend('maxdate', {
  params: ['maximo'],
  validate(value, { maximo }) {
    let newValue = Vue.prototype.moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
    let newMaximo = Vue.prototype.moment(maximo, 'YYYY-MM-DD')
    return Vue.prototype.moment(newValue).valueOf() <= Vue.prototype.moment(newMaximo).valueOf()
  },
  message: 'El campo {_field_} debe ser menor o igual a {maximo}'
})

extend('numeric', {
  ...numeric,
  message: 'El campo {_field_} debe ser de tipo número únicamente'
})

extend('phoneNumber', {
  validate(value) {
    return !!(value && Number(value) && Number(value) > 0)
  },
  message: 'El número de teléfono no es válido.'
})

extend('minlength', {
  params: ['length'],
  validate(value, { length }) {
    return String(value).length >= length
  },
  message: 'El campo {_field_} debe tener como mínimo {length} caracteres'
})

extend('maxlength', {
  params: ['length'],
  validate(value, { length }) {
    return String(value).length <= length
  },
  message: 'El campo {_field_} debe tener como maximo {length} caracteres'
})

extend('direccion', {
  validate(value) {
    return (isNaN(value) && value.trim().length > 5) || value > 0
  },
  message: 'El campo {_field_} no es un dato válido'
})