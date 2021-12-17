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
        outlined
        :dense="dense"
        :disabled="disabled"
        :readonly="readonly"
        :error-messages="errors"
        :clearable="clearable"
        :hint="hint"
        persistent-hint
        :hide-details="hideDetails"
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
export default {
  name: 'CDateManual',
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    hint: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    vid: {
      type: String,
      default: null
    },
    rules: {
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
    },
    readonly: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
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