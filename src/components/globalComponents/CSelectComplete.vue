<template>
  <ValidationProvider
      :name="name"
      :vid="vid"
      :rules="rules"
      v-slot="{ errors }"
  >
    <v-select
        ref="theRef"
        v-if="items && items.length <= 10"
        v-model="model"
        :label="label"
        :placeholder="placeholder"
        :items="items"
        :item-text="itemText"
        :item-value="itemValue"
        :outlined="outlined"
        :dense="dense"
        :disabled="disabled"
        :readonly="readonly"
        :error-messages="errors"
        :clearable="clearable"
        :hide-details="hideDetails"
        :multiple="multiple"
        :loading="loading"
        @change="val => $emit('change', val)"
        :return-object="returnObject"
        persistent-hint
        :hint="hint"
    >
    </v-select>
    <v-autocomplete
        v-else
        ref="theRefS"
        v-model="model"
        :label="label"
        :placeholder="placeholder"
        :items="items"
        :item-text="itemText"
        :item-value="itemValue"
        :outlined="outlined"
        :dense="dense"
        :disabled="disabled"
        :readonly="readonly"
        :error-messages="errors"
        :clearable="clearable"
        :hide-details="hideDetails"
        :multiple="multiple"
        :loading="loading"
        :return-object="returnObject"
        @change="val => $emit('change', val)"
        persistent-hint
        :hint="hint"
    >
    </v-autocomplete>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'CSelectComplete',
  props: {
    value: {
      type: [Number, String, Object, Array],
      default: null
    },
    itemValue: {
      type: String,
      default: null
    },
    itemText: {
      type: String,
      default: null
    },
    hint: {
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
    items: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: null
    },
    vid: {
      type: String,
      default: null
    },
    outlined: {
      type: Boolean,
      default: true
    },
    rules: {
      type: String,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    loading: {
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
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    multiple: {
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
  }
}
</script>