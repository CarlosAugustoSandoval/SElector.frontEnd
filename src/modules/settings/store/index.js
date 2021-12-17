// state
const state = {
    navigationDrawer: true,
    customizerDrawer: false,
    darkMode: false,
    primaryColor: '#1C4A75',
    optionsPrimary: [
        {
            primaryColor: '#00A1E5',
            backgroundGradientStyle: 'radial-gradient(circle at 47.19% 17.86%, #53bef3 0, #0698dc 50%, #017eb3 100%)',
            textColorClass: 'white--text'
        },
        {
            primaryColor: '#55BB46',
            backgroundGradientStyle: 'radial-gradient(circle at 47.19% 17.86%, #74e165 0, #5ba758 50%, #22671f 100%)',
            textColorClass: 'white--text'
        },
        {
            primaryColor: '#1C4A75',
            backgroundGradientStyle: 'radial-gradient(circle at 47.19% 17.86%, #4175a6 0, #25537e 50%, #0a2843 100%)',
            textColorClass: 'white--text'
        },
        {
            primaryColor: '#563DEA',
            backgroundGradientStyle: 'radial-gradient(circle at 47.19% 17.86%, #7058ff 0, #573dea 50%, #3d29b2 100%)',
            textColorClass: 'white--text'
        },
        {
            primaryColor: '#9C27B0',
            backgroundGradientStyle: 'radial-gradient(circle at 47.19% 17.86%, #aa3dbe 0, #721982 50%, #40064a 100%)',
            textColorClass: 'white--text'
        },
        {
            primaryColor: '#00B278',
            backgroundGradientStyle: 'radial-gradient(circle at 47.19% 17.86%, #61e1bb 0, #03ac77 50%, #006b49 100%)',
            textColorClass: 'white--text'
        }
    ]
}

// getters
const getters = {
    swatchesPrimary: state => {
        let swatchesPrimary = []
        const primaryColors = state.optionsPrimary.map(x => x.primaryColor)
        const length = 2
        for (let i = 0; i < primaryColors.length; i += length) {
            const swatchesRow = primaryColors.slice(i, i + length)
            swatchesPrimary.push(swatchesRow)
        }
        return swatchesPrimary
    },
    optionPrimary: state => {
        return state.optionsPrimary.find(x => x.primaryColor === state.primaryColor)
    }
}

// actions
const actions = {
}

// mutations
const mutations = {
    SET_CUSTOMIZER_DRAWER(state, show) {
        state.customizerDrawer = show
    },
    SET_NAVIGATION_DRAWER(state, show) {
        state.navigationDrawer = show
    },
    SET_THEME_MODE (state, dark) {
        state.darkMode = dark
    },
    SET_THEME_COLOR (state, color) {
        state.primaryColor = color
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
