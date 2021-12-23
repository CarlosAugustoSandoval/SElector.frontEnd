<template>
  <v-chip
      class="ma-1"
      color="primary"
      close
      label
      outlined
      @click:close="$emit('close')"
  >
    <div>
      <div
          class="ma-0 subtitle-2 font-weight-black"
          style="line-height: 1.4 !important;"
      >
        {{ title }}
      </div>
      <div
          class="caption ma-0"
          style="line-height: 1 !important;"
      >
        {{ subtitle }}
      </div>
    </div>
  </v-chip>
</template>

<script>
export default {
  name: 'CChip',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>