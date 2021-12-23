<template>
  <ValidationProvider
      :name="name"
      :vid="vid"
      :rules="rules"
      v-slot="{ errors }"
  >
    <v-text-field
        :class="upperCase ? 'c-upper-case' : lowerCase ? 'c-lower-case' : null"
        v-model="model"
        :label="label"
        :placeholder="placeholder"
        :outlined="outlined"
        :dense="dense"
        :disabled="disabled"
        :readonly="readonly"
        :error-messages="errors"
        :clearable="clearable"
        :counter="counter"
        @focus="changeCase"
        @blur="changeCase"
        persistent-hint
        :hint="hint"
    />
  </ValidationProvider>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'

export default {
  name: 'CText',
  mixins: [FieldMixin],
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    upperCase: {
      type: Boolean,
      default: false
    },
    lowerCase: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    model: null
  }),
  watch: {
    model: {
      handler(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
      },
      immediate: false
    },
    value: {
      handler(val) {
        this.model = ((typeof val !== 'undefined') ? val : null)
      },
      immediate: true
    }
  },
  methods: {
    changeCase() {
      if (this.model && (this.upperCase || this.lowerCase)) {
        this.model = this.upperCase ? this.model.toUpperCase() : this.model.toLowerCase()
      }
    }
  }
}
</script>

<style>
.c-upper-case input {
  text-transform: uppercase !important;
}

.c-lower-case input {
  text-transform: lowercase !important;
}
</style>