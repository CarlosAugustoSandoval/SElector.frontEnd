import Departamentos from '../Departamentos'
import Municipios from '../Municipios'
import TiposIdentificacion from '../TiposIdentificacion'
import Sexos from '../Sexos'
import MediosContacto from '../MediosContacto'
import Zonas from '../Zonas'
import Etnias from '../Etnias'

// state
const state = {
  departamentos: Departamentos,
  municipios: Municipios,
  tiposIdentificacion: TiposIdentificacion,
  sexos: Sexos,
  mediosContacto: MediosContacto,
  zonas: Zonas,
  etnias: Etnias,
}

// getters
const getters = {
  municipioFullNameByCodigo: state => codigo => {
    if (codigo) {
      const municipio = state.municipios.find(municipio => municipio.codigo_dane === String(codigo))
      return `${municipio.nombre}, ${municipio.departamento.nombre}`
    }
    return ''
  }
}

// actions
const actions = {}

// mutations
const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
