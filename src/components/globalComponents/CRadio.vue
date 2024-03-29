<template>
  <ValidationProvider
      :name="name"
      :rules="rules"
      v-slot="{ errors }"
  >
    <v-card
        outlined
        tile
        class="rounded mb-1"
        :style="`${errors.length ? 'border: 2px solid #ff5252 !important;' : `border: thin solid rgba(${darkMode ? '255, 255, 255, 0.3' : '0, 0, 0, 0.4'}) !important;`}`"
    >
      <v-card-text :style="errors.length ? 'padding: 2px 6px 6px 6px' : 'padding: 3px 6px 7px 6px'">
        <v-radio-group
            v-model="model"
            :column="column"
            outlined
            :dense="dense"
            :disabled="disabled"
            :readonly="readonly"
            class="ma-0"
            :label="label"
            hide-details
            :error="!!errors.length"
        >
          <template v-for="(radio, indexRadio) in items">
            <v-radio
                :key="`radio${indexRadio}`"
                class="ml-2"
                :class="classitempb"
                :value="radio[itemValue]"
            >
              <template v-slot:label>
                <div>
                  {{ radio[itemText] }}
                  <v-btn
                      v-if="radio.help"
                      icon
                      dark
                      color="blue"
                      small
                      @click.stop="$emit('click:help', radio)"
                  >
                    <v-icon color="primary">mdi-help-circle</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-radio>
          </template>
          <v-divider class="mt-1 mb-0" v-if="divider"/>
        </v-radio-group>
      </v-card-text>
    </v-card>
    <div
        v-if="persistentHint"
        class="v-messages theme--light error--text ml-3 mb-2"
        role="alert"
    >
      <div class="v-messages__wrapper">
        <div class="v-messages__message">
          {{ errors[0] }}
        </div>
      </div>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'CRadio',
  props: {
    value: {
      type: [Number, String, Object, Array],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    classitempb: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    itemValue: {
      type: String,
      default: null
    },
    itemText: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    rules: {
      type: [String, Object],
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: true
    },
    column: {
      type: Boolean,
      default: true
    },
    divider: {
      type: Boolean,
      default: false
    },
    persistentHint: {
      type: Boolean,
      default: true
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