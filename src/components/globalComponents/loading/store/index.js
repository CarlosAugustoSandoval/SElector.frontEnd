// state
const state = {
  textLoading: null,
  percentLoading: null
}

// getters
const getters = {
  textLoading: state => {
    return state.textLoading
  },
  percentLoading: state => {
    return state.percentLoading
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  SET_TEXT_LOADING (state, text = null) {
    state.textLoading = text
  },
  SET_PERCENT_LOADING (state, percent = null) {
    state.percentLoading = percent
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
