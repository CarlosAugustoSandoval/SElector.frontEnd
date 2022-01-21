<template>
  <v-simple-table
    dense
    fixed-header
    :height="height ? `${height}px` : ''"
  >
    <template v-slot:default>
      <thead>
      <tr>
        <template
          v-for="(label, indexLabel) in chartData.labels"
        >
          <th
            :key="`header${indexLabel}`"
            class="text-left"
          >
            {{ label }}
          </th>
        </template>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(item, indexItem) in chartData.data"
        :key="`item${indexItem}`"
      >
        <template
          v-for="(itemValue, indexItemValue) in item"
        >
          <td
            :key="`value${indexItemValue}`"
            class="text-left"
          >
            {{ itemValue }}
          </td>
        </template>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  name: 'TableChart',
  props: {
    chartData: {
      type: Object,
      default: null
    },
    height: {
      type: Number,
      default: 200
    }
  }
}
</script>