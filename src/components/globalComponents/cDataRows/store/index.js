import DataRow from '../models/DataRow'

// state
const state = {
  dataRows: []
}

// getters
const getters = {
  myDataRow: state => name => {
    return state.dataRows.find(x => x.name === name)
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  SET_RELOAD_ROWS (state, name) {
    const data = state.dataRows.find(x => x.name === name)
    if (data?.changes) data.changes++
  },
  SET_DATA_ROWS_HEADERS (state, IDataRow) {
    const data = state.dataRows.find(x => x.name === IDataRow.name)
    if (data) {
      data.headers = IDataRow.headers
      data.version = IDataRow.version
    }
    else state.dataRows.push(DataRow.create(IDataRow))
  },
  SET_FILTERS (state, payload) {
    const data = state.dataRows.find(x => x.name === payload.name)
    if (data) data.filters = payload.filters
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
