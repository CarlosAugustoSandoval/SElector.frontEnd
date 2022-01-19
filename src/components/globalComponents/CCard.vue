<template>
  <v-card
      :flat="flat"
      :tile="tile"
      :loading="showLoading ? !fullLoading && loading : false"
      :height="height"
      :color="color"
  >
    <loading
        v-if="showLoading && fullLoading"
        v-model="loading"
        absolute
    />
    <v-list
        :color="headerBackground"
        :dark="darkHeader"
    >
      <v-list-item>
        <v-list-item-avatar
            v-if="avatar || icon"
            :color="avatar ? avatarColor : ''"
        >
          <v-icon :color="iconColor">{{ icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
              v-if="title"
              class="title"
          >
            {{ title }}
          </v-list-item-title>
          <p
              v-if="subtitle"
              class="ma-0 subtitle-2"
          >
            {{ subtitle }}
          </p>
        </v-list-item-content>
        <v-list-item-action v-if="showCloseButton">
          <v-btn
              icon
              @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-card-text
        class="pa-0 ma-0"
        style="height: 100%;"
    >
      <v-container
          :fluid="fluidContainer"
          :class="classContainer"
      >
        <ValidationObserver
            v-if="formValidation"
            ref="formValidCard"
            v-slot="{ invalid, validated }"
        >
          <slot name="default"/>
          <div
              v-if="invalid && validated && showAlertErrors"
              :style="`justify-content: ${ actionsAlign }`"
              style="display:flex !important;"
          >
            <v-alert
                type="error"
                dense
                class="ma-0"
            >
              Hay errores en el formulario
            </v-alert>
          </div>
        </ValidationObserver>
        <slot
            v-else
            name="default"
        />
      </v-container>
    </v-card-text>
    <v-card-actions
        v-if="showActions"
        :style="`justify-content: ${ actionsAlign }`"
        class="pb-6"
    >
      <v-btn
          v-if="showCancelButton"
          @click="cancel"
          :color="colorCancelButton"
          :loading="showLoading ? fullLoading ? false : loading : false"
      >
        {{ textCancelButton }}
      </v-btn>
      <v-btn
          v-if="showSaveButton"
          @click="save"
          :color="colorSaveButton"
          :loading="showLoading ? fullLoading ? false : loading : false"
      >
        {{ textSaveButton }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    headerBackground: {
      type: String,
      default: 'transparent'
    },
    darkHeader: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: Boolean,
      default: false
    },
    avatarColor: {
      type: String,
      default: 'primary darken-3'
    },
    icon: {
      type: [String, Number],
      default: ''
    },
    iconColor: {
      type: String,
      default: ''
    },
    flat: {
      type: Boolean,
      default: false
    },
    tile: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: ''
    },
    showCloseButton: {
      type: Boolean,
      default: false
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    loading: {
      readonly: false,
      type: Boolean,
      default: false
    },
    fullLoading: {
      type: Boolean,
      default: true
    },
    showActions: {
      type: Boolean,
      default: false
    },
    actionsAlign: {
      type: String,
      default: 'flex-end'
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    textCancelButton: {
      type: String,
      default: 'Cancelar'
    },
    colorCancelButton: {
      type: String,
      default: ''
    },
    showSaveButton: {
      type: Boolean,
      default: true
    },
    textSaveButton: {
      type: String,
      default: 'Registrar'
    },
    colorSaveButton: {
      type: String,
      default: 'primary'
    },
    formValidation: {
      type: Boolean,
      default: false
    },
    classContainer: {
      type: String,
      default: ''
    },
    fluidContainer: {
      type: Boolean,
      default: true
    },
    showAlertErrors: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async save () {
      const validate = this.formValidation ? await this.$refs.formValidCard.validate() : true
      if (validate) {
        if (this.showLoading) this.$emit('update:loading', true)
        this.$emit('save', true)
      } else {
        this.$emit('save', false)
      }
    },
    close () {
      this.$emit('update:loading', false)
      if (this.formValidation) this.$refs.formValidCard.reset()
      this.$emit('close')
    },
    cancel () {
      this.$emit('update:loading', false)
      if (this.formValidation) this.$refs.formValidCard.reset()
      this.$emit('cancel')
    }
  }
}
</script>