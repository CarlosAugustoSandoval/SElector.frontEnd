import Vue from 'vue'
import moment from 'moment'
import { extend } from 'vee-validate'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required, email, numeric, is_not, confirmed } from 'vee-validate/dist/rules'

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
    let newValue = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
    let newMinimo = moment(minimo, 'YYYY-MM-DD')
    return moment(newValue).valueOf() >= moment(newMinimo).valueOf()
  },
  message: 'El campo {_field_} debe ser mayor o igual a {minimo}'
})

extend('maxdate', {
  params: ['maximo'],
  validate(value, { maximo }) {
    let newValue = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
    let newMaximo = moment(maximo, 'YYYY-MM-DD')
    return moment(newValue).valueOf() <= moment(newMaximo).valueOf()
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

extend('address', {
  validate(value) {
    return (isNaN(value) && value.trim().length > 5) || value > 0
  },
  message: 'El campo {_field_} no es un dato válido'
})

extend('is_not', {
  ...is_not,
  message: 'El campo {_field_} debe ser diferente de la contraseña actual'
})

extend('confirmed', {
  ...confirmed,
  message: 'El campo {_field_} no coincide con el campo a confirmar'
})

extend('regexPassword', {
  params: ['password'],
  validate(value, { password }) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.{8,})/;
    return regex.test(password)
  },
  message: "La contraseña debe ser alfanumerica, debe contener mayusculas y minusculas y un caracter especial"
})