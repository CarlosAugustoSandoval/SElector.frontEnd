<template>
  <v-overlay
      :absolute="absolute"
      :opacity="opacity"
      :value="value"
      :color="darkMode ? 'black' : 'white'"
  >
    <v-container fluid>
      <v-row justify="center">
        <v-progress-circular
            :color="`primary${darkMode ? ' lighten-4' : ''}`"
            indeterminate size="64"
        />
      </v-row>
      <v-row
          v-if="textLoading || percentLoading !== null"
          justify="center"
      >
        <v-col
            v-if="textLoading"
            cols="12"
            class="text-center"
        >
        <span :class="`${darkMode ? 'white' : 'black'}--text`">{{ textLoading }}</span>
        </v-col>
        <v-col
            v-if="percentLoading"
            cols="12"
            class="text-center"
        >
          <v-progress-linear
              :value="percentLoading"
              height="22"
          >
            <strong>{{ percentLoading.toFixed(2) }}%</strong>
          </v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Loading',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    absolute: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      default: 0.4
    }
  },
  computed: {
    ...mapGetters([
      'textLoading',
      'percentLoading'
    ])
  },
  watch: {
    value: {
      handler(val) {
        if (!val) {
          this.$store.commit('SET_TEXT_LOADING')
          this.$store.commit('SET_PERCENT_LOADING')
        }
      },
      immediate: true
    }
  }
}
</script>