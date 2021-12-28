<template>
  <ValidationProvider
      :name="name"
      :vid="vid"
      :rules="rules"
      v-slot="{ errors }"
  >
    <v-text-field
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
        :persistent-hint="persistentHint"
        :hint="hint"
        :hide-details="hideDetails"
        :loading="loading"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
    />
  </ValidationProvider>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'
export default {
  name: 'CPassword',
  mixins: [FieldMixin],
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    showPassword: false,
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