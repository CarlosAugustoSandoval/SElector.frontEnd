<template>
  <ValidationProvider
      :name="name"
      :vid="vid"
      :rules="(rules ? `${rules}|`: '') + 'dateValid' + (min ? `|mindate:${min}` : '') + (max ? `|maxdate:${max}` : '')"
      v-slot="{ errors }"
  >
    <v-text-field
        v-model="dateFormatted"
        :label="label"
        :placeholder="placeholder"
        :outlined="outlined"
        :dense="dense"
        :disabled="disabled"
        :readonly="readonly"
        :error-messages="errors"
        :clearable="clearable"
        :hint="hint"
        :persistent-hint="persistentHint"
        :hide-details="hideDetails"
        :loading="loading"
        v-mask="'##/##/####'"
    >
      <template v-slot:prepend-inner>
        <v-menu
            :disabled="disabled"
            v-model="menuFecha"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" class="mr-1">mdi-calendar-month</v-icon>
          </template>
          <v-date-picker
              :disabled="disabled"
              :readonly="readonly"
              v-model="model"
              @input="menuFecha = false"
              :min="min"
              :max="max"
              scrollable
          />
        </v-menu>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'
export default {
  name: 'CDateManual',
  mixins: [FieldMixin],
  props: {
    value: {
      type: String,
      default: null
    },
    min: {
      type: [Number, String],
      default: null
    },
    max: {
      type: [Number, String],
      default: null
    }
  },
  data: () => ({
    model: null,
    menuFecha: false
  }),
  computed: {
    dateFormatted: {
      get: function () {
        return this.value ? this.formatDate(this.value) : null
      },
      set: function (newValue) {
        this.$emit('input', this.formatDateInverse(newValue))
      }
    }
  },
  watch: {
    model: {
      handler(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
      },
      immediate: false
    },
    value: {
      handler(val) {
        this.model = (((typeof val !== 'undefined') && (val && val.length === 10) && this.moment(val).isValid()) || null ? val : this.model)
      },
      immediate: true
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    formatDateInverse(date) {
      if (!date) return null
      const [day, month, year] = date.split('/')
      return `${year}-${month}-${day}`
    }
  }
}
</script>