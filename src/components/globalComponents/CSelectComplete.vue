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
        :persistent-hint="persistentHint"
        :hint="hint"
    >
        <template
            v-if="$scopedSlots && $scopedSlots.item"
            v-slot:item="{ item }"
        >
          <slot
              name="item"
              v-bind="{ item: item }"
          />
        </template>
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
        :persistent-hint="persistentHint"
        :hint="hint"
    >
      <template
          v-if="$scopedSlots && $scopedSlots.item"
          v-slot:item="{ on, item }"
      >
        <slot
            name="item"
            v-on="on"
            v-bind="{ item: item }"
        />
      </template>
    </v-autocomplete>
  </ValidationProvider>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'

export default {
  name: 'CSelectComplete',
  mixins: [FieldMixin],
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
    items: {
      type: Array,
      default: () => []
    },
    returnObject: {
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
  mounted() {
    setTimeout(() => {
      console.log('this', this.$scopedSlots)
    }, 1000)
  },
  watch: {
    model: {
      handler(val) {
        this.$emit('input', (typeof val !== 'undefined') ? val : null)
        this.$emit('inputObject', (typeof val !== 'undefined' && val !== null) ? this.items.find(x => x[this.itemValue] === val) : null)
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