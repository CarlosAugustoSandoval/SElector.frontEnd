<template>
  <v-menu
      :disabled="disabled"
      ref="menuRange"
      v-model="menuShow"
      :close-on-content-click="false"
      :return-value.sync="model"
      :nudge-top="20"
      transition="scale-transition"
      offset-y
      min-width="300px"
  >
    <template v-slot:activator="{ on }">
      <ValidationProvider
          :name="name"
          :vid="vid"
          :rules="rules"
          v-slot="{ errors }"
      >
        <v-text-field
            class="cperiod"
            v-model="dateFormatted"
            :label="label"
            :placeholder="placeholder"
            prepend-inner-icon="mdi-calendar-range"
            :readonly="readonly"
            :outlined="outlined"
            v-on="on"
            :dense="dense"
            :disabled="disabled"
            :error-messages="errors"
            :clearable="clearable"
            :hint="hint"
            :persistent-hint="persistentHint"
        >
          <template v-slot:prepend>
            <v-menu
                v-if="showSelectPeriods"
                offset-y
                transition="slide-y-transition"
            >
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                    color="grey"
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list
                  class="pa-0"
              >
                <v-list-item
                    v-for="(periodo, indexPeriodo) in periods"
                    :key="`periodo${indexPeriodo}`"
                    @click="selectPeriod(periodo)"
                >
                  <v-list-item-title
                      :class="selectedPeriod === periodo ? 'primary--text' : ''"
                  >
                    {{ periodo.text }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-text-field>
      </ValidationProvider>
    </template>
    <v-date-picker
        class="cperiod-picker"
        :disabled="disabled"
        :readonly="readonly"
        v-model="model"
        :min="min"
        :max="max"
        scrollable
        range
        :title-date-format="() => dateFormatted"
    />
  </v-menu>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'
export default {
  name: 'CDateRange',
  mixins: [FieldMixin],
  props: {
    value: {
      type: Array,
      default: () => []
    },
    periodOrigin: {
      type: String,
      default: ''
    },
    min: {
      type: String,
      default: ''
    },
    max: {
      type: String,
      default: ''
    },
    showSelectPeriods: {
      type: Boolean,
      default:false
    },
  },
  data: () => ({
    menuShow: false,
    clearSelectedPeriod: true,
    selectedPeriod: {
      value: '',
      text: 'Periodo'
    },
    model: [],
    periods: [
      {
        value: '',
        text: 'Periodo'
      },
      {
        value: 'today',
        text: 'Hoy'
      },
      {
        value: 'last_week',
        text: 'Semana Pasada'
      },
      {
        value: 'last_month',
        text: 'Mes Pasado'
      },
      {
        value: 'last_year',
        text: 'Año Pasado'
      }
    ]
  }),
  computed: {
    dateFormatted: {
      get: function () {
        if (this.$refs.menuRange && this.value?.length === 2 && this.model?.length === 2) {
          this.$refs.menuRange.save(this.model)
        }
        return (this.value?.length === 2 && this.value) ? [this.formatDate(this.value[0]), this.formatDate(this.value[1])].join(' - ') : ''
      },
      set: function (newVal) {
        if (!newVal) this.selectedPeriod = this.periods[0]
        this.input(newVal || '')
      }
    }
  },
  watch: {
    model: {
      handler (val) {
        if (!val) {
          this.input([])
          this.selectedPeriod = this.periods[0]
        } else if (val?.length === 2) {
          if ((val[0] !== val[1]) && !this.moment(val[1]).isAfter(val[0], 'day')) {
            this.input([val[1], val[0]])
            if (this.clearSelectedPeriod) this.selectedPeriod = this.periods[0]
          } else {
            if (this.clearSelectedPeriod && (val !== this.value)) this.selectedPeriod = this.periods[0]
            this.input(val)
          }
        }
      },
      immediate: true
    },
    value: {
      handler(val, prev) {
        if ((typeof prev === 'undefined' || prev === null) && (!val || (val && val.length === 0))) {
          this.selectedPeriod = this.periods.find(period => period.value === this.periodOrigin) || this.periods[0]
          this.model = this.makeDatePeriod()
        } else {
          this.model = ((typeof val !== 'undefined' && val !== null) ? val : [])
        }
      },
      immediate: true
    },
    periodOrigin: {
      handler (val) {
        if (val) this.selectPeriod(val)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    input (val) {
      this.$emit('input', val || [])
    },
    selectPeriod(period) {
      this.selectedPeriod = this.periods.find(x => x.value === ((typeof period === 'string') ? period : period.value)) || this.periods[0]
      this.model = this.makeDatePeriod()
    },
    makeDatePeriod() {
      this.coolTimeSelectedPeriod()
      switch (this.selectedPeriod.value) {
        case 'today':
          return [
            this.moment().format('YYYY-MM-DD'),
            this.moment().format('YYYY-MM-DD')
          ]
        case 'last_week':
          return [
            this.moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
            this.moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD')
          ]
        case 'last_month':
          return [
            this.moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
            this.moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
          ]
        case 'last_year':
          return [
            this.moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
            this.moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
          ]
        default:
          return null
      }
    },
    coolTimeSelectedPeriod() {
      this.clearSelectedPeriod = false
      setTimeout(() => {
        this.clearSelectedPeriod = true
      }, 500)
    },
    formatDate(date) {
      if (!date) return ''
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    }
  }
}
</script>

<style>
.cperiod .v-input__prepend-outer {
  margin: 0 !important;
  margin-right: 4px !important;
}
.cperiod-picker .v-date-picker-title__date {
  font-size: 22px !important;
}
</style>