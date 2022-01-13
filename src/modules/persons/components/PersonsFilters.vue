<template>
  <v-row
      justify="end"
      fill-height
  >
    <v-col
        cols=" 12"
        md="6"
    >
      <c-date-range
          v-model="model.filter_created_between"
          label="Fecha de registro"
          :max="moment().format('YYYY-MM-DD')"
          show-select-periods
      />
    </v-col>
    <v-col
        v-if="permissions['view-all']"
        cols="12"
        md="6"
    >
      <c-select-complete
          v-model="model.user_id"
          label="Usuario"
          :items="complementsFilters && complementsFilters.users || []"
          item-text="name"
          item-value="id"
      />
    </v-col>
  </v-row>
</template>

<script>
import store from '@/store'
import {mapState} from 'vuex'
export default {
  name: 'PersonsFilters',
  data: () => ({
    model: {
      filter_created_between: [],
      user_id: null
    },
    string: ''
  }),
  computed: {
    permissions () {
      return store.getters['authModule/permissionsByModule']('electores')
    },
    ...mapState('personsModule',['complementsFilters']),
  },
  created() {
    store.dispatch('personsModule/getComplementsFilters')
  },
  watch: {
    model: {
      handler () {
        this.makeRouteFilter()
      },
      immediate: false,
      deep: true
    }
  },
  methods: {
    makeRouteFilter () {
      let string = ''
      if (this.model.filter_created_between.length) string = string + `filter[filter_created_between]=${this.model.filter_created_between.join(',')}`
      if(this.model.user_id) string = string + `filter[user_id]=${this.model.user_id}`
      this.filterRows(string, 'rowsPersons')
    }
  }
}
</script>