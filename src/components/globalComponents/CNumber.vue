<template>
  <ValidationProvider
      :name="name"
      :vid="vid"
      :rules="(rules ? `${rules}|`: '') + 'numeric'"
      v-slot="{ errors }"
  >
    <v-text-field
        v-model.number="model"
        type="number"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :step="step"
        :label="label"
        :outlined="outlined"
        :dense="dense"
        :disabled="disabled"
        :readonly="readonly"
        :error-messages="errors"
        :clearable="clearable"
        :suffix="suffix"
        :persistent-hint="persistentHint"
        :hint="hint"
        :hide-details="hideDetails"
        :loading="loading"
    />
  </ValidationProvider>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'
export default {
  name: 'CNumber',
  mixins: [FieldMixin],
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    step: {
      type: [String, Number],
      default: '0.1'
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
  }
}
</script>