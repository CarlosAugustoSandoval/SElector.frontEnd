<template>
  <div>
    <v-list-item
        two-line
        class="pa-0"
    >
      <v-list-item-content>
        <v-list-item-title class="title font-lg">
          {{ chartData.label }}
        </v-list-item-title>
        <v-list-item-subtitle v-if="chartData.subtitle">
          {{ chartData.subtitle }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-row align="center">
      <v-col
        class="font-3x"
        cols="12"
      >
        {{ chartData.value }}
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'QuantityChart',
  props: {
    chartData: {
      type: Object,
      default: null
    },
    height: {
      type: Number,
      default: 200
    },
    color: {
      type: String,
      default: ''
    }
  }
}
</script>
