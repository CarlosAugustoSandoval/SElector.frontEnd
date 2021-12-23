<template>
  <v-col
      cols=" 12"
      md="4"
      xl="3"
  >
    <c-date-range
        v-model="model.filter_created_between"
        label="Fecha de registro"
        :max="moment().format('YYYY-MM-DD')"
        period-origin="today"
        show-select-periods
    />
  </v-col>
</template>

<script>
export default {
  name: 'PersonsFilters',
  data: () => ({
    model: {
      filter_created_between: []
    },
    string: ''
  }),
  watch: {
    'model.filter_created_between': {
      handler (val) {
        let string = ''
        if (val.length) string = string + `filter[filter_created_between]=${val.join(',')}`
        this.filterRows(string, 'rowsPersons')
      },
      immediate: true
    }
  }
}
</script>