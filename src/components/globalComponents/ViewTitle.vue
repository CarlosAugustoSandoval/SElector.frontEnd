<template>
  <v-toolbar
      flat
      class="my-5"
      color="transparent"
  >
    <template v-if="routeMeta">
      <v-avatar
          :color="color || routeMeta.color || ''"
          class="mr-2"
      >
        <v-icon
            v-if="icon || routeMeta.icon"
            dark
        >
          {{ icon || routeMeta.icon }}
        </v-icon>
      </v-avatar>
      <v-toolbar-title>
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="title"> {{ title || routeMeta.title }}</v-list-item-title>
            <v-list-item-subtitle class="subtitle-1 font-weight-medium">
              {{ title || routeMeta.subtitle }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-toolbar-title>
      <v-spacer/>
      <slot name="action"/>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  name: 'ViewTitle',
  props: {
    color: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    routeMeta () {
      return this.$route?.meta || null
    }
  }
}
</script>